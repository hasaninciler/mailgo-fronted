'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { LayoutDashboard, FolderKanban, Megaphone, Users, LogOut } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/categories', label: 'Kategoriler', icon: FolderKanban },
  { href: '/campaigns', label: 'Kampanyalar', icon: Megaphone },
  { href: '/subscribers', label: 'Aboneler', icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col bg-card p-6 shadow-sm">
      <div className="mb-10">
        <Image src="/logo.png" alt="mailGo" width={130} height={40} />
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted hover:bg-bg-subtle hover:text-dark'
              }`}
            >
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                isActive ? 'bg-primary text-white' : 'text-muted'
              }`}>
                <Icon size={18} />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-accent-red/10 hover:text-accent-red"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg">
          <LogOut size={18} />
        </span>
        Çıkış Yap
      </button>
    </aside>
  );
}