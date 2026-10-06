import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Bookmark,
  Check,
  ChevronDown,
  Heart,
  MapPin,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { nearestTown, SPOTS, type Spot } from "@/data/spots";
import { redeemProCode, type Billing } from "@/lib/billing";
import { drawNext, filterSpots, historicYear, isBarGrill, isCoffeeShop, isFastFood, openingLabel } from "@/lib/draw";
import { useTable } from "@/lib/store";
import { cn, mapsUrl, priceMarks, todayKey } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeButton } from "@/components/theme-button";

const FREE_DRAWS = 5;
const FREE_SAVES = 3;

const VIBES = [
  ["casual", "Casual"],
  ["date", "Date"],
  ["group", "Group"],
  ["quick", "Quick"],
  ["solo", "Solo"],
  ["late", "Late"],
  ["celebration", "Occasion"],
] as const;

const DIETS = [
  ["vegetarian", "Vegetarian"],
  ["vegan", "Vegan"],
  ["halal", "Halal"],
] as const;

const PRICES = [
  [1, "$"],
  [2, "$$"],
  [3, "$$$"],
  [4, "$$$$"],
] as const;

export function Picker({ billing, spotId }: { billing: Billing; spotId?: string }) {
  const store = useTable();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Spot | null>(null);
  const [seenDraws, setSeenDraws] = useState<{ key: string; ids: string[] }>({ key: "", ids: [] });
  const [spinning, setSpinning] = useState(false);
  const [reel, setReel] = useState<string | null>(null);
  const [payOpen, setPayOpen] = useState(false);
  const [locNote, setLocNote] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [codeMsg, setCodeMsg] = useState<string | null>(null);
  const [more, setMore] = useState(false);
  const [holdSpot, setHoldSpot] = useState(spotId ?? null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (useTable.persist.hasHydrated()) {
      useTable.getState().setHydrated(true);
      return;
    }
    void Promise.resolve(useTable.persist.rehydrate()).then(() => {
      useTable.getState().setHydrated(true);
    });
  }, []);

  useEffect(() => {
    setHoldSpot(spotId ?? null);
  }, [spotId]);

  useEffect(() => {
    if (!holdSpot) return;
    const spot = SPOTS.find((item) => item.id === holdSpot);
    if (!spot) return;
    setResult(spot);
    setReel(spot.name);
  }, [holdSpot]);

  useEffect(() => {
    if (!store.hydrated || !billing.paymentsLive || store.pro) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("upgraded") !== "1") return;
    if (sessionStorage.getItem("stray-checkout") !== "1") return;
    sessionStorage.removeItem("stray-checkout");
    useTable.getState().setPro(true);
    params.delete("upgraded");
    const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}`;
    window.history.replaceState({}, "", next);
  }, [store.hydrated, store.pro, billing.paymentsLive]);

  const locked = billing.paymentsLive && !store.pro;
  const drawsToday = store.drawsByDay[todayKey()] ?? 0;
  const drawsLeft = Math.max(0, FREE_DRAWS - drawsToday);

  const cuisines = useMemo(
    () => [...new Set(SPOTS.map((s) => s.cuisine))].sort((a, b) => a.localeCompare(b)),
    [],
  );
  const towns = useMemo(
    () => [...new Set(SPOTS.map((s) => s.town))].sort((a, b) => a.localeCompare(b)),
    [],
  );
  const areas = useMemo(() => {
    const source = store.town === "Any" ? SPOTS : SPOTS.filter((s) => s.town === store.town);
    return [...new Set(source.map((s) => s.area))].sort((a, b) => a.localeCompare(b));
  }, [store.town]);

  const pool = useMemo(
    () =>
      filterSpots(SPOTS, {
        town: store.town,
        area: store.area,
        cuisines: store.cuisines,
        prices: store.prices,
        vibes: locked ? [] : store.vibes,
        diets: locked ? [] : store.diets,
        gemsOnly: locked ? false : store.gemsOnly,
        skipBeen: locked ? false : store.skipBeen,
        beenIds: store.beenIds,
        query,
        service: store.service,
      }),
    [store, locked, query],
  );

  function guardPro(action: () => void) {
    if (locked) {
      setPayOpen(true);
      return;
    }
    action();
  }

  function releaseSpotPin() {
    setHoldSpot(null);
    if (!spotId) return;
    void navigate({ to: "/", search: {}, replace: true });
  }

  function draw() {
    if (spinning) return;
    if (locked && drawsLeft <= 0) {
      setPayOpen(true);
      return;
    }
    if (pool.length === 0) return;
    const poolKey = pool.map((spot) => spot.id).join("\n");
    const already = seenDraws.key === poolKey ? seenDraws.ids : [];
    const { pick, drawnIds } = drawNext(pool, already, !locked && store.leanGems);
    if (!pick) return;
    setSeenDraws({ key: poolKey, ids: drawnIds });
    releaseSpotPin();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setResult(pick);
      setReel(pick.name);
      if (locked) store.recordDraw(todayKey());
      return;
    }
    setSpinning(true);
    const started = performance.now();
    const tick = () => {
      const sample = pool[Math.floor(Math.random() * pool.length)];
      setReel(sample?.name ?? pick.name);
      if (performance.now() - started < 900) {
        window.setTimeout(tick, 70);
        return;
      }
      setReel(pick.name);
      setResult(pick);
      setSpinning(false);
      if (locked) store.recordDraw(todayKey());
    };
    tick();
  }

  function useLocation() {
    if (!navigator.geolocation) {
      setLocNote("Location is not available in this browser. Pick a town instead.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const near = nearestTown(pos.coords.latitude, pos.coords.longitude);
        if (!near) {
          setLocNote("That pin is outside the Wichita metro and Hutchinson. Pick a town instead.");
          return;
        }
        store.setTown(near.town);
        setLocNote(`Set to ${near.town}, about ${Math.max(1, Math.round(near.miles))} miles from this pin.`);
      },
      () => setLocNote("Location was blocked. Pick a town instead."),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  }

  async function shareSpot(spot: Spot) {
    const text = `${spot.name} — ${spot.cuisine} in ${spot.area}, ${spot.town}. ${spot.knownFor}.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: spot.name, text, url: mapsUrl(spot.name, spot.address) });
        return;
      } catch {
        /* dismissed */
      }
    }
    await navigator.clipboard.writeText(`${text} ${mapsUrl(spot.name, spot.address)}`);
    setLocNote("Copied a link you can send.");
  }

  function startCheckout() {
    if (!billing.checkoutUrl) return;
    sessionStorage.setItem("stray-checkout", "1");
    window.location.href = billing.checkoutUrl;
  }

  async function redeem(event: React.FormEvent) {
    event.preventDefault();
    setCodeMsg(null);
    try {
      const res = await redeemProCode({ data: { code } });
      if (res.ok) {
        store.setPro(true);
        setPayOpen(false);
        setCode("");
        return;
      }
      setCodeMsg("That code does not match.");
    } catch (error) {
      setCodeMsg(error instanceof Error ? error.message : "Could not check that code.");
    }
  }

  useEffect(() => {
    if (!result || spinning) return;
    if (holdSpot && result.id === holdSpot) return;
    if (!pool.some((spot) => spot.id === result.id)) {
      setResult(null);
      setReel(null);
    }
  }, [pool, result, spinning, holdSpot]);

  useEffect(() => {
    if (!holdSpot || result?.id !== holdSpot) return;
    document.getElementById("drawn-table")?.scrollIntoView({ block: "start" });
  }, [holdSpot, result]);

  const shown = result;
  const saveBlocked = locked && !store.savedIds.includes(shown?.id ?? "") && store.savedIds.length >= FREE_SAVES;
  const historic = !spinning && shown ? historicYear(shown.since) : null;

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 pt-6 pb-2">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">Wichita metro</p>
          <p className="font-display text-xl leading-none font-medium tracking-tight">Stray Table</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeButton />
          <Button variant="secondary" size="sm" onClick={() => setPayOpen(true)}>
            {store.pro && billing.paymentsLive ? "Pro" : "Stray Pro"}
          </Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-6 px-4 pt-4 pb-16 lg:grid-cols-[17rem_1fr] lg:items-start">
        <section className="order-1 lg:order-2">
          <h1 className="font-display text-3xl leading-tight font-medium tracking-tight">
            Where should we eat?
          </h1>
          <p className="mt-2 max-w-xl text-muted">
            Draw a real table from the city list. Narrow it, then let the
            list pick — lesser-known locations weigh heavier.
          </p>
          <Button variant="secondary" className="mt-4" asChild>
            <Link to="/history">Read Wichita's dining history</Link>
          </Button>

          <div
            id="drawn-table"
            className={cn(
              "mt-6 rounded-xl border p-5 sm:p-6",
              historic ? "border-accent bg-chip" : "border-line bg-surface",
            )}
          >
            <p className="text-xs font-medium tracking-wide text-faint uppercase">
              {spinning ? "Drawing" : historic ? "Historic location" : shown ? "Tonight" : "Ready"}
            </p>
            <p
              className={cn(
                "reel-name font-display mt-2 min-h-16 text-3xl leading-tight font-medium tracking-tight",
                spinning && "is-spinning",
              )}
              aria-live="polite"
            >
              {reel ?? "Draw a table"}
            </p>
            {shown && !spinning ? (
              <div className="mt-3">
                <p className="text-sm text-muted">
                  {shown.area}, {shown.town} · {shown.county} County
                </p>
                {openingLabel(shown.opens) ? (
                  <p className="mt-3 text-sm font-medium">{openingLabel(shown.opens)}</p>
                ) : null}
                {historic ? (
                  <p className="mt-3">
                    <span className="inline-block rounded-md bg-accent px-2 py-1 text-xs font-medium tracking-wide text-on-accent uppercase">
                      Open since {historic}
                    </span>
                  </p>
                ) : null}
                <p className="mt-3 text-base">{shown.note}</p>
                <p className="mt-3 text-sm text-muted">
                  {shown.cuisine} · {priceMarks(shown.price)} · {shown.knownFor}
                  {shown.truck ? " · Food truck" : ""}
                  {isFastFood(shown) ? " · Fast food" : ""}
                  {isCoffeeShop(shown) ? " · Coffee shop" : ""}
                  {isBarGrill(shown) ? " · Bar & grill" : ""}
                  {shown.gem ? " · Off the usual list" : ""}
                </p>
                <p className="mt-2 text-sm text-faint">{shown.address}</p>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <Button asChild>
                    <a href={mapsUrl(shown.name, shown.address)} target="_blank" rel="noreferrer">
                      <MapPin className="size-4" aria-hidden />
                      Open in Maps
                    </a>
                  </Button>
                  <Button
                    variant={store.favoriteIds.includes(shown.id) ? "primary" : "secondary"}
                    aria-pressed={store.favoriteIds.includes(shown.id)}
                    onClick={() => store.toggleFavorite(shown.id)}
                  >
                    <Heart
                      className="size-4"
                      fill={store.favoriteIds.includes(shown.id) ? "currentColor" : "none"}
                      aria-hidden
                    />
                    {store.favoriteIds.includes(shown.id) ? "Favorited" : "Favorite"}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      if (saveBlocked) {
                        setPayOpen(true);
                        return;
                      }
                      store.toggleSaved(shown.id);
                    }}
                  >
                    <Bookmark className="size-4" aria-hidden />
                    {store.savedIds.includes(shown.id) ? "Shortlisted" : "Shortlist"}
                  </Button>
                  <Button variant="secondary" onClick={() => guardPro(() => store.toggleBeen(shown.id))}>
                    <Check className="size-4" aria-hidden />
                    {store.beenIds.includes(shown.id) ? "Been there" : "Mark been"}
                  </Button>
                  <Button variant="ghost" onClick={() => void shareSpot(shown)}>
                    Share
                  </Button>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-sm text-muted">
                {pool.length} {pool.length === 1 ? "table matches" : "tables match"}. Hours change —
                confirm they are open.
              </p>
            )}

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button size="lg" onClick={draw} disabled={spinning || pool.length === 0} className="sm:min-w-44">
                {spinning ? "Drawing…" : shown ? "Draw another" : "Draw a table"}
              </Button>
              {locked ? (
                <p className="text-sm text-muted tabular-nums">
                  {drawsLeft} free {drawsLeft === 1 ? "draw" : "draws"} left today
                </p>
              ) : null}
            </div>
            {pool.length === 0 ? (
              <p className="mt-3 text-sm text-muted">
                Nothing fits. Clear a filter or switch towns.
              </p>
            ) : null}
          </div>

          {mounted && store.favoriteIds.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-sm font-medium text-muted">Favorites</h2>
              <ul className="mt-2 divide-y divide-line rounded-lg border border-line bg-surface">
                {store.favoriteIds.map((id) => {
                  const spot = SPOTS.find((s) => s.id === id);
                  if (!spot) return null;
                  return (
                    <li key={id} className="flex items-center justify-between gap-3 px-4 py-3">
                      <button type="button" className="min-w-0 text-left" onClick={() => setResult(spot)}>
                        <span className="block truncate font-medium">{spot.name}</span>
                        <span className="block truncate text-sm text-muted">
                          {spot.cuisine} · {spot.town}
                          {spot.truck ? " · Food truck" : ""}
                          {historicYear(spot.since) ? ` · Open since ${historicYear(spot.since)}` : ""}
                        </span>
                      </button>
                      <button
                        type="button"
                        className="grid size-11 place-items-center text-accent"
                        aria-label={`Remove ${spot.name} from favorites`}
                        onClick={() => store.toggleFavorite(id)}
                      >
                        <Heart className="size-4" fill="currentColor" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          {mounted && store.savedIds.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-sm font-medium text-muted">Shortlist</h2>
              <ul className="mt-2 divide-y divide-line rounded-lg border border-line bg-surface">
                {store.savedIds.map((id) => {
                  const spot = SPOTS.find((s) => s.id === id);
                  if (!spot) return null;
                  return (
                    <li key={id} className="flex items-center justify-between gap-3 px-4 py-3">
                      <Link
                        to="/"
                        search={{ spot: id }}
                        className="min-w-0 text-left"
                      >
                        <span className="block truncate font-medium underline decoration-line underline-offset-2 hover:decoration-ink">
                          {spot.name}
                        </span>
                        <span className="block truncate text-sm text-muted">
                          {spot.cuisine} · {spot.town}
                          {spot.truck ? " · Food truck" : ""}
                          {historicYear(spot.since) ? ` · Open since ${historicYear(spot.since)}` : ""}
                          {openingLabel(spot.opens) ? ` · ${openingLabel(spot.opens)}` : ""}
                        </span>
                      </Link>
                      <button
                        type="button"
                        className="grid size-11 place-items-center text-muted"
                        aria-label={`Remove ${spot.name} from the shortlist`}
                        onClick={() => store.toggleSaved(id)}
                      >
                        <X className="size-4" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </section>

        <aside className="order-2 lg:sticky lg:top-4 lg:order-1">
          <div className="rounded-xl border border-line bg-surface p-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-medium">
                <SlidersHorizontal className="size-4" aria-hidden />
                Narrow it
              </h2>
              <button type="button" className="text-sm text-muted underline-offset-2 hover:underline" onClick={store.clearNarrowing}>
                Reset
              </button>
            </div>

            <label className="mt-4 block text-xs font-medium tracking-wide text-faint uppercase" htmlFor="town">
              Town
            </label>
            <select
              id="town"
              className="mt-1 h-11 w-full rounded-sm border border-line bg-paper px-3 text-sm"
              value={store.town}
              onChange={(e) => store.setTown(e.target.value)}
            >
              <option value="Any">All cities</option>
              {towns.map((town) => (
                <option key={town} value={town}>
                  {town}
                </option>
              ))}
            </select>
            <Button variant="ghost" size="sm" className="mt-1 px-0" onClick={useLocation}>
              <MapPin className="size-4" aria-hidden />
              Use my location
            </Button>
            {locNote ? <p className="text-sm text-muted">{locNote}</p> : null}

            <label className="mt-3 block text-xs font-medium tracking-wide text-faint uppercase" htmlFor="area">
              Neighborhood
            </label>
            <select
              id="area"
              className="mt-1 h-11 w-full rounded-sm border border-line bg-paper px-3 text-sm"
              value={areas.includes(store.area) ? store.area : "Any"}
              onChange={(e) => store.setArea(e.target.value)}
            >
              <option value="Any">Any neighborhood</option>
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>

            <label className="mt-4 block text-xs font-medium tracking-wide text-faint uppercase" htmlFor="q">
              Search
            </label>
            <input
              id="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pho, biryani, Delano…"
              className="mt-1 h-11 w-full rounded-sm border border-line bg-paper px-3 text-sm placeholder:text-faint"
            />

            <p className="mt-4 text-xs font-medium tracking-wide text-faint uppercase">Cuisine</p>
            <div className="mt-2 flex max-h-40 flex-wrap gap-2 overflow-y-auto">
              {cuisines.map((cuisine) => {
                const on = store.cuisines.includes(cuisine);
                return (
                  <button
                    key={cuisine}
                    type="button"
                    aria-pressed={on}
                    onClick={() => store.toggleCuisine(cuisine)}
                    className={cn(
                      "h-11 rounded-full border px-3 text-sm",
                      on ? "border-accent bg-accent text-on-accent" : "border-line bg-paper text-ink",
                    )}
                  >
                    {cuisine}
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-xs font-medium tracking-wide text-faint uppercase">Service</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  ["any", "Any"],
                  ["truck", "Food trucks"],
                  ["brick", "Restaurant"],
                  ["fast", "Fast food"],
                  ["coffee", "Coffee shops"],
                  ["bar", "Bar & grill"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={store.service === id}
                  onClick={() => store.setService(id)}
                  className={cn(
                    "h-11 rounded-full border px-3 text-sm",
                    store.service === id
                      ? "border-accent bg-accent text-on-accent"
                      : "border-line bg-paper text-ink",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <p className="mt-4 text-xs font-medium tracking-wide text-faint uppercase">Price</p>
            <div className="mt-2 flex gap-2">
              {PRICES.map(([value, label]) => {
                const on = store.prices.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => store.togglePrice(value)}
                    className={cn(
                      "h-11 min-w-11 flex-1 rounded-sm border text-sm tabular-nums",
                      on ? "border-accent bg-accent text-on-accent" : "border-line bg-paper",
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="mt-4 flex h-11 w-full items-center justify-between text-sm font-medium"
              onClick={() => setMore((v) => !v)}
              aria-expanded={more}
            >
              Occasion, diet, lesser-known
              <ChevronDown className={cn("size-4 text-muted transition-transform duration-150", more && "rotate-180")} aria-hidden />
            </button>
            {more ? (
              <div className="mt-1 space-y-4 border-t border-line pt-3">
                <fieldset>
                  <legend className="text-xs font-medium tracking-wide text-faint uppercase">Occasion</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {VIBES.map(([id, label]) => (
                      <Chip
                        key={id}
                        on={store.vibes.includes(id)}
                        label={label}
                        locked={locked}
                        onClick={() => guardPro(() => store.toggleVibe(id))}
                      />
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-xs font-medium tracking-wide text-faint uppercase">Diet</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {DIETS.map(([id, label]) => (
                      <Chip
                        key={id}
                        on={store.diets.includes(id)}
                        label={label}
                        locked={locked}
                        onClick={() => guardPro(() => store.toggleDiet(id))}
                      />
                    ))}
                  </div>
                </fieldset>
                <Toggle
                  label="Lesser-known only"
                  checked={!locked && store.gemsOnly}
                  locked={locked}
                  onChange={(v) => guardPro(() => store.setGemsOnly(v))}
                />
                <Toggle
                  label="Favor lesser-known"
                  checked={!locked && store.leanGems}
                  locked={locked}
                  onChange={(v) => guardPro(() => store.setLeanGems(v))}
                />
                <Toggle
                  label="Skip places I've been"
                  checked={!locked && store.skipBeen}
                  locked={locked}
                  onChange={(v) => guardPro(() => store.setSkipBeen(v))}
                />
                {locked ? (
                  <p className="text-sm text-muted">Occasion, diet, and the lesser-known bias are part of Pro.</p>
                ) : null}
              </div>
            ) : null}
          </div>
          <p className="mt-3 px-1 text-xs leading-relaxed text-faint">
            The shelf includes restaurants, cafes, fast food, and food trucks in Sedgwick, Butler, Harvey,
            Sumner, and Hutchinson. A new location is missing until it is on the public map or checked against a local
            opening list. A truck pin is a park or a licensed base. It may not be parked there today.
          </p>
        </aside>
      </main>

      <Paywall
        open={payOpen}
        onOpenChange={setPayOpen}
        billing={billing}
        pro={store.pro}
        code={code}
        setCode={setCode}
        codeMsg={codeMsg}
        onCheckout={startCheckout}
        onRedeem={redeem}
      />
    </div>
  );
}

function Chip({
  on,
  label,
  locked,
  onClick,
}: {
  on: boolean;
  label: string;
  locked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "h-11 rounded-full border px-3 text-sm",
        on ? "border-accent bg-accent text-on-accent" : "border-line bg-paper text-ink",
        locked && "opacity-70",
      )}
    >
      {label}
    </button>
  );
}

function Toggle({
  label,
  checked,
  locked,
  onChange,
}: {
  label: string;
  checked: boolean;
  locked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex h-11 items-center justify-between gap-3 text-sm">
      <span>{label}</span>
      <input
        type="checkbox"
        className="size-4 accent-ink"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-disabled={locked}
      />
    </label>
  );
}

function Paywall({
  open,
  onOpenChange,
  billing,
  pro,
  code,
  setCode,
  codeMsg,
  onCheckout,
  onRedeem,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  billing: Billing;
  pro: boolean;
  code: string;
  setCode: (value: string) => void;
  codeMsg: string | null;
  onCheckout: () => void;
  onRedeem: (event: React.FormEvent) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/40" />
        <Dialog.Content className="fixed inset-x-4 top-1/2 z-50 mx-auto max-h-dvh max-w-md -translate-y-1/2 overflow-y-auto rounded-xl border border-line bg-surface p-5 text-ink outline-none sm:p-6">
          <Dialog.Title className="font-display text-2xl font-medium tracking-tight">Stray Pro</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-muted">
            Unlimited draws, a bias toward lesser-known locations, occasion and diet filters, and a shortlist
            that does not stop at three.
          </Dialog.Description>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Free keeps town, neighborhood, cuisine, and price, with {FREE_DRAWS} draws a day.</li>
            <li>Pro is {billing.priceLabel} on this device.</li>
          </ul>
          {pro && billing.paymentsLive ? (
            <p className="mt-4 text-sm">Pro is on for this browser.</p>
          ) : billing.paymentsLive && billing.checkoutUrl ? (
            <Button className="mt-5 w-full" size="lg" onClick={onCheckout}>
              Unlock Pro · {billing.priceLabel}
            </Button>
          ) : (
            <div className="mt-4 rounded-lg border border-line bg-paper p-4 text-sm text-muted">
              {billing.preview ? (
                <p>
                  Checkout is not connected, so the full picker stays open while you try it. After you
                  publish, add <span className="text-ink">STRIPE_PAYMENT_LINK</span> in the app’s secret
                  settings — a Stripe Payment Link — and point its confirmation page at your site with{" "}
                  <span className="text-ink">?upgraded=1</span> on the end. Optional:{" "}
                  <span className="text-ink">PRO_PRICE_LABEL</span> and <span className="text-ink">PRO_RESTORE_CODE</span>.
                </p>
              ) : (
                <p>Pro checkout is not turned on yet. The free picker still works.</p>
              )}
            </div>
          )}
          {billing.restoreEnabled && !pro ? (
            <form className="mt-4" onSubmit={onRedeem}>
              <label className="text-xs font-medium tracking-wide text-faint uppercase" htmlFor="code">
                Restore code
              </label>
              <div className="mt-1 flex gap-2">
                <input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="h-11 min-w-0 flex-1 rounded-sm border border-line bg-paper px-3 text-sm"
                />
                <Button type="submit" variant="secondary">
                  Restore
                </Button>
              </div>
              {codeMsg ? <p className="mt-2 text-sm text-muted">{codeMsg}</p> : null}
            </form>
          ) : null}
          <Dialog.Close asChild>
            <Button variant="ghost" className="mt-3 w-full">
              Close
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
