import { todayKey } from "@/lib/utils";

/** Soft daily free-draw *display* reference (spin is never blocked). */
export const FREE_DRAWS_PER_DAY = 5;

/** Soft Pro nudge after roughly this many lifetime free draws (after result lands). */
export const SOFT_PRO_NUDGE_AFTER_DRAWS = 15;

/** Light-user quieter cadence: remind about every N draws while below power-user. */
export const LIGHT_USER_NUDGE_EVERY_DRAWS = 10;

/** Shortlist cap before Pro on locked devices. */
export const FREE_SAVES = 3;

/**
 * Power-user cohort threshold: louder Pro ask at this weekly draw count.
 * Product lock — exactly 30 draws per rolling week (not ~30–40).
 */
export const POWER_USER_DRAWS_PER_WEEK = 30;

/** Day-one SKUs (yearly held/hidden). */
export const PRO_PRICE_ONCE = "$6.99 once";
export const PRO_PRICE_MONTHLY = "$0.99/mo";
export const PRO_PRICE_YEARLY_HELD = "$14.99/yr";

/** Google Places on-draw open-check hard daily cap; at cap → skip (never fake verified). */
export const PLACES_OPEN_CHECK_DAILY_CAP = 25;

/** Unique reporters before a Not-a-fit flag escalates for hand/OSM review. Never auto-delete. */
export const REPORT_ESCALATE_AFTER_UNIQUE = 3;

/** Sum draws recorded in `drawsByDay` over the last `days` calendar days (inclusive of today). */
export function drawsInLastDays(drawsByDay: Record<string, number>, days = 7, now = new Date()) {
  let total = 0;
  for (let i = 0; i < days; i++) {
    const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    total += drawsByDay[todayKey(day)] ?? 0;
  }
  return total;
}

export function lifetimeDraws(drawsByDay: Record<string, number>) {
  return Object.values(drawsByDay).reduce((sum, n) => sum + (n || 0), 0);
}

export function isPowerUserWeek(drawsByDay: Record<string, number>, now = new Date()) {
  return drawsInLastDays(drawsByDay, 7, now) >= POWER_USER_DRAWS_PER_WEEK;
}

export type NudgeState = {
  /** YYYY-MM-DD silenced for light-user "Not now". */
  silenceDay?: string;
  /** Consecutive calendar days the user tapped Not now (light path). */
  notNowStreak?: number;
  /** YYYY-MM-DD of last Not now. */
  lastNotNowDay?: string;
  /** YYYY-MM-DD until which light nudges wait (after two consecutive Not-now days). */
  waitUntil?: string;
  /** Lifetime draws count when soft/light nudge last shown. */
  lastNudgeAtDraws?: number;
  /** YYYY-MM-DD light nudge last shown (once/day max). */
  lastLightNudgeDay?: string;
};

function addDays(key: string, days: number) {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(y!, (m ?? 1) - 1, d ?? 1);
  dt.setDate(dt.getDate() + days);
  return todayKey(dt);
}

/**
 * Whether to show a Pro nudge *after* a result has landed (never before/during spin).
 * Power users: louder path, no cool-down.
 * Light users: quieter cadence + Not-now silence rules.
 */
export function shouldShowProNudge(opts: {
  locked: boolean;
  drawsByDay: Record<string, number>;
  nudge: NudgeState;
  now?: Date;
}): { show: boolean; kind: "soft" | "light" | "power" | null } {
  const now = opts.now ?? new Date();
  if (!opts.locked) return { show: false, kind: null };

  const today = todayKey(now);
  const week = drawsInLastDays(opts.drawsByDay, 7, now);
  const life = lifetimeDraws(opts.drawsByDay);

  if (week >= POWER_USER_DRAWS_PER_WEEK) {
    return { show: true, kind: "power" };
  }

  if (opts.nudge.waitUntil && opts.nudge.waitUntil > today) {
    return { show: false, kind: null };
  }
  if (opts.nudge.silenceDay === today) {
    return { show: false, kind: null };
  }

  // Soft first ask after ~15 lifetime free draws.
  if (life >= SOFT_PRO_NUDGE_AFTER_DRAWS && (opts.nudge.lastNudgeAtDraws ?? 0) < SOFT_PRO_NUDGE_AFTER_DRAWS) {
    return { show: true, kind: "soft" };
  }

  // Light quieter cadence: every ~10 draws, once/day max.
  if (life >= SOFT_PRO_NUDGE_AFTER_DRAWS) {
    const since = life - (opts.nudge.lastNudgeAtDraws ?? SOFT_PRO_NUDGE_AFTER_DRAWS);
    if (since >= LIGHT_USER_NUDGE_EVERY_DRAWS && opts.nudge.lastLightNudgeDay !== today) {
      return { show: true, kind: "light" };
    }
  }

  return { show: false, kind: null };
}

/** Apply "Not now" on the light/soft path (power path has no cool-down). */
export function applyNotNow(nudge: NudgeState, now = new Date()): NudgeState {
  const today = todayKey(now);
  const yesterday = addDays(today, -1);
  const streak =
    nudge.lastNotNowDay === yesterday || nudge.lastNotNowDay === today
      ? (nudge.notNowStreak ?? 0) + (nudge.lastNotNowDay === today ? 0 : 1)
      : 1;
  const next: NudgeState = {
    ...nudge,
    silenceDay: today,
    lastNotNowDay: today,
    notNowStreak: streak,
  };
  if (streak >= 2) {
    next.waitUntil = addDays(today, 7);
    next.notNowStreak = 0;
  }
  return next;
}

export function markNudgeShown(nudge: NudgeState, life: number, now = new Date()): NudgeState {
  return {
    ...nudge,
    lastNudgeAtDraws: life,
    lastLightNudgeDay: todayKey(now),
  };
}
