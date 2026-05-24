import Link from "next/link";
import { ROLE_LABELS, type RoleSlug } from "@/lib/auth/rbac";

const mockUsers = [
  { id: "1", name: "Nick Jones", role: "owner" as RoleSlug, lastLogin: "Today" },
  { id: "2", name: "Sam Plumber", role: "tradesperson" as RoleSlug, lastLogin: "Yesterday" },
  { id: "3", name: "Ava Ops", role: "admin_ops" as RoleSlug, lastLogin: "May 20" }
];

export default function UsersPage() {
  return (
    <main className="settings-shell">
      <div className="settings-head">
        <h1>Users & Permissions</h1>
        <button className="form-btn" type="button">Invite user</button>
      </div>
      <div className="users-table">
        {mockUsers.map((u) => (
          <Link key={u.id} href={`/settings/users/${u.id}`} className="user-row">
            <strong>{u.name}</strong>
            <span>{ROLE_LABELS[u.role]}</span>
            <span>{u.lastLogin}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
