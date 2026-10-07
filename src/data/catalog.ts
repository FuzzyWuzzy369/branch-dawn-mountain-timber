import { SCRAPED } from "./scraped";
import { SPOTS as BASE_SPOTS, nearestTown, TOWN_POINTS, type Spot } from "./spots";
import { filterChainQsr, isWichitaBornQsr, rememberShelfCounts } from "./shelf";

/** Re-add Wichita-born QSR that older spots.ts builds still filtered out. */
const bornBack = SCRAPED.filter(
  (spot) => isWichitaBornQsr(spot.name) && !BASE_SPOTS.some((base) => base.id === spot.id),
);

export const SPOTS: Spot[] = filterChainQsr([...BASE_SPOTS, ...bornBack]);
rememberShelfCounts(SPOTS);

export const TOWNS = [...new Set(SPOTS.map((s) => s.town))];
export { nearestTown, TOWN_POINTS };
export type { Spot };
