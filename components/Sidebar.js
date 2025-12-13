"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { LayoutDashboard, Users, Send, BarChart2, Settings, Zap, LogOut } from "lucide-react";

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Leads', href: '/dashboard/leads', icon: Users },
    { name: 'Campaigns', href: '/dashboard/campaigns', icon: Send },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 h-full text-slate-300">
            <div className="flex items-center h-16 px-6 border-b border-slate-800 bg-slate-950">
                <Zap className="h-6 w-6 text-indigo-500 mr-2" />
                <span className="text-xl font-bold tracking-tight text-white">Learnmades</span>
            </div>
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                isActive
                                    ? 'bg-indigo-600/10 text-indigo-400 border-l-2 border-indigo-500'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100 border-l-2 border-transparent',
                                'group flex items-center px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out pl-4'
                            )}
                        >
                            <item.icon
                                className={clsx(
                                    isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300',
                                    'mr-3 flex-shrink-0 h-5 w-5 transition-colors'
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-slate-800 bg-slate-950">
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                            Pro Plan
                        </p>
                        <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded">Active</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
                        <div className="bg-indigo-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: '45%' }}></div>
                    </div>
                    <p className="text-xs text-slate-500">
                        450/1000 credits used
                    </p>
                </div>
            </div>
        </div>
    );
}
