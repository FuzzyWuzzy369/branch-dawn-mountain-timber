-- Not-a-fit reports. Escalate after several unique flags; never auto-delete.
CREATE TABLE IF NOT EXISTS spot_reports (
  spot_id TEXT NOT NULL,
  reporter_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (spot_id, reporter_id)
);

CREATE TABLE IF NOT EXISTS spot_report_escalations (
  spot_id TEXT PRIMARY KEY,
  unique_flags INTEGER NOT NULL,
  escalated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'needs_review'
);
