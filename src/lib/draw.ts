import type { Spot } from "@/data/spots";
import { isGemEligible } from "@/data/shelf";

export function chooseSpot(pool: Spot[], leanGems: boolean, avoidId: string | null) {
  if (pool.length === 0) return null;
  let list = avoidId ? pool.filter((s) => s.id !== avoidId) : pool;
  if (list.length === 0) list = pool;
  const weights = list.map((s) => (leanGems && isGemEligible(s) ? 3 : 1));
  const total = weights.reduce((sum, n) => sum + n, 0);
  let cursor = Math.random() * total;
  for (let i = 0; i < list.length; i++) {
    cursor -= weights[i] ?? 0;
    if (cursor <= 0) return list[i] ?? null;
  }
  return list[list.length - 1] ?? null;
}

/** One pass through the current result list. Repeats only after every match has been drawn. */
export function drawNext(pool: Spot[], already: string[], leanGems: boolean) {
  if (pool.length === 0) return { pick: null as Spot | null, drawnIds: [] as string[] };
  const inPool = new Set(pool.map((spot) => spot.id));
  const kept = already.filter((id) => inPool.has(id));
  let remaining = pool.filter((spot) => !kept.includes(spot.id));
  let base = kept;
  let avoid: string | null = null;
  if (remaining.length === 0) {
    remaining = pool;
    base = [];
    avoid = kept[kept.length - 1] ?? null;
  }
  const pick = chooseSpot(remaining, leanGems, remaining.length > 1 ? avoid : null);
  if (!pick) return { pick: null, drawnIds: base };
  return { pick, drawnIds: [...base, pick.id] };
}

/** Shown through the opening day. Hidden once that calendar day has passed. */
export function openingLabel(opens: string | undefined, today = new Date()) {
  if (!opens) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(opens);
  if (!match) return null;
  const openDay = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (openDay < startToday) return null;
  const formatted = openDay.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return openDay.getTime() === startToday.getTime() ? `Opens today, ${formatted}` : `Opens ${formatted}`;
}

/** A location the history article treats as still open from before 1960. */
export function historicYear(since: number | undefined) {
  return since != null && since < 1960 ? since : null;
}

export function isFastFood(spot: { note: string; fastFood?: boolean }) {
  return spot.fastFood === true || spot.note.includes("fast-food");
}

export function isCoffeeShop(spot: { cuisine: string }) {
  return spot.cuisine === "Coffee";
}

/** A bar, brewery, or bar-and-grill. These locations also stay in Restaurant. */
const BAR_BY_DESCRIPTION = new Set([
  "artichokesandwichbar",
  "barleycorns",
  "carlsbardelicatessen",
  "dockum",
  "loveco",
  "saraandtedros",
  "thejamesrye",
  "themonarch",
  "winedivekitchen",
]);

export function isBarGrill(spot: { name: string }) {
  const name = spot.name.toLowerCase();
  const key = name.replace(/[^a-z0-9]/g, "");
  if (BAR_BY_DESCRIPTION.has(key)) return true;
  if (/bar\s*&\s*grill|bar\s+and\s+grill|bar\s*&\s*grille|grill\s*&\s*bar|grill\s+and\s+bar/.test(name)) {
    return true;
  }
  if (/\b(brewery|brewing)\b/.test(name)) return true;
  if (/\b(sports grill|sport bar|burger pub|saloon|tapworks|lounge|pub|tavern)\b/.test(name)) return true;
  if (name.includes("public at the brickyard")) return true;
  if (/&\s*bar\b|\band\s+bar\b/.test(name)) return true;
  return false;
}

export function filterSpots(
  spots: Spot[],
  opts: {
    town: string;
    area: string;
    cuisines: string[];
    prices: number[];
    vibes: string[];
    diets: string[];
    gemsOnly: boolean;
    skipBeen: boolean;
    beenIds: string[];
    query: string;
    service: "any" | "truck" | "brick" | "fast" | "coffee" | "bar";
  },
) {
  const q = opts.query.trim().toLowerCase();
  return spots.filter((s) => {
    if (opts.town !== "Any" && s.town !== opts.town) return false;
    if (opts.area !== "Any" && s.area !== opts.area) return false;
    if (opts.service === "truck" && !s.truck) return false;
    if (opts.service === "fast" && !isFastFood(s)) return false;
    if (opts.service === "coffee" && !isCoffeeShop(s)) return false;
    if (opts.service === "bar" && !isBarGrill(s)) return false;
    if (opts.service === "brick" && (s.truck || isFastFood(s) || isCoffeeShop(s))) return false;
    if (opts.cuisines.length && !opts.cuisines.includes(s.cuisine)) return false;
    if (opts.prices.length && !opts.prices.includes(s.price)) return false;
    if (opts.vibes.length && !s.vibes.some((v) => opts.vibes.includes(v))) return false;
    if (opts.diets.length && !opts.diets.every((d) => s.diet.includes(d as Spot["diet"][number]))) return false;
    if (opts.gemsOnly && !isGemEligible(s)) return false;
    if (opts.skipBeen && opts.beenIds.includes(s.id)) return false;
    if (!q) return true;
    const hay = `${s.name} ${s.cuisine} ${s.area} ${s.town} ${s.knownFor} ${s.note}${s.truck ? " food truck" : ""}${isFastFood(s) ? " fast food" : ""}${isCoffeeShop(s) ? " coffee shop" : ""}${isBarGrill(s) ? " bar grill" : ""}`.toLowerCase();
    return hay.includes(q);
  });
}
