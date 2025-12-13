"use client";

import { Button } from "@/components/common/Button";
import { User, Lock, Bell, CreditCard, Building } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar Navigation */}
                    <aside className="w-full md:w-64 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 p-6 space-y-1">
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium bg-white text-indigo-600 shadow-sm rounded-md ring-1 ring-gray-200">
                            <User className="h-4 w-4" />
                            Profile
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm rounded-md transition-all">
                            <Building className="h-4 w-4" />
                            Company
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm rounded-md transition-all">
                            <Lock className="h-4 w-4" />
                            Security
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm rounded-md transition-all">
                            <Bell className="h-4 w-4" />
                            Notifications
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm rounded-md transition-all">
                            <CreditCard className="h-4 w-4" />
                            Billing
                        </button>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-1 p-6 md:p-10">
                        <div className="max-w-lg space-y-8">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                                <p className="text-sm text-gray-500 mt-1">Update your personal account details.</p>
                            </div>

                            <div className="grid gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600 ring-4 ring-white shadow-sm">
                                        JD
                                    </div>
                                    <Button variant="outline" size="sm">Change Avatar</Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm py-2" defaultValue="John" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm py-2" defaultValue="Doe" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input type="email" className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm py-2" defaultValue="john@example.com" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                    <input type="text" disabled className="w-full rounded-md border-gray-300 bg-gray-50 text-gray-500 shadow-sm text-sm py-2" defaultValue="Owner" />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                                <Button variant="outline">Cancel</Button>
                                <Button>Save Changes</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
