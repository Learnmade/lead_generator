"use client";

import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Zap, Github, ArrowRight, Check } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

const features = [
    "Unlimited AI lead searches",
    "Automated email sequences",
    "Real-time analytics dashboard",
    "Export to CRM in one click"
];

export default function SignUpPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [strength, setStrength] = useState(0);

    const handleGitHubLogin = async () => {
        setIsLoading(true);
        try {
            await signIn("github", { callbackUrl: "/dashboard" });
        } catch (error) {
            toast.error("Signup failed");
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
                            Create your account
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Already have an account?{' '}
                            <Link href="/auth/signin" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-all">
                                Sign in
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
                                <span className="text-sm font-semibold">Sign up with GitHub</span>
                            </button>
                        </div>

                        <div className="relative mt-10">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm font-medium leading-6">
                                <span className="bg-white px-6 text-gray-900">Or register with email</span>
                            </div>
                        </div>

                        <form className="space-y-5 mt-10" onSubmit={async (e) => {
                            e.preventDefault();
                            setIsLoading(true);
                            const formData = new FormData(e.target);
                            const data = Object.fromEntries(formData.entries());

                            try {
                                const res = await fetch('/api/auth/register', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(data),
                                });

                                if (res.ok) {
                                    toast.success("Account created! Redirecting to login...");
                                    setTimeout(() => window.location.href = '/auth/signin', 2000);
                                } else {
                                    const err = await res.json();
                                    toast.error(err.error || "Registration failed");
                                }
                            } catch (error) {
                                toast.error("Something went wrong");
                            } finally {
                                setIsLoading(false);
                            }
                        }}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900">
                                        Company Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="company"
                                            name="company"
                                            type="text"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="jobTitle" className="block text-sm font-medium leading-6 text-gray-900">
                                        Job Title
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="jobTitle"
                                            name="jobTitle"
                                            type="text"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Work Email
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
                                        autoComplete="new-password"
                                        required
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            let score = 0;
                                            if (val.length > 6) score++;
                                            if (val.length > 10) score++;
                                            if (/[0-9]/.test(val)) score++;
                                            if (/[^A-Za-z0-9]/.test(val)) score++;
                                            setStrength(score);
                                        }}
                                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    />
                                </div>
                                {/* Password Strength Meter */}
                                <div className="mt-2 flex gap-1 h-1">
                                    <div className={`flex-1 rounded-full transition-colors ${strength > 0 ? (strength > 2 ? 'bg-green-500' : strength > 1 ? 'bg-yellow-400' : 'bg-red-500') : 'bg-gray-200'}`}></div>
                                    <div className={`flex-1 rounded-full transition-colors ${strength > 1 ? (strength > 2 ? 'bg-green-500' : 'bg-yellow-400') : 'bg-gray-200'}`}></div>
                                    <div className={`flex-1 rounded-full transition-colors ${strength > 3 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                    Strength: <span className={`font-medium ${strength > 2 ? 'text-green-600' : strength > 1 ? 'text-yellow-600' : 'text-red-600'}`}>
                                        {strength > 3 ? 'Strong' : strength > 2 ? 'Good' : strength > 1 ? 'Medium' : 'Weak'}
                                    </span>
                                </p>
                            </div>

                            <div>
                                <Button className="w-full justify-center py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100" disabled={isLoading}>
                                    {isLoading ? "Creating..." : "Create account"}
                                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                                </Button>
                            </div>

                            <p className="text-xs text-center text-gray-500 mt-4">
                                By clicking "Create account", you agree to our <a href="#" className="underline hover:text-gray-900">Terms of Service</a> and <a href="#" className="underline hover:text-gray-900">Privacy Policy</a>.
                            </p>
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
                <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply" />
                <div className="flex flex-col justify-center h-full max-w-2xl mx-auto px-12 relative z-10">
                    <span className="inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/20 mb-6 w-fit">
                        New v2.0
                    </span>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
                        Join the fastest growing sales community
                    </h2>
                    <p className="text-lg leading-8 text-gray-400 mb-10">
                        Get access to the same tools used by top performing sales teams at companies like Loom, Linear, and Vercel.
                    </p>
                    <ul className="space-y-4">
                        {features.map((feature, i) => (
                            <li key={i} className="flex gap-x-3">
                                <Check className="h-6 w-5 flex-none text-indigo-400" aria-hidden="true" />
                                <span className="text-base leading-7 text-gray-300">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
