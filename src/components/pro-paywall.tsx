import * as Dialog from "@radix-ui/react-dialog";
import type { Billing } from "@/lib/billing";
import { POWER_USER_DRAWS_PER_WEEK, PRO_PRICE_MONTHLY, PRO_PRICE_ONCE } from "@/lib/limits";
import { Button } from "@/components/ui/button";


export function ProPaywall({
  open,
  onOpenChange,
  billing,
  pro,
  powerUser,
  drawsThisWeek,
  nudgeKind,
  code,
  setCode,
  codeMsg,
  onCheckout,
  onRedeem,
  onNotNow,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  billing: Billing;
  pro: boolean;
  powerUser: boolean;
  drawsThisWeek: number;
  nudgeKind: "soft" | "light" | "power" | null;
  code: string;
  setCode: (value: string) => void;
  codeMsg: string | null;
  onCheckout: (sku?: "once" | "monthly") => void;
  onRedeem: (event: React.FormEvent) => void;
  onNotNow: () => void;
}) {
  const loud = powerUser || nudgeKind === "power";
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/40" />
        <Dialog.Content className="fixed inset-x-4 top-1/2 z-50 mx-auto max-h-dvh max-w-md -translate-y-1/2 overflow-y-auto rounded-xl border border-line bg-surface p-5 text-ink outline-none sm:p-6">
          <Dialog.Title className="font-display text-2xl font-medium tracking-tight">
            {loud ? "You’re on a power-user week" : "DinnerDraw Pro"}
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-muted">
            {loud
              ? `You’ve drawn ${drawsThisWeek} times this week (power-user path at ${POWER_USER_DRAWS_PER_WEEK}/week). Unlock Pro — ${billing.priceLabelOnce || PRO_PRICE_ONCE}.`
              : "Lesser-known bias, occasion and diet filters, and a shortlist that does not stop at three."}
          </Dialog.Description>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Day-one: {billing.priceLabelOnce || PRO_PRICE_ONCE} or {billing.priceLabelMonthly || PRO_PRICE_MONTHLY}.</li>
            <li>Heavy use ({POWER_USER_DRAWS_PER_WEEK}+ draws/week) gets a louder Pro ask — no cool-down.</li>
            <li>Yearly plans are held for later.</li>
          </ul>
          {pro && billing.paymentsLive ? (
            <p className="mt-4 text-sm">Pro is on for this browser.</p>
          ) : billing.paymentsLive && billing.checkoutUrl ? (
            <div className="mt-5 grid gap-2">
              <Button className="w-full" size="lg" onClick={() => onCheckout("once")}>
                Unlock Pro · {billing.priceLabelOnce || PRO_PRICE_ONCE}
              </Button>
              {billing.checkoutUrlMonthly ? (
                <Button className="w-full" variant="secondary" onClick={() => onCheckout("monthly")}>
                  Or {billing.priceLabelMonthly || PRO_PRICE_MONTHLY}
                </Button>
              ) : (
                <p className="text-center text-xs text-faint">Monthly ({PRO_PRICE_MONTHLY}) wires when its Payment Link is set.</p>
              )}
            </div>
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
          {!pro && !loud ? (
            <Button variant="ghost" className="mt-3 w-full" onClick={onNotNow}>
              Not now
            </Button>
          ) : null}
          <Dialog.Close asChild>
            <Button variant="ghost" className="mt-1 w-full">
              Close
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
