"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import PricingSection from "@/components/landing/PricingSection";
import MobileMenu from "@/components/landing/MobileMenu";

export default function PricingPage() {
    return (
        <div className="bg-white min-h-screen">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                            <Zap className="h-8 w-8 text-indigo-600" />
                            <span className="font-bold text-xl tracking-tight">Learnmades</span>
                        </Link>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <Link href="/#features" className="text-sm font-semibold leading-6 text-gray-900">Features</Link>
                        <Link href="/pricing" className="text-sm font-semibold leading-6 text-indigo-600">Pricing</Link>
                        <Link href="#" className="text-sm font-semibold leading-6 text-gray-900">Company</Link>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
                        <Link href="/auth/signin" className="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></Link>
                    </div>
                    <MobileMenu />
                </nav>
            </header>

            <main className="pt-24">
                <PricingSection />
            </main>

            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                    <div className="flex justify-center space-x-6 md:order-2">
                        <p className="text-center text-xs leading-5 text-gray-500">
                            &copy; 2024 Learnmades Inc. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
