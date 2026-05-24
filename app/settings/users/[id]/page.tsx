import { TopNav } from '@/components/top-nav';
import { BackLink } from "@/components/back-link";
import { PERMISSIONS, ROLE_LABELS, ROLE_DEFAULT_PERMISSIONS, type RoleSlug } from "@/lib/auth/rbac";

const user = { id: "1", name: "Nick Jones", role: "owner" as RoleSlug, email: "nick@example.com" };

export default function UserDetailPage() {
  const rolePermissions = new Set(ROLE_DEFAULT_PERMISSIONS[user.role]);

  return (
    <>
      <TopNav />
    <main className="settings-shell">
      <BackLink href="/settings/users" label="Back to users" />
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <label className="field">
        Role
        <select defaultValue={user.role}>
          {Object.entries(ROLE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>

      <section>
        <h2>Permissions</h2>
        <div className="perm-grid">
          {PERMISSIONS.map((permission) => (
            <label key={permission} className="perm-item">
              <input type="checkbox" defaultChecked={rolePermissions.has(permission)} />
              <span>{permission}</span>
            </label>
          ))}
        </div>
      </section>
    </main>
    </>
  );
}
