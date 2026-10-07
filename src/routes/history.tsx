import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { CHAPTERS, type Marker } from "@/data/history";
import { SPOTS, type Spot } from "@/data/catalog";
import { historicYear } from "@/lib/draw";
import { mapsUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeButton } from "@/components/theme-button";
import { HistorySources } from "@/components/app-chrome";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Culinary history — DinnerDraw" },
      {
        name: "description",
        content:
          "How Wichita learned to eat: White Castle, NuWay, the Dockum sit-in, Pizza Hut, and the locations still open.",
      },
    ],
  }),
  component: HistoryPage,
});

function findSpot(name?: string, address?: string) {
  if (!name || !address) return undefined;
  return SPOTS.find((spot) => spot.name === name && spot.address === address);
}

function phrasesFor(place: Marker, spotName: string) {
  const phrases = new Set<string>();
  phrases.add(spotName);
  phrases.add(place.label);
  for (const mention of place.mentions ?? []) phrases.add(mention);
  const short = place.label.replace(/ (Cafe|Restaurant|Italian Ristorante)$/, "");
  if (short !== place.label) phrases.add(short);
  return [...phrases].filter((phrase) => phrase.length >= 4);
}

const SHELF_LINKS = CHAPTERS.flatMap((chapter) => chapter.places).flatMap((place) => {
  const spot = findSpot(place.spotName, place.address);
  if (!spot) return [];
  return phrasesFor(place, spot.name).map((phrase) => ({ phrase, id: spot.id }));
});

function linkParagraph(text: string) {
  const sorted = [...SHELF_LINKS].sort((a, b) => b.phrase.length - a.phrase.length);
  let parts: { text: string; id?: string }[] = [{ text }];
  for (const link of sorted) {
    parts = parts.flatMap((part) => {
      if (part.id || !part.text.includes(link.phrase)) return [part];
      const chunks = part.text.split(link.phrase);
      const next: { text: string; id?: string }[] = [];
      chunks.forEach((chunk, index) => {
        if (chunk) next.push({ text: chunk });
        if (index < chunks.length - 1) next.push({ text: link.phrase, id: link.id });
      });
      return next;
    });
  }
  return parts;
}

function ShelfLink({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <Link
      to="/"
      search={{ spot: id }}
      className={className ?? "underline decoration-line underline-offset-2 hover:decoration-ink"}
    >
      {children}
    </Link>
  );
}

const OLDS = SPOTS.filter((spot) => spot.since != null && spot.since < 1960);

function HistoryPage() {
  const [draw, setDraw] = useState<Spot | null>(null);

  function drawOld() {
    const pool = OLDS.filter((spot) => spot.id !== draw?.id);
    const next = pool[Math.floor(Math.random() * pool.length)];
    if (next) setDraw(next);
  }

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 pt-6 pb-2">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">Random restaurant picker</p>
          <Link to="/" className="font-display text-xl leading-none font-medium tracking-tight">
            DinnerDraw
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeButton />
          <Button variant="secondary" size="sm" asChild>
            <Link to="/">Back to the draw</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pt-6 pb-20">
        <p className="text-xs font-medium tracking-wide text-faint uppercase">Culinary history</p>
        <h1 className="mt-2 font-display text-3xl leading-tight font-medium tracking-tight">
          How Wichita learned to eat
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          A short public history of the tables that made the city, and the ones you can still walk
          into. It is a starting point, not a reservation.
        </p>

        <div className="mt-8 space-y-10">
          {CHAPTERS.map((chapter) => (
            <section key={chapter.title} className="border-t border-line pt-6">
              <p className="text-xs font-medium tracking-wide text-faint uppercase">{chapter.era}</p>
              <h2 className="mt-1 font-display text-2xl leading-tight font-medium">{chapter.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink">
                {chapter.paragraphs.map((paragraph) => (
                  <p key={paragraph}>
                    {linkParagraph(paragraph).map((part, index) =>
                      part.id ? (
                        <ShelfLink key={`${part.id}-${index}`} id={part.id}>
                          {part.text}
                        </ShelfLink>
                      ) : (
                        <span key={index}>{part.text}</span>
                      ),
                    )}
                  </p>
                ))}
              </div>
              {chapter.places.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {chapter.places.map((place) => {
                    const spot = findSpot(place.spotName, place.address);
                    const year = historicYear(spot?.since);
                    return (
                      <li
                        key={place.label}
                        className={
                          year
                            ? "rounded-lg border border-accent bg-chip p-4"
                            : "rounded-lg border border-line bg-surface p-4"
                        }
                      >
                        {year ? (
                          <p className="text-xs font-medium tracking-wide text-accent uppercase">
                            Open since {year}
                          </p>
                        ) : null}
                        {spot ? (
                          <ShelfLink
                            id={spot.id}
                            className={
                              year
                                ? "mt-1 inline-block font-medium underline decoration-line underline-offset-2 hover:decoration-ink"
                                : "font-medium underline decoration-line underline-offset-2 hover:decoration-ink"
                            }
                          >
                            {place.label}
                          </ShelfLink>
                        ) : (
                          <p className="font-medium">{place.label}</p>
                        )}
                        <p className="mt-1 text-sm text-muted">{place.detail}</p>
                        {spot ? (
                          <p className="mt-2 text-sm">
                            <ShelfLink id={spot.id}>Open the shelf card</ShelfLink>
                            <span className="text-faint"> · </span>
                            <a
                              className="underline decoration-line underline-offset-2 hover:decoration-ink"
                              href={mapsUrl(spot.name, spot.address)}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {spot.address}
                            </a>
                          </p>
                        ) : (
                          <p className="mt-2 text-sm text-faint">Not on the shelf.</p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-xl border border-line bg-surface p-5">
          <h2 className="font-display text-xl font-medium">Draw a location from before 1960</h2>
          <p className="mt-2 text-sm text-muted">
            {OLDS.length} counters and dining rooms on the shelf opened before 1960. This draw ignores
            cuisine and stays with the old ones.
          </p>
          <Button className="mt-4" onClick={drawOld}>
            Draw an old location
          </Button>
          {draw ? (
            <div className="mt-4 rounded-lg border border-accent bg-chip p-4">
              <p className="text-xs font-medium tracking-wide text-accent uppercase">
                Open since {draw.since}
              </p>
              <p className="font-display text-2xl font-medium">
                <ShelfLink id={draw.id}>{draw.name}</ShelfLink>
              </p>
              <p className="mt-1 text-sm text-muted">{draw.knownFor}</p>
              <p className="mt-2 text-sm">{draw.note}</p>
              <a
                className="mt-3 inline-block text-sm underline decoration-line underline-offset-2 hover:decoration-ink"
                href={mapsUrl(draw.name, draw.address)}
                target="_blank"
                rel="noreferrer"
              >
                {draw.address}
              </a>
            </div>
          ) : null}
        </section>

        <HistorySources />
      </main>
    </div>
  );
}
