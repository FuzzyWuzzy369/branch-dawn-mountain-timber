import { createServerFn } from "@tanstack/react-start";

export type Billing = {
  paymentsLive: boolean;
  checkoutUrl: string | null;
  priceLabel: string;
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
  const checkoutUrl = safeHttps(env("STRIPE_PAYMENT_LINK"));
  return {
    paymentsLive: Boolean(checkoutUrl),
    checkoutUrl,
    priceLabel: env("PRO_PRICE_LABEL") ?? "$6 once",
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
