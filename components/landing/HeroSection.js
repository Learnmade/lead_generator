import Link from "next/link";
import { ArrowRight, CheckCircle, Zap, Shield, Globe } from "lucide-react";

export default function HeroSection() {
    return (
        <div className="relative isolate overflow-hidden bg-white">
            <svg
                className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                        width={200}
                        height={200}
                        x="50%"
                        y={-1}
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={0} fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
            </svg>
            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                    <div className="mt-24 sm:mt-32 lg:mt-16">
                        <a href="#" className="inline-flex space-x-6">
                            <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
                                What's new
                            </span>
                            <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                                <span>Just shipped v1.0</span>
                                <ArrowRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
                            </span>
                        </a>
                    </div>
                    <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-balance">
                        Automate B2B Sales with Intelligent AI
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 text-balance">
                        Stop manually searching for leads. Our AI discovers your ideal customers, enriches their data, and sends hyper-personalized emails that actually get replies.
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                        <Link
                            href="/auth/signup"
                            className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all transform hover:-translate-y-1"
                        >
                            Start Free Trial
                        </Link>
                        <a href="#features" className="text-sm font-semibold leading-6 text-gray-900 flex items-center group">
                            View Features <span aria-hidden="true" className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                    </div>

                    <div className="mt-12 flex items-center gap-x-4 text-sm text-gray-500">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-8 w-8 rounded-full bg-gray-100 ring-2 ring-white flex items-center justify-center text-xs font-medium text-gray-600">
                                    U{i}
                                </div>
                            ))}
                        </div>
                        <p>Trusted by 500+ agencies</p>
                    </div>
                </div>
                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
                    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                        <div className="relative perspective-1000 group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 blur-3xl opacity-30 rounded-[3rem] -z-10 transition-all duration-700 group-hover:opacity-50 group-hover:bg-indigo-400"></div>
                            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 backdrop-blur-sm bg-white/40 transform rotate-y-6 rotate-x-6 scale-95 transition-transform duration-700 ease-out hover:rotate-0 hover:scale-100 hover:rotate-y-0 hover:rotate-x-0 preserve-3d shadow-2xl">
                                <img
                                    src="/assets/dashboard-preview.png"
                                    alt="App screenshot"
                                    width={2432}
                                    height={1442}
                                    className="w-[76rem] rounded-md shadow-lg ring-1 ring-gray-900/10"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
