export type RoleSlug = "owner" | "admin_ops" | "tradesperson" | "timesheet_only" | "contractor";

export const ROLE_LABELS: Record<RoleSlug, string> = {
  owner: "Company Owner",
  admin_ops: "Admin / Operations",
  tradesperson: "Tradesperson",
  timesheet_only: "Timesheet Only",
  contractor: "Contractor"
};

export const PERMISSIONS = [
  "users.invite",
  "users.manage_roles",
  "jobs.view_all",
  "jobs.update_assigned",
  "timesheets.submit",
  "timesheets.approve",
  "settings.manage"
] as const;

export type PermissionKey = (typeof PERMISSIONS)[number];

export const ROLE_DEFAULT_PERMISSIONS: Record<RoleSlug, PermissionKey[]> = {
  owner: [...PERMISSIONS],
  admin_ops: ["users.invite", "jobs.view_all", "timesheets.approve", "settings.manage"],
  tradesperson: ["jobs.update_assigned", "timesheets.submit"],
  timesheet_only: ["timesheets.submit"],
  contractor: ["jobs.update_assigned"]
};
