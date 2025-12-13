"use client";

import { Bell, Search, User, Menu } from "lucide-react";
import { Button } from "./common/Button";

import { useSession } from "next-auth/react";

export default function TopNav({ onMenuClick }) {
    const { data: session } = useSession();

    return (
        <header className="bg-white border-b border-gray-200 h-16 px-4 md:px-6 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center flex-1 gap-4">
                <button
                    type="button"
                    className="md:hidden -ml-2 p-2 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
                    onClick={onMenuClick}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="max-w-md w-full relative hidden sm:block">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search leads, companies..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-shadow"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-gray-500 relative">
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>
                <div className="h-8 w-px bg-gray-200 mx-2"></div>
                <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {session?.user?.image ? (
                            <img src={session.user.image} alt="User" className="h-8 w-8 object-cover" />
                        ) : (
                            <User className="h-5 w-5 text-gray-500" />
                        )}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:block">
                        {session?.user?.name || "User"}
                    </span>
                </div>
            </div>
        </header>
    );
}
