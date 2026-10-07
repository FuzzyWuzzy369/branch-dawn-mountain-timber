import { createServerFn } from "@tanstack/react-start";
import { REPORT_ESCALATE_AFTER_UNIQUE } from "@/lib/limits";

export type ReportResult = {
  ok: true;
  uniqueFlags: number;
  escalated: boolean;
};

/**
 * PinHound-style "Not a fit": count unique reporters. Escalate for OSM/hand
 * review after the threshold. NEVER auto-delete the shelf row.
 */
export const reportSpotNotAFit = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (!data || typeof data !== "object") throw new Error("Invalid report");
    const spotId = (data as { spotId?: unknown }).spotId;
    const reporterId = (data as { reporterId?: unknown }).reporterId;
    if (typeof spotId !== "string" || !spotId.trim() || spotId.length > 200) {
      throw new Error("spotId required");
    }
    if (typeof reporterId !== "string" || !reporterId.trim() || reporterId.length > 80) {
      throw new Error("reporterId required");
    }
    return { spotId: spotId.trim(), reporterId: reporterId.trim() };
  })
  .handler(async ({ data }): Promise<ReportResult> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`
      INSERT INTO spot_reports (spot_id, reporter_id)
      VALUES (${data.spotId}, ${data.reporterId})
      ON CONFLICT (spot_id, reporter_id) DO NOTHING
    `;
    const rows = await sql<{ c: number }>`
      SELECT COUNT(*)::int AS c FROM spot_reports WHERE spot_id = ${data.spotId}
    `;
    const uniqueFlags = rows[0]?.c ?? 0;
    let escalated = false;
    if (uniqueFlags >= REPORT_ESCALATE_AFTER_UNIQUE) {
      await sql`
        INSERT INTO spot_report_escalations (spot_id, unique_flags, status)
        VALUES (${data.spotId}, ${uniqueFlags}, 'needs_review')
        ON CONFLICT (spot_id) DO UPDATE
          SET unique_flags = EXCLUDED.unique_flags,
              escalated_at = NOW(),
              status = 'needs_review'
      `;
      escalated = true;
    }
    return { ok: true, uniqueFlags, escalated };
  });
