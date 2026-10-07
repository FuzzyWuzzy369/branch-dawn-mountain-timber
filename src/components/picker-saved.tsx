import { Link } from "@tanstack/react-router";
import { Heart, X } from "lucide-react";
import { SPOTS, type Spot } from "@/data/catalog";
import { historicYear, openingLabel } from "@/lib/draw";

export function PickerSavedLists({
  mounted,
  favoriteIds,
  savedIds,
  toggleFavorite,
  toggleSaved,
  setResult,
}: {
  mounted: boolean;
  favoriteIds: string[];
  savedIds: string[];
  toggleFavorite: (id: string) => void;
  toggleSaved: (id: string) => void;
  setResult: (spot: Spot) => void;
}) {
  return (
    <>
          {mounted && favoriteIds.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-sm font-medium text-muted">Favorites</h2>
              <ul className="mt-2 divide-y divide-line rounded-lg border border-line bg-surface">
                {favoriteIds.map((id) => {
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
                        onClick={() => toggleFavorite(id)}
                      >
                        <Heart className="size-4" fill="currentColor" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          {mounted && savedIds.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-sm font-medium text-muted">Shortlist</h2>
              <ul className="mt-2 divide-y divide-line rounded-lg border border-line bg-surface">
                {savedIds.map((id) => {
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
                        onClick={() => toggleSaved(id)}
                      >
                        <X className="size-4" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

    </>
  );
}
