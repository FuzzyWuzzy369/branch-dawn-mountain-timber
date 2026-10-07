/** Shelf rules: QSR filter exceptions + gem eligibility. */

export type ShelfSpot = {
  id: string;
  name: string;
  gem: boolean;
  town: string;
  address: string;
};

function nameKey(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

/** Wichita-born QSR kept on the shelf (national QSR still filtered out). */
const WICHITA_BORN_QSR = new Set(["spangles", "tacotico", "tacogrande"]);

export function isWichitaBornQsr(name: string) {
  const key = nameKey(name);
  return key.startsWith("freddy") || WICHITA_BORN_QSR.has(key);
}

/** National/regional QSR OUT. Exceptions stay via isWichitaBornQsr. */
const CHAIN_FAST_FOOD = new Set([
  "mcdonalds","subway","tacobell","sonic","sonicdrivein","arbys","wendys","burgerking","braums",
  "dominos","chipotle","dqgrillchill","dairyqueen","chickfila","dunkin","jimmyjohns","kfc",
  "littlecaesars","panerabread","papajohns","papamurphys","schlotzskys","popeyes","culvers",
  "fiveguys","fazolis","firehousesubs","jerseymikessubs","pizzahut","pizzahutdelivery",
  "longjohnsilvers","pandaexpress","qdoba","raisingcanes","slimchickens","goldenchick","wingstop",
  "fuzzystacoshop","cinnabon","krispykreme","krispykrunchychicken","louisianasfamousfriedchicken",
  "mrgoodcents","mrgoodcentssubspastas","billysimsbbq","chicknmax","aw","daylightdonuts",
  "winchellsdonuthouse","lamarsdonutsandcoffee","gambinospizza","chickensaladchick",
  "teriyakimadness","smallssliders","newkseatery","daveshotchicken","konaiceofgreaterwichita",
]);

export function isChainFastFood(name: string) {
  const key = nameKey(name);
  if (isWichitaBornQsr(name)) return false;
  if (key.includes("museum")) return false;
  for (const chain of CHAIN_FAST_FOOD) {
    if (key === chain) return true;
    if (chain.length >= 8 && key.includes(chain)) return true;
  }
  return false;
}

const SITDOWN_CHAIN_GEM_SKIP = new Set([
  "applebees","olivegarden","chilis","outbacksteakhouse","texasroadhouse","redlobster",
  "buffalowildwings","bww","ihop","denny","dennys","crackerbarrel","tgifriday","fridays",
  "longhornsteakhouse","perkins","villageinn",
]);

let nameCounts: Map<string, number> | null = null;

export function rememberShelfCounts(spots: { name: string }[]) {
  const counts = new Map<string, number>();
  for (const spot of spots) {
    const key = nameKey(spot.name);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  nameCounts = counts;
}

/**
 * Gems-only is fine without vetting, but auto-skip chains / multi-location
 * brands from the gem pool (Wichita-born QSR also never count as gems).
 */
export function isGemEligible(spot: { name: string; gem: boolean }) {
  if (!spot.gem) return false;
  if (isWichitaBornQsr(spot.name)) return false;
  const key = nameKey(spot.name);
  if (nameCounts && (nameCounts.get(key) ?? 0) > 1) return false;
  for (const chain of SITDOWN_CHAIN_GEM_SKIP) {
    if (key === chain || (chain.length >= 8 && key.includes(chain))) return false;
  }
  return true;
}

export const OSM_ATTRIBUTION = "Map data © OpenStreetMap contributors";

export function filterChainQsr<T extends { name: string }>(spots: T[]) {
  return spots.filter((spot) => !isChainFastFood(spot.name));
}
