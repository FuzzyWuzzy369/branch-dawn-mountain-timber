import type { Spot } from "@/data/catalog";
import { cn } from "@/lib/utils";

export type DrawAnimPhase = "idle" | "dealing" | "landed";

export function DrawStage({
  phase,
  spot,
  fallbackName,
}: {
  phase: DrawAnimPhase;
  spot: Spot | null;
  fallbackName: string | null;
}) {
  const title = spot?.name ?? fallbackName ?? "Your next table";
  const cuisine = spot?.cuisine ?? "Restaurant";
  const known = spot?.knownFor ?? "Tap draw to shuffle";

  return (
    <div className="draw-stage" aria-hidden={phase === "dealing" ? true : undefined}>
      <div className="draw-stage__glow" />
      <div className="draw-stage__row">
        <div className="draw-deck" aria-hidden>
          <div className="draw-deck__card">
            <span className="draw-deck__crown">♛</span>
          </div>
          <div className="draw-deck__card">
            <span className="draw-deck__crown">♛</span>
          </div>
          <div className="draw-deck__card">
            <span className="draw-deck__crown">♛</span>
          </div>
        </div>

        <div
          className={cn(
            "draw-fly",
            phase === "idle" && "is-idle",
            phase === "dealing" && "is-dealing",
            phase === "landed" && "is-landed",
          )}
        >
          <div className="draw-fly__face draw-fly__back">
            <div className="draw-fly__back-mark" aria-hidden>
              ♛
            </div>
          </div>
          <div className="draw-fly__face draw-fly__front">
            <div className="draw-fly__corner">
              <span>A</span>
              <span aria-hidden>♥</span>
            </div>
            <p className="draw-fly__title">{title}</p>
            <p className="draw-fly__meta">
              {cuisine}
              {spot ? ` · ${spot.area}` : ""}
            </p>
            <div className="draw-fly__banner">
              ♦ {known.length > 28 ? `${known.slice(0, 26)}…` : known} ♦
            </div>
          </div>
        </div>
      </div>
      <p className="draw-stage__hint">
        {phase === "dealing"
          ? "Shuffling restaurants…"
          : phase === "landed"
            ? "Tonight’s draw"
            : "Tap to draw your next dinner adventure"}
      </p>
    </div>
  );
}
