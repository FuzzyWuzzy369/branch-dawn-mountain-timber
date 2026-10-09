#!/usr/bin/env node
/**
 * DinnerDraw deck refresh — re-pull OpenStreetMap restaurants for the Wichita
 * four-county metro (Sedgwick, Butler, Harvey, Sumner) and compare them with
 * src/data/scraped.ts. Hutchinson spots live in src/data/spots.ts and are never
 * touched by this script.
 *
 * Usage (from repo root, Node 20+, no dependencies):
 *   node scripts/refresh-deck.mjs                  # diff mode (default): print summary,
 *                                                  #   write deck-refresh/diff-YYYY-MM-DD.json
 *   node scripts/refresh-deck.mjs --from raw.json  # reuse a saved Overpass response (no network)
 *   node scripts/refresh-deck.mjs --save-raw raw.json   # keep the Overpass response for reruns
 *   node scripts/refresh-deck.mjs --out diff.json  # choose the diff file path
 *   node scripts/refresh-deck.mjs --write          # rewrite src/data/scraped.ts: keep every existing
 *                                                  #   entry verbatim (ids, hand edits, areas) and append NEW
 *       --apply-changes   also apply CHANGED name/address/cuisine to existing entries (id kept)
 *       --prune           also drop POSSIBLY CLOSED entries (review them first!)
 *       --shelf-only      only append NEW entries that pass shelf.ts (no national chain QSR)
 *   node scripts/refresh-deck.mjs --json           # print the diff JSON to stdout instead of a summary
 *
 * Overpass: one query (amenity=restaurant|cafe|fast_food|ice_cream with a name, inside
 * the four county boundaries, clipped to a Kansas bbox so same-named counties in other
 * states drop out). It also asks for disused:/was: tags and bars/pubs in the same query, only
 * as evidence for why a deck entry vanished. Endpoints are tried in order with a 180 s
 * timeout, and the script stops at the first good response. Set OVERPASS_URL to force one endpoint.
 *
 * Diff matching (one-to-one, in passes): (1) regenerated id equals the deck id;
 * (2) same house number + street with a similar name; (3) deck coordinates (from
 * coordinate-style ids) within 150 m with a similar name; (4) same similar name in the
 * same town when only one candidate is left on each side; (5) rename check, meaning the same
 * address or ≤60 m with a different name is reported as CHANGED(name), not NEW+CLOSED.
 * Ids follow the existing scheme: slug(`${name} ${address}`), where the address is
 * "123 Street, Town, KS 67xxx" or, with no house number, "Town, KS (lat, lng)".
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCRAPED_PATH = path.join(ROOT, "src/data/scraped.ts");
const SPOTS_PATH = path.join(ROOT, "src/data/spots.ts");
const SHELF_PATH = path.join(ROOT, "src/data/shelf.ts");

const ENDPOINTS = process.env.OVERPASS_URL
  ? [process.env.OVERPASS_URL]
  : [
      "https://overpass-api.de/api/interpreter",
      "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
      "https://overpass.private.coffee/api/interpreter",
      "https://overpass.kumi.systems/api/interpreter",
    ];
const COUNTIES = ["Sedgwick", "Butler", "Harvey", "Sumner"];
const AMENITIES = ["restaurant", "cafe", "fast_food", "ice_cream"];
const BBOX = "36.95,-97.85,38.30,-96.50"; // S,W,N,E around the four Kansas counties
const MATCH_METERS = 150;
const RENAME_METERS = 60;
const MOVE_METERS = 150;

const QUERY = `[out:json][timeout:180][bbox:${BBOX}];
area["boundary"="administrative"]["admin_level"="6"]["name"~"^(${COUNTIES.join("|")}) County$"]->.c;
foreach.c->.a(
  .a out tags;
  (
    nwr["amenity"~"^(${AMENITIES.join("|")})$"]["name"](area.a);
    nwr["disused:amenity"~"^(${AMENITIES.join("|")})$"](area.a);
    nwr["was:amenity"~"^(${AMENITIES.join("|")})$"](area.a);
    nwr["amenity"~"^(bar|pub|biergarten)$"]["name"](area.a);
  );
  out center tags;
);`;

// ---------- args ----------
const argv = process.argv.slice(2);
const flag = (f) => argv.includes(f);
const opt = (f) => {
  const i = argv.indexOf(f);
  return i >= 0 ? argv[i + 1] : undefined;
};
if (flag("--help") || flag("-h")) {
  const src = fs.readFileSync(fileURLToPath(import.meta.url), "utf8");
  console.log(src.slice(src.indexOf("/**"), src.indexOf("*/") + 2));
  process.exit(0);
}

// ---------- helpers ----------
const slug = (s) =>
  s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const nameKey = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");
const looseName = (s) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/['’`]/g, "")
    .replace(/\b(the|restaurant|resturant|cafe|café|bar|grill|and|kitchen|eatery|co|company)\b/g, " ")
    .replace(/[^a-z0-9]+/g, "");
function bigrams(s) {
  const out = new Map();
  for (let i = 0; i < s.length - 1; i++) out.set(s.slice(i, i + 2), (out.get(s.slice(i, i + 2)) ?? 0) + 1);
  return out;
}
function dice(a, b) {
  if (a === b) return 1;
  if (a.length < 2 || b.length < 2) return 0;
  const A = bigrams(a), B = bigrams(b);
  let hit = 0;
  for (const [k, n] of A) hit += Math.min(n, B.get(k) ?? 0);
  return (2 * hit) / (a.length - 1 + b.length - 1);
}
function similarName(a, b) {
  const x = nameKey(a), y = nameKey(b);
  if (x === y) return true;
  const lx = looseName(a), ly = looseName(b);
  if (lx && lx === ly) return true;
  if (lx.length >= 5 && ly.length >= 5 && (lx.includes(ly) || ly.includes(lx))) return true;
  return dice(lx || x, ly || y) >= 0.75;
}
function meters(a, b) {
  const R = 6371000, r = Math.PI / 180;
  const h =
    Math.sin(((b.lat - a.lat) * r) / 2) ** 2 +
    Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(((b.lng - a.lng) * r) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
const STREET_WORDS = {
  north: "n", south: "s", east: "e", west: "w", street: "st", avenue: "ave", av: "ave",
  road: "rd", drive: "dr", boulevard: "blvd", court: "ct", circle: "cir", parkway: "pkwy",
  place: "pl", lane: "ln", highway: "hwy", terrace: "ter", kellog: "kellogg", "1st": "first", second: "2nd",
};
function streetKey(address) {
  const first = String(address ?? "").split(",")[0].toLowerCase().replace(/#\s*\S+/g, " ").replace(/\./g, "");
  const m = first.match(/^\s*(\d+)\s+(.*)$/);
  if (!m) return null;
  const words = m[2].split(/[^a-z0-9]+/).filter(Boolean).map((w) => STREET_WORDS[w] ?? w);
  // drop trailing type words so "Harry" == "Harry St" and "21st N" == "21st St N"
  const core = words.filter((w) => !["st", "ave", "rd", "dr", "blvd", "ct", "ln", "pl", "pkwy", "ter", "cir"].includes(w));
  return `${m[1]} ${core.join(" ")}`;
}
function coordsFromAddress(address) {
  const m = String(address).match(/\((-?\d+\.\d+),\s*(-?\d+\.\d+)\)/);
  return m ? { lat: Number(m[1]), lng: Number(m[2]) } : null;
}
const titleCase = (s) => s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// ---------- deck ----------
function loadDeck() {
  const src = fs.readFileSync(SCRAPED_PATH, "utf8");
  const start = src.indexOf("= [", src.indexOf("export const SCRAPED")) + 2;
  const end = src.indexOf("\n];", start) + 2;
  const spots = JSON.parse(src.slice(start, end));
  const townsStart = src.indexOf("= {", src.indexOf("SCRAPED_TOWNS")) + 2;
  const townsEnd = src.indexOf("\n};", townsStart) + 2;
  const towns = JSON.parse(src.slice(townsStart, townsEnd));
  return { src, spots, towns, start, end };
}
function loadCuratedNames() {
  try {
    const src = fs.readFileSync(SPOTS_PATH, "utf8");
    return [...src.matchAll(/\bname:\s*"([^"]+)"/g)].map((m) => m[1]);
  } catch {
    return [];
  }
}
function loadShelf() {
  const src = fs.readFileSync(SHELF_PATH, "utf8");
  const setOf = (name) => {
    const m = src.match(new RegExp(`const ${name} = new Set\\(\\[([\\s\\S]*?)\\]\\)`));
    return new Set(m ? [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]) : []);
  };
  const born = setOf("WICHITA_BORN_QSR");
  const chains = setOf("CHAIN_FAST_FOOD");
  const isWichitaBornQsr = (name) => nameKey(name).startsWith("freddy") || born.has(nameKey(name));
  const isChainFastFood = (name) => {
    const key = nameKey(name);
    if (isWichitaBornQsr(name) || key.includes("museum")) return false;
    for (const c of chains) if (key === c || (c.length >= 8 && key.includes(c))) return true;
    return false;
  };
  return { isWichitaBornQsr, isChainFastFood };
}

// ---------- overpass ----------
async function fetchOverpass() {
  let lastErr;
  for (const url of ENDPOINTS) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        process.stderr.write(`Overpass: ${url} (try ${attempt})… `);
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "DinnerDraw-deck-refresh/1.0 (weekly; github.com/FuzzyWuzzy369)",
          },
          body: "data=" + encodeURIComponent(QUERY),
          signal: AbortSignal.timeout(200_000),
        });
        const text = await res.text();
        if (!res.ok || !text.trimStart().startsWith("{")) throw new Error(`HTTP ${res.status}`);
        const json = JSON.parse(text);
        if (json.remark && /runtime error|timed out/i.test(json.remark)) throw new Error(json.remark);
        process.stderr.write("ok\n");
        return json;
      } catch (err) {
        lastErr = err;
        process.stderr.write(`failed (${err.message})\n`);
        await new Promise((r) => setTimeout(r, attempt * 10_000)); // back off before the next try
      }
    }
  }
  throw new Error(`All Overpass endpoints failed: ${lastErr?.message}`);
}

// ---------- normalize OSM -> Spot ----------
const CUISINE_MAP = {
  burger: "American", sandwich: "American", chicken: "American", fried_chicken: "American",
  donut: "American", steak_house: "American", steak: "American", american: "American",
  breakfast: "American", regional: "American", wings: "American", diner: "American",
  hot_dog: "American", pancake: "American", bagel: "American", buffet: "American",
  tex_mex: "Mexican", "tex-mex": "Mexican", tacos: "Mexican", mexican: "Mexican", burrito: "Mexican",
  coffee_shop: "Coffee", coffee: "Coffee", tea: "Coffee",
  sushi: "Japanese", ramen: "Japanese", japanese: "Japanese", hibachi: "Japanese",
  ice_cream: "Ice cream", frozen_yogurt: "Ice cream", gelato: "Ice cream", custard: "Ice cream",
  bbq: "Barbecue", barbecue: "Barbecue", pho: "Vietnamese", noodle: "Asian",
};
const DATE_CUISINES = new Set(["Italian", "Japanese", "French"]);
function cuisineFor(tags) {
  const first = String(tags.cuisine ?? "").split(/[;,]/)[0].trim().toLowerCase();
  if (first) return CUISINE_MAP[first] ?? titleCase(first);
  const n = tags.name.toLowerCase();
  if (/taco|mexican|burrito|taqueria|cantina/.test(n)) return "Mexican";
  if (/pizz/.test(n)) return "Pizza";
  if (/sushi|hibachi|ramen|teriyaki/.test(n)) return "Japanese";
  if (/bbq|barbecue|smokehouse/.test(n)) return "Barbecue";
  if (/pho\b|vietnam/.test(n)) return "Vietnamese";
  if (/burger|diner|grill|steak/.test(n)) return "American";
  if (tags.amenity === "cafe") return "Coffee";
  if (tags.amenity === "ice_cream") return "Ice cream";
  if (tags.amenity === "fast_food") return "American";
  return "Other";
}
const KIND = { restaurant: "a restaurant", cafe: "a cafe", fast_food: "a fast-food stop", ice_cream: "a ice cream shop" };

function makeTownResolver(towns) {
  const known = new Map(Object.keys(towns).map((t) => [t.toLowerCase(), t]));
  const fixes = { witchita: "Wichita", "new market square": "Wichita" };
  return (tags, pt) => {
    const city = String(tags["addr:city"] ?? "").trim().toLowerCase();
    if (known.has(city)) return known.get(city);
    if (fixes[city]) return fixes[city];
    let best = null;
    for (const [t, p] of Object.entries(towns)) {
      const d = meters(pt, p);
      if (!best || d < best.d) best = { t, d };
    }
    // Town centroids sit in the middle of town; Wichita sprawls, so prefer it when close.
    if (best && best.t !== "Wichita" && meters(pt, towns.Wichita) < 16000 && best.d > 3000) return "Wichita";
    return best?.t ?? "Wichita";
  };
}

function normalize(el, county, townFor) {
  const t = el.tags;
  const pt = { lat: el.lat ?? el.center?.lat, lng: el.lon ?? el.center?.lon };
  const town = townFor(t, pt);
  const zip = /^\d{5}$/.test(String(t["addr:postcode"] ?? "").slice(0, 5)) ? String(t["addr:postcode"]).slice(0, 5) : "";
  let address;
  if (t["addr:housenumber"] && t["addr:street"]) address = `${t["addr:housenumber"]} ${t["addr:street"]}, ${town}, KS${zip ? " " + zip : ""}`;
  else if (t["addr:street"]) address = `${t["addr:street"]}, ${town}, KS`;
  else address = `${town}, KS (${pt.lat.toFixed(4)}, ${pt.lng.toFixed(4)})`;
  const cuisine = cuisineFor(t);
  const amenity = t.amenity;
  const restaurant = amenity === "restaurant";
  const vibes = amenity === "cafe" ? ["casual", "solo", "quick"] : restaurant
    ? (DATE_CUISINES.has(cuisine) ? ["casual", "date", "group"] : ["casual", "group"])
    : ["quick", "casual"];
  const diet = ["vegetarian", "vegan", "halal"].filter((d) => /^(yes|only)$/.test(t[`diet:${d}`] ?? ""));
  const spot = {
    id: slug(`${t.name} ${address}`),
    name: t.name,
    town,
    area: town,
    county: county.replace(/ County$/, ""),
    cuisine,
    price: restaurant ? 2 : 1,
    vibes,
    diet,
    gem: !t.brand && !t["brand:wikidata"],
    knownFor: cuisine === "Other" ? (amenity === "cafe" ? "Cafe" : "Restaurant") : cuisine,
    note: `Mapped as ${KIND[amenity]} in ${town}, ${county}. Confirm hours before you go.`,
    address,
  };
  return { spot, osm: `${el.type}/${el.id}`, pt, amenity, hasCuisineTag: !!t.cuisine, brand: t.brand ?? null };
}

// ---------- diff ----------
function diff(deck, osmRaw, curatedNames, shelf) {
  const townFor = makeTownResolver(deck.towns);
  const live = [], evidence = [];
  const seen = new Set();
  let county = null;
  for (const el of osmRaw.elements) {
    if (el.type === "area") { county = el.tags?.name ?? null; continue; }
    const key = `${el.type}/${el.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const pt = { lat: el.lat ?? el.center?.lat, lng: el.lon ?? el.center?.lon };
    if (pt.lat == null) continue;
    if (el.tags?.name && AMENITIES.includes(el.tags.amenity)) live.push(normalize(el, county, townFor));
    else evidence.push({ osm: key, pt, tags: el.tags ?? {} });
  }

  const deckRows = deck.spots.map((spot) => ({
    spot,
    pt: coordsFromAddress(spot.address),
    street: streetKey(spot.address),
    match: null,
  }));
  const osmRows = live.map((o) => ({ ...o, street: streetKey(o.spot.address), match: null }));
  const link = (d, o, how) => { d.match = o; o.match = d; d.how = how; };

  // 1. id equality
  const byId = new Map();
  for (const o of osmRows) if (!byId.has(o.spot.id)) byId.set(o.spot.id, o);
  for (const d of deckRows) { const o = byId.get(d.spot.id); if (o && !o.match) link(d, o, "id"); }
  // 2. street address + similar name
  for (const d of deckRows) {
    if (d.match || !d.street) continue;
    const o = osmRows.find((o) => !o.match && o.street === d.street && similarName(d.spot.name, o.spot.name));
    if (o) link(d, o, "address");
  }
  // 3. proximity + similar name (deck coordinate ids)
  const nearest = (d, pred, maxM) => {
    let best = null;
    for (const o of osmRows) {
      if (o.match || !pred(o)) continue;
      const m = meters(d.pt, o.pt);
      if (m <= maxM && (!best || m < best.m)) best = { o, m };
    }
    return best;
  };
  for (const d of deckRows) {
    if (d.match || !d.pt) continue;
    const b = nearest(d, (o) => similarName(d.spot.name, o.spot.name), MATCH_METERS);
    if (b) link(d, b.o, `near ${Math.round(b.m)}m`);
  }
  // 4. unique similar name within the same town (deck entries with partial / odd addresses)
  for (const d of deckRows) {
    if (d.match) continue;
    const os = osmRows.filter((o) => !o.match && o.spot.town === d.spot.town && similarName(d.spot.name, o.spot.name));
    const ds = deckRows.filter((x) => !x.match && x.spot.town === d.spot.town && similarName(x.spot.name, d.spot.name));
    if (os.length === 1 && ds.length === 1) {
      const o = os[0];
      const far = d.pt && meters(d.pt, o.pt) > 1500;
      const otherStreet = d.street && o.street && d.street.split(" ")[0] !== o.street.split(" ")[0];
      if (!far && !otherStreet) link(d, o, "name+town");
    }
  }
  // 5. renames: same street address, or very close, with a different name
  for (const d of deckRows) {
    if (d.match) continue;
    let o = d.street ? osmRows.find((o) => !o.match && o.street === d.street) : null;
    if (!o && d.pt) o = nearest(d, () => true, RENAME_METERS)?.o ?? null;
    if (o) link(d, o, "rename?");
  }

  const changed = [];
  for (const d of deckRows) {
    if (!d.match) continue;
    const o = d.match, s = d.spot, n = o.spot, fields = {};
    if (nameKey(s.name) !== nameKey(n.name)) fields.name = [s.name, n.name];
    if (o.hasCuisineTag && s.cuisine !== n.cuisine) fields.cuisine = [s.cuisine, n.cuisine];
    if (d.street && o.street && d.street !== o.street) fields.address = [s.address, n.address];
    else if (!d.street && o.street) fields.address = [s.address, n.address]; // OSM gained a street address
    if (d.pt) { const m = meters(d.pt, o.pt); if (m > MOVE_METERS) fields.coords = [`${Math.round(m)} m away`, n.address]; }
    if (Object.keys(fields).length) changed.push({ id: s.id, osm: o.osm, match: d.how, fields });
  }

  const curated = curatedNames.map((name) => ({ name, key: looseName(name) }));
  // OSM sometimes maps one place twice (a node plus a building way). Unmatched copies of a
  // place that is already matched or already listed are not NEW.
  let osmDuplicates = 0;
  const unmatched = [];
  const deckIds = new Set(deck.spots.map((s) => s.id));
  for (const o of osmRows) {
    if (o.match) continue;
    const twin = (x) => x !== o && (x.spot.id === o.spot.id || (similarName(x.spot.name, o.spot.name) && meters(x.pt, o.pt) <= RENAME_METERS));
    if (deckIds.has(o.spot.id) || osmRows.some((x) => x.match && twin(x)) || unmatched.some(twin)) { osmDuplicates++; continue; }
    unmatched.push(o);
  }
  const fresh = unmatched.map((o) => {
    const s = o.spot;
    const chain = shelf.isChainFastFood(s.name);
    const inCurated = curated.find((c) => similarName(c.name, s.name))?.name ?? null;
    return {
      id: s.id, osm: o.osm, name: s.name, town: s.town, county: s.county, amenity: o.amenity,
      cuisine: s.cuisine, address: s.address, brand: o.brand,
      shelf: chain ? "out: national chain QSR" : shelf.isWichitaBornQsr(s.name) ? "in: Wichita-born QSR" : "in",
      alreadyCurated: inCurated,
      spot: s,
    };
  });
  const closed = deckRows.filter((d) => !d.match).map((d) => {
    const s = d.spot;
    let hint = null;
    for (const e of evidence) {
      const nm = e.tags.name ?? e.tags["disused:name"] ?? e.tags["was:name"] ?? e.tags["old_name"] ?? "";
      const near = d.pt ? meters(d.pt, e.pt) < MATCH_METERS : false;
      const sameStreet = d.street && e.tags["addr:housenumber"] && streetKey(`${e.tags["addr:housenumber"]} ${e.tags["addr:street"] ?? ""}`) === d.street;
      if ((nm && similarName(nm, s.name)) && (near || sameStreet || !d.pt)) {
        hint = e.tags.amenity ? `now tagged amenity=${e.tags.amenity} (${e.osm})` : `marked disused/was (${e.osm})`;
        break;
      }
    }
    return { id: s.id, name: s.name, town: s.town, address: s.address, evidence: hint };
  });

  return {
    generatedAt: new Date().toISOString(),
    osmBase: osmRaw.osm3s?.timestamp_osm_base ?? null,
    counts: {
      deck: deck.spots.length, osm: osmRows.length, osmDuplicatesSkipped: osmDuplicates, matched: deckRows.filter((d) => d.match).length,
      new: fresh.length, newPassingShelf: fresh.filter((f) => f.shelf.startsWith("in")).length,
      possiblyClosed: closed.length, changed: changed.length,
      matchedBy: deckRows.reduce((acc, d) => {
        if (d.match) { const k = d.how.replace(/ \d+m$/, ""); acc[k] = (acc[k] ?? 0) + 1; }
        return acc;
      }, {}),
    },
    loosePairs: deckRows
      .filter((d) => d.match && /name\+town|rename/.test(d.how))
      .map((d) => ({ how: d.how, deck: `${d.spot.name} | ${d.spot.address}`, osm: `${d.match.spot.name} | ${d.match.spot.address} (${d.match.osm})` })),
    new: fresh, possiblyClosed: closed, changed,
  };
}

// ---------- write ----------
function writeDeck(deck, result) {
  const byId = new Map(deck.spots.map((s) => [s.id, { ...s }]));
  if (flag("--apply-changes")) {
    for (const c of result.changed) {
      const s = byId.get(c.id);
      if (!s) continue;
      if (c.fields.name) s.name = c.fields.name[1];
      if (c.fields.cuisine) { s.cuisine = c.fields.cuisine[1]; if (s.knownFor === c.fields.cuisine[0]) s.knownFor = c.fields.cuisine[1]; }
      if (c.fields.address) s.address = c.fields.address[1];
    }
  }
  if (flag("--prune")) for (const c of result.possiblyClosed) byId.delete(c.id);
  const ids = new Set(byId.keys());
  for (const f of result.new) {
    if (flag("--shelf-only") && !f.shelf.startsWith("in")) continue;
    if (ids.has(f.spot.id)) continue;
    ids.add(f.spot.id);
    byId.set(f.spot.id, f.spot);
  }
  const body = JSON.stringify([...byId.values()], null, 2);
  const out = deck.src.slice(0, deck.start) + body + deck.src.slice(deck.end);
  fs.writeFileSync(SCRAPED_PATH, out);
  console.error(`Wrote ${byId.size} entries to ${path.relative(ROOT, SCRAPED_PATH)}`);
}

// ---------- main ----------
const deck = loadDeck();
let raw;
if (opt("--from")) raw = JSON.parse(fs.readFileSync(opt("--from"), "utf8"));
else raw = await fetchOverpass();
if (opt("--save-raw")) fs.writeFileSync(opt("--save-raw"), JSON.stringify(raw));

const result = diff(deck, raw, loadCuratedNames(), loadShelf());
const outPath = opt("--out") ?? path.join(ROOT, "deck-refresh", `diff-${new Date().toLocaleDateString("en-CA", { timeZone: "America/Chicago" })}.json`);
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(result, null, 2));

if (flag("--json")) console.log(JSON.stringify(result, null, 2));
else {
  const c = result.counts;
  console.log(`OSM data as of ${result.osmBase}. Deck ${c.deck}, OSM ${c.osm}, matched ${c.matched}.`);
  console.log(`NEW ${c.new} (${c.newPassingShelf} pass shelf) · POSSIBLY CLOSED ${c.possiblyClosed} · CHANGED ${c.changed}\n`);
  console.log("NEW:");
  for (const f of result.new) console.log(`  [${f.shelf}] ${f.name} — ${f.address} (${f.amenity}, ${f.cuisine})${f.alreadyCurated ? ` · name already curated in spots.ts as "${f.alreadyCurated}" (check location)` : ""}`);
  console.log("\nPOSSIBLY CLOSED:");
  for (const d of result.possiblyClosed) console.log(`  ${d.name} — ${d.address}${d.evidence ? ` · ${d.evidence}` : ""}`);
  console.log("\nCHANGED:");
  for (const ch of result.changed) console.log(`  ${ch.id} [${ch.match}]: ${Object.entries(ch.fields).map(([k, [a, b]]) => `${k}: ${a} → ${b}`).join("; ")}`);
  console.log(`\nDiff written to ${path.relative(ROOT, outPath)}`);
}
if (flag("--write")) writeDeck(deck, result);
