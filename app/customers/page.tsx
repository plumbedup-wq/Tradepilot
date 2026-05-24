import { TopNav } from '@/components/top-nav';
import Link from 'next/link';
import { BackLink } from '@/components/back-link';

const mockCustomers = [
  { id: 'c1', name: 'House Me Limited', terms: '20 days', rate: '$95/hr' },
  { id: 'c2', name: 'Rabo Construct', terms: '7 days', rate: '$110/hr' }
];

export default function CustomersPage() {
  return (
    <>
      <TopNav />
    <main className="settings-shell">
      <BackLink href="/dashboard" label="Back to dashboard" />
      <div className="settings-head">
        <h1>Customer Hub</h1>
        <Link href="/customers/new" className="form-btn" style={{ textDecoration: 'none' }}>+ New Customer</Link>
      </div>

      <div className="users-table">
        {mockCustomers.map((customer) => (
          <article key={customer.id} className="user-row">
            <strong>{customer.name}</strong>
            <span>{customer.terms}</span>
            <span>{customer.rate}</span>
          </article>
        ))}
      </div>
    </main>
    </>
  );
}
