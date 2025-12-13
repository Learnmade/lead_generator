"use client";

import { Fragment } from 'react';

import { X, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { LayoutDashboard, Users, Send, BarChart2, Settings } from "lucide-react";

// Using Headless UI for accessible dialogs if available, otherwise fallback to simple div
// Since I don't know if headlessui is installed, I will write a resilient implementation using raw React/Tailwind
// Actually, standardizing on a simple Tailwind overlay is safer if dependencies are unknown.
// But user previously had headlessui reference in hero? No, that was svg pattern.
// I'll stick to a robust custom implementation for the Mobile Sidebar.

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Leads', href: '/dashboard/leads', icon: Users },
    { name: 'Campaigns', href: '/dashboard/campaigns', icon: Send },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function MobileSidebar({ isOpen, setIsOpen }) {
    const pathname = usePathname();

    if (!isOpen) return null;

    return (
        <div className="relative z-50 md:hidden" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity"
                onClick={() => setIsOpen(false)}
            />

            <div className="fixed inset-0 flex">
                <div className="relative mr-16 flex w-full max-w-xs flex-1">
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                        <button type="button" className="-m-2.5 p-2.5" onClick={() => setIsOpen(false)}>
                            <span className="sr-only">Close sidebar</span>
                            <X className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 pb-4 ring-1 ring-white/10">
                        <div className="flex h-16 shrink-0 items-center">
                            <Zap className="h-8 w-8 text-indigo-500" />
                            <span className="ml-2 text-xl font-bold tracking-tight text-white">Learnmades</span>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => {
                                            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                                            return (
                                                <li key={item.name}>
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className={clsx(
                                                            isActive
                                                                ? 'bg-indigo-700/10 text-indigo-400'
                                                                : 'text-slate-400 hover:bg-slate-800 hover:text-white',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                        )}
                                                    >
                                                        <item.icon
                                                            className={clsx(
                                                                isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-white',
                                                                'h-6 w-6 shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                        <div className="mt-auto">
                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                <p className="text-xs text-indigo-400 font-semibold uppercase">Pro Plan</p>
                                <p className="text-xs text-slate-400 mt-1">450/1000 credits used</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
