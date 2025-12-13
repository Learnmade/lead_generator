"use client";

import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Zap, Github, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export default function SignInPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleGitHubLogin = async () => {
        setIsLoading(true);
        try {
            await signIn("github", { callbackUrl: "/dashboard" });
        } catch (error) {
            toast.error("Login failed");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-full flex-1">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white z-10">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="flex items-center gap-2 mb-10">
                        <Zap className="h-8 w-8 text-indigo-600" />
                        <span className="font-bold text-2xl tracking-tight text-gray-900">Learnmades</span>
                    </div>
                    <div>
                        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Welcome back
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Not a member?{' '}
                            <Link href="/auth/signup" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-all">
                                Start a 14 day free trial
                            </Link>
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="grid gap-4">
                            <button
                                type="button"
                                onClick={handleGitHubLogin}
                                disabled={isLoading}
                                className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#24292F] px-3 py-2.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F] hover:bg-[#24292F]/90 transition-opacity shadow-sm"
                            >
                                <Github className="h-5 w-5" />
                                <span className="text-sm font-semibold">Sign in with GitHub</span>
                            </button>
                        </div>

                        <div className="relative mt-10">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm font-medium leading-6">
                                <span className="bg-white px-6 text-gray-900">Or continue with</span>
                            </div>
                        </div>

                        <form className="space-y-6 mt-10" action="#" method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-700">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm leading-6">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <Button className="w-full justify-center py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100">
                                    Sign in
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/assets/auth-background.png"
                    alt=""
                />
                <div className="absolute inset-0 bg-indigo-900/20 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                <div className="absolute bottom-0 p-20">
                    <blockquote className="text-2xl font-semibold text-white">
                        "Learnmades completely transformed our sales process. We went from manually searching for leads to booking 50+ meetings a week on autopilot."
                    </blockquote>
                    <div className="mt-8 flex gap-4">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-10 w-10 rounded-full ring-2 ring-white/50" />
                        <div>
                            <p className="text-base font-semibold text-white">Jeyasurya</p>
                            <p className="text-sm text-gray-300">CEO at Learnmades</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
