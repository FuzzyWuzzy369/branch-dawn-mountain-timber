import { createServerFn } from "@tanstack/react-start";
import { PLACES_OPEN_CHECK_DAILY_CAP } from "@/lib/limits";
import { todayKey } from "@/lib/utils";

export type OpenCheckResult =
  | { status: "open"; verified: true; source: "google_places" }
  | { status: "closed"; verified: true; source: "google_places" }
  | { status: "skipped"; verified: false; reason: "no_key" | "cap" | "unavailable" };

/** In-memory daily counter for Places open-checks (per server instance). */
const checksByDay: Record<string, number> = {};

/**
 * On-draw open-check stub. When GOOGLE_PLACES_API_KEY is missing or the hard
 * daily cap is hit, SKIP — never invent a verified badge. Street View later.
 */
export const checkSpotOpen = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (!data || typeof data !== "object" || typeof (data as { spotId?: unknown }).spotId !== "string") {
      throw new Error("spotId required");
    }
    const spotId = (data as { spotId: string }).spotId.trim();
    if (!spotId || spotId.length > 200) throw new Error("spotId required");
    return { spotId };
  })
  .handler(async ({ data }): Promise<OpenCheckResult> => {
    void data.spotId;
    const { env } = await import("@/lib/env.server");
    const key = env("GOOGLE_PLACES_API_KEY");
    if (!key) return { status: "skipped", verified: false, reason: "no_key" };

    const day = todayKey();
    const used = checksByDay[day] ?? 0;
    if (used >= PLACES_OPEN_CHECK_DAILY_CAP) {
      return { status: "skipped", verified: false, reason: "cap" };
    }
    checksByDay[day] = used + 1;

    // Key present but live Places call not wired yet — skip honestly (no fake verified).
    return { status: "skipped", verified: false, reason: "unavailable" };
  });
