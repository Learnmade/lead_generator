"use client";

import Link from "next/link";
import { Zap, Users, Globe, Award, ArrowRight } from "lucide-react";
import MobileMenu from "@/components/landing/MobileMenu";

export default function CompanyPage() {
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
                        <Link href="/pricing" className="text-sm font-semibold leading-6 text-gray-900">Pricing</Link>
                        <Link href="/company" className="text-sm font-semibold leading-6 text-indigo-600">Company</Link>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
                        <Link href="/auth/signin" className="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></Link>
                    </div>
                    <MobileMenu />
                </nav>
            </header>

            <main className="isolate">
                {/* Hero Section */}
                <div className="relative pt-14">
                    <div className="py-24 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                    Empowering Global Sales with AI
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    We are on a mission to democratize B2B lead generation. Learnmades helps businesses of all sizes discover their perfect customers and grow faster than ever before.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mx-auto mt-8 max-w-7xl px-6 lg:px-8">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-gray-600">Active Users</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">50k+</dd>
                        </div>
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-gray-600">Leads Generated</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">10M+</dd>
                        </div>
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-gray-600">Countries Served</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">120</dd>
                        </div>
                    </dl>
                </div>

                {/* Team Section */}
                <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Leadership</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Led by visionaries passionate about automation and efficiency.
                        </p>
                    </div>
                    <ul role="list" className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        <li>
                            <div className="flex items-center gap-x-6">
                                <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                                    JS
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">Jeyasurya</h3>
                                    <p className="text-sm font-semibold leading-6 text-indigo-600">CEO & Founder</p>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>

                {/* Values Section */}
                <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8 pb-24">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Values</h2>
                    </div>
                    <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        <div>
                            <dt className="font-semibold text-gray-900 flex items-center gap-2">
                                <Globe className="h-5 w-5 text-indigo-600" /> Borderless Innovation
                            </dt>
                            <dd className="mt-1 text-gray-600">We believe talent and opportunity are universal. Our tools are built for a global stage.</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-gray-900 flex items-center gap-2">
                                <Users className="h-5 w-5 text-indigo-600" /> Customer First
                            </dt>
                            <dd className="mt-1 text-gray-600">Your growth is our growth. We obsess over making your sales process smoother.</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-gray-900 flex items-center gap-2">
                                <Award className="h-5 w-5 text-indigo-600" /> Excellence
                            </dt>
                            <dd className="mt-1 text-gray-600">We don't settle for "good enough". We aim for the best-in-class AI solutions.</dd>
                        </div>
                    </dl>
                </div>
            </main>

            <footer className="bg-white border-t border-gray-200">
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
