'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const menuItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/categories', label: 'Kategoriler' },
    { href: '/campaigns', label: 'Kampanyalar' },
    { href: '/subscribers', label: 'Aboneler' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="sticky top-0 flex h-screen w-64 flex-col bg-card p-6 shadow-sm">     
         <div className="mb-10">
            <Image src="/logo.png" alt="mailGo" width={130} height={40} />
        </div>

            <nav className="flex flex-col gap-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive
                                    ? 'bg-primary text-white'
                                    : 'text-muted hover:bg-bg-subtle hover:text-dark'
                                }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}