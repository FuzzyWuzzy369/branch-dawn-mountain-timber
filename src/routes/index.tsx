import { createFileRoute } from "@tanstack/react-router";
import { Picker } from "@/components/picker";
import { getBilling } from "@/lib/billing";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { spot?: string; upgraded?: "1" } => ({
    ...(typeof search.spot === "string" && search.spot ? { spot: search.spot } : {}),
    ...(search.upgraded === "1" ? { upgraded: "1" } : {}),
  }),
  loader: () => getBilling(),
  component: Home,
});

function Home() {
  const billing = Route.useLoaderData();
  const { spot } = Route.useSearch();
  return <Picker billing={billing} spotId={spot} />;
}
