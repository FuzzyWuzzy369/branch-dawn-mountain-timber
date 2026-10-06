import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/billing-C_NmzugD.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function safeHttps(url) {
	if (!url) return null;
	try {
		const parsed = new URL(url);
		if (parsed.protocol !== "https:") return null;
		return parsed.toString();
	} catch {
		return null;
	}
}
var getBilling_createServerFn_handler = createServerRpc({
	id: "f1d590eec9b093238ff60148d5dda35205011b301e7bceaf08c764e80cc0d95c",
	name: "getBilling",
	filename: "src/lib/billing.ts"
}, (opts) => getBilling.__executeServer(opts));
var getBilling = createServerFn({ method: "GET" }).handler(getBilling_createServerFn_handler, async () => {
	const { env, isWorkspacePreview } = await import("./env.server-CZue54H8.mjs");
	const checkoutUrl = safeHttps(env("STRIPE_PAYMENT_LINK"));
	return {
		paymentsLive: Boolean(checkoutUrl),
		checkoutUrl,
		priceLabel: env("PRO_PRICE_LABEL") ?? "$6 once",
		preview: isWorkspacePreview(),
		restoreEnabled: Boolean(env("PRO_RESTORE_CODE"))
	};
});
var redeemProCode_createServerFn_handler = createServerRpc({
	id: "8ca5d1daa0016a84cee5719d21523ae79bd4ca607c08b5e8fbc14365c6b25d43",
	name: "redeemProCode",
	filename: "src/lib/billing.ts"
}, (opts) => redeemProCode.__executeServer(opts));
var redeemProCode = createServerFn({ method: "POST" }).validator((data) => {
	if (!data || typeof data !== "object" || typeof data.code !== "string") throw new Error("Enter the restore code from your receipt.");
	const code = data.code.trim();
	if (!code || code.length > 80) throw new Error("Enter the restore code from your receipt.");
	return { code };
}).handler(redeemProCode_createServerFn_handler, async ({ data }) => {
	const { env } = await import("./env.server-CZue54H8.mjs");
	const expected = env("PRO_RESTORE_CODE");
	if (!expected) return { ok: false };
	return { ok: data.code === expected };
});
//#endregion
export { getBilling_createServerFn_handler, redeemProCode_createServerFn_handler };
