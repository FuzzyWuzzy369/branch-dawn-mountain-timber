import { createServerFn } from "@tanstack/react-start";
import { PRO_PRICE_MONTHLY, PRO_PRICE_ONCE } from "@/lib/limits";

export type Billing = {
  paymentsLive: boolean;
  checkoutUrl: string | null;
  /** Once SKU checkout (preferred power-user path). */
  checkoutUrlOnce: string | null;
  /** Monthly SKU checkout ($0.99/mo). */
  checkoutUrlMonthly: string | null;
  priceLabel: string;
  priceLabelOnce: string;
  priceLabelMonthly: string;
  /** Yearly is held/hidden for day-one. */
  yearlyHeld: true;
  preview: boolean;
  restoreEnabled: boolean;
};

function safeHttps(url: string | undefined) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

export const getBilling = createServerFn({ method: "GET" }).handler(async (): Promise<Billing> => {
  const { env, isWorkspacePreview } = await import("@/lib/env.server");
  const checkoutUrlOnce = safeHttps(env("STRIPE_PAYMENT_LINK") ?? env("STRIPE_PAYMENT_LINK_ONCE"));
  const checkoutUrlMonthly = safeHttps(env("STRIPE_PAYMENT_LINK_MONTHLY"));
  const checkoutUrl = checkoutUrlOnce ?? checkoutUrlMonthly;
  return {
    paymentsLive: Boolean(checkoutUrl),
    checkoutUrl,
    checkoutUrlOnce,
    checkoutUrlMonthly,
    priceLabel: env("PRO_PRICE_LABEL") ?? PRO_PRICE_ONCE,
    priceLabelOnce: env("PRO_PRICE_LABEL_ONCE") ?? PRO_PRICE_ONCE,
    priceLabelMonthly: env("PRO_PRICE_LABEL_MONTHLY") ?? PRO_PRICE_MONTHLY,
    yearlyHeld: true,
    preview: isWorkspacePreview(),
    restoreEnabled: Boolean(env("PRO_RESTORE_CODE")),
  };
});

export const redeemProCode = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (!data || typeof data !== "object" || typeof (data as { code?: unknown }).code !== "string") {
      throw new Error("Enter the restore code from your receipt.");
    }
    const code = (data as { code: string }).code.trim();
    if (!code || code.length > 80) throw new Error("Enter the restore code from your receipt.");
    return { code };
  })
  .handler(async ({ data }) => {
    const { env } = await import("@/lib/env.server");
    const expected = env("PRO_RESTORE_CODE");
    if (!expected) return { ok: false as const };
    return { ok: data.code === expected };
  });
