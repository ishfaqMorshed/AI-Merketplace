import { Link, useLocation } from 'wouter';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/hero', label: 'Hero Section' },
  { href: '/admin/pricing', label: 'Pricing' },
];

export function AdminSidebar() {
  const [location] = useLocation();
  return (
    <aside className="w-64 min-h-screen bg-gray-50 border-r px-4 py-8 flex flex-col gap-2">
      <div className="text-2xl font-bold mb-8 text-primary">Admin Panel</div>
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={`block px-4 py-2 rounded hover:bg-primary/10 transition-colors font-medium ${location === link.href ? 'bg-primary/10 text-primary' : 'text-gray-700'}`}
        >
          {link.label}
        </Link>
      ))}
    </aside>
  );
}
