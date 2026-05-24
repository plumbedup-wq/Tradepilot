import Link from 'next/link';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/customers', label: 'Customers' },
  { href: '/settings/users', label: 'Users' }
];

export function TopNav() {
  return (
    <header className="top-nav">
      <div className="top-nav-inner">
        <Link href="/dashboard" className="brand-mini">TradePilot</Link>
        <nav>
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
