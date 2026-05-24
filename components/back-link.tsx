import Link from "next/link";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="back-link" aria-label={label}>
      <span aria-hidden>←</span>
      <span>{label}</span>
    </Link>
  );
}
