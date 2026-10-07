import { Link } from "@tanstack/react-router";

export function AppBrand({ asLink = false }: { asLink?: boolean }) {
  const title = (
    <>
      <p className="text-xs font-medium tracking-wide text-muted uppercase">Random restaurant picker</p>
      <p className="font-display text-xl leading-none font-medium tracking-tight">DinnerDraw</p>
    </>
  );
  if (!asLink) return <div>{title}</div>;
  return (
    <Link to="/" className="block">
      {title}
    </Link>
  );
}

export function OsmCredit({ className = "text-xs text-faint" }: { className?: string }) {
  return (
    <p className={className}>
      Shelf map data ©{" "}
      <a
        className="underline decoration-line underline-offset-2 hover:decoration-ink"
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noreferrer"
      >
        OpenStreetMap contributors
      </a>
      .
    </p>
  );
}

export function HistorySources() {
  return (
    <>
      <p className="mt-8 text-xs leading-relaxed text-faint">
        Sources:{" "}
        <a
          className="underline decoration-line underline-offset-2 hover:decoration-ink"
          href="https://www.kansas.com/"
          target="_blank"
          rel="noreferrer"
        >
          Denise Neil’s 2016 Wichita Eagle survey
        </a>
        ;{" "}
        <a
          className="underline decoration-line underline-offset-2 hover:decoration-ink"
          href="https://www.kansassampler.org/"
          target="_blank"
          rel="noreferrer"
        >
          Kansas Sampler Foundation on NuWay
        </a>
        ;{" "}
        <a
          className="underline decoration-line underline-offset-2 hover:decoration-ink"
          href="https://www.visitwichita.com/"
          target="_blank"
          rel="noreferrer"
        >
          Visit Wichita
        </a>{" "}
        on White Castle, Pizza Hut, and the Dockum sit-in; plus the restaurants’ own histories.
        Livingston’s opened in 1910 at 310 North Emporia — neither current location is that address.
        Confirm hours before you go.
      </p>
      <OsmCredit className="mt-3 text-xs text-faint" />
    </>
  );
}
