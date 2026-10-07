import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NudgeState } from "@/lib/limits";

type Persisted = {
  town: string;
  area: string;
  cuisines: string[];
  prices: number[];
  vibes: string[];
  diets: string[];
  service: "any" | "truck" | "brick" | "fast" | "coffee" | "bar";
  gemsOnly: boolean;
  leanGems: boolean;
  skipBeen: boolean;
  favoriteIds: string[];
  beenIds: string[];
  /** Locally hidden after "Not a fit" — immediate for this reporter only. */
  hiddenIds: string[];
  pro: boolean;
  drawsByDay: Record<string, number>;
  nudge: NudgeState;
};

type Store = Persisted & {
  savedIds: string[];
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  setTown: (town: string) => void;
  setArea: (area: string) => void;
  toggleCuisine: (cuisine: string) => void;
  togglePrice: (price: number) => void;
  toggleVibe: (vibe: string) => void;
  toggleDiet: (diet: string) => void;
  setService: (value: "any" | "truck" | "brick" | "fast" | "coffee" | "bar") => void;
  setGemsOnly: (value: boolean) => void;
  setLeanGems: (value: boolean) => void;
  setSkipBeen: (value: boolean) => void;
  toggleSaved: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleBeen: (id: string) => void;
  setPro: (value: boolean) => void;
  recordDraw: (day: string) => void;
  hideSpot: (id: string) => void;
  setNudge: (nudge: NudgeState) => void;
  clearNarrowing: () => void;
};

const emptyNarrow = {
  area: "Any",
  cuisines: [] as string[],
  prices: [] as number[],
  vibes: [] as string[],
  diets: [] as string[],
  service: "brick" as const,
  gemsOnly: false,
};

const STORAGE_KEY = "stray-table";
const LISTS_KEY = "stray-table-lists";
const SHORTLIST_KEY = "stray-table-shortlist";

type KeptLists = {
  favoriteIds: string[];
  beenIds: string[];
};

function ids(value: unknown) {
  return Array.isArray(value) ? value.filter((id) => typeof id === "string") : [];
}

function readLists(): KeptLists | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LISTS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<KeptLists>;
    return { favoriteIds: ids(parsed.favoriteIds), beenIds: ids(parsed.beenIds) };
  } catch {
    return null;
  }
}

function writeLists(lists: KeptLists) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LISTS_KEY, JSON.stringify(lists));
}

function readShortlist() {
  if (typeof window === "undefined") return [];
  try {
    return ids(JSON.parse(window.sessionStorage.getItem(SHORTLIST_KEY) || "[]"));
  } catch {
    return [];
  }
}

function writeShortlist(savedIds: string[]) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(SHORTLIST_KEY, JSON.stringify(savedIds));
}

export const useTable = create<Store>()(
  persist(
    (set) => ({
      town: "Any",
      ...emptyNarrow,
      leanGems: true,
      skipBeen: false,
      savedIds: [],
      favoriteIds: [],
      beenIds: [],
      hiddenIds: [],
      pro: false,
      drawsByDay: {},
      nudge: {},
      hydrated: false,
      setHydrated: (hydrated) => set({ hydrated }),
      setTown: (town) => set({ town, area: "Any" }),
      setArea: (area) => set({ area }),
      toggleCuisine: (cuisine) =>
        set((s) => ({
          cuisines: s.cuisines.includes(cuisine)
            ? s.cuisines.filter((c) => c !== cuisine)
            : [...s.cuisines, cuisine],
        })),
      togglePrice: (price) =>
        set((s) => ({
          prices: s.prices.includes(price) ? s.prices.filter((p) => p !== price) : [...s.prices, price],
        })),
      toggleVibe: (vibe) =>
        set((s) => ({
          vibes: s.vibes.includes(vibe) ? s.vibes.filter((v) => v !== vibe) : [...s.vibes, vibe],
        })),
      toggleDiet: (diet) =>
        set((s) => ({
          diets: s.diets.includes(diet) ? s.diets.filter((d) => d !== diet) : [...s.diets, diet],
        })),
      setService: (service) => set({ service }),
      setGemsOnly: (gemsOnly) => set({ gemsOnly }),
      setLeanGems: (leanGems) => set({ leanGems }),
      setSkipBeen: (skipBeen) => set({ skipBeen }),
      toggleSaved: (id) =>
        set((s) => {
          const savedIds = s.savedIds.includes(id)
            ? s.savedIds.filter((x) => x !== id)
            : [...s.savedIds, id];
          writeShortlist(savedIds);
          return { savedIds };
        }),
      toggleFavorite: (id) =>
        set((s) => ({
          favoriteIds: s.favoriteIds.includes(id)
            ? s.favoriteIds.filter((x) => x !== id)
            : [...s.favoriteIds, id],
        })),
      toggleBeen: (id) =>
        set((s) => ({
          beenIds: s.beenIds.includes(id) ? s.beenIds.filter((x) => x !== id) : [...s.beenIds, id],
        })),
      setPro: (pro) => set({ pro }),
      recordDraw: (day) =>
        set((s) => ({ drawsByDay: { ...s.drawsByDay, [day]: (s.drawsByDay[day] ?? 0) + 1 } })),
      hideSpot: (id) =>
        set((s) => (s.hiddenIds.includes(id) ? s : { hiddenIds: [...s.hiddenIds, id] })),
      setNudge: (nudge) => set({ nudge }),
      clearNarrowing: () => set({ ...emptyNarrow, leanGems: true, skipBeen: false }),
    }),
    {
      name: STORAGE_KEY,
      skipHydration: true,
      version: 3,
      storage: {
        getItem: (name) => {
          if (typeof window === "undefined") return null;
          const raw = window.localStorage.getItem(name);
          return raw ? (JSON.parse(raw) as { state: Persisted; version?: number }) : null;
        },
        setItem: (name, value) => {
          if (typeof window === "undefined") return;
          const next = value.state;
          const wiping = next.favoriteIds.length === 0 && next.beenIds.length === 0;
          if (wiping && !useTable.persist.hasHydrated()) {
            const kept = readLists();
            let existingSaved = false;
            const existingRaw = window.localStorage.getItem(name);
            if (existingRaw) {
              try {
                const existing = JSON.parse(existingRaw) as { state?: Partial<KeptLists> };
                existingSaved = Boolean(existing.state?.favoriteIds?.length || existing.state?.beenIds?.length);
              } catch {
                existingSaved = false;
              }
            }
            if (existingSaved || kept?.favoriteIds.length || kept?.beenIds.length) return;
          }
          window.localStorage.setItem(name, JSON.stringify(value));
          writeLists({ favoriteIds: next.favoriteIds, beenIds: next.beenIds });
        },
        removeItem: (name) => {
          if (typeof window === "undefined") return;
          window.localStorage.removeItem(name);
        },
      },
      migrate: (persisted, version) => {
        const state = persisted as {
          trucksOnly?: boolean;
          service?: "any" | "truck" | "brick" | "fast" | "coffee" | "bar";
          savedIds?: string[];
          favoriteIds?: string[];
          beenIds?: string[];
        };
        if (!state.service) state.service = state.trucksOnly ? "truck" : "brick";
        if (version < 2 && state.service === "any") state.service = "brick";
        if (!state.favoriteIds) state.favoriteIds = [];
        if (!("hiddenIds" in state) || !Array.isArray((state as { hiddenIds?: unknown }).hiddenIds)) {
          (state as { hiddenIds: string[] }).hiddenIds = [];
        }
        if (!("nudge" in state) || typeof (state as { nudge?: unknown }).nudge !== "object") {
          (state as { nudge: NudgeState }).nudge = {};
        }
        delete state.savedIds;
        const kept = readLists();
        if (kept) {
          if (!state.favoriteIds.length && kept.favoriteIds.length) state.favoriteIds = kept.favoriteIds;
          if (!state.beenIds?.length && kept.beenIds.length) state.beenIds = kept.beenIds;
        }
        return state as Persisted;
      },
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as Partial<Persisted>),
        savedIds: readShortlist(),
      }),
      partialize: (s) => ({
        town: s.town,
        area: s.area,
        cuisines: s.cuisines,
        prices: s.prices,
        vibes: s.vibes,
        diets: s.diets,
        service: s.service,
        gemsOnly: s.gemsOnly,
        leanGems: s.leanGems,
        skipBeen: s.skipBeen,
        favoriteIds: s.favoriteIds,
        beenIds: s.beenIds,
        hiddenIds: s.hiddenIds,
        pro: s.pro,
        drawsByDay: s.drawsByDay,
        nudge: s.nudge,
      }),
      onRehydrateStorage: () => (state) => {
        const kept = readLists();
        if (state && kept) {
          const patch: Partial<KeptLists> = {};
          if (state.favoriteIds.length === 0 && kept.favoriteIds.length > 0) patch.favoriteIds = kept.favoriteIds;
          if (state.beenIds.length === 0 && kept.beenIds.length > 0) patch.beenIds = kept.beenIds;
          if (Object.keys(patch).length > 0) useTable.setState(patch);
        }
        useTable.setState({ savedIds: readShortlist() });
        useTable.getState().setHydrated(true);
      },
    },
  ),
);

if (typeof window !== "undefined") {
  void useTable.persist.rehydrate();
}
