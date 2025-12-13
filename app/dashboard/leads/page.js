"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { Plus, Search, Filter, MoreHorizontal, Mail, Globe, Phone } from "lucide-react";
import { toast } from "sonner";
import clsx from "clsx";



export default function LeadsPage() {
    const [leads, setLeads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState("list");

    useEffect(() => {
        async function fetchLeads() {
            try {
                const res = await fetch('/api/leads');
                if (res.ok) {
                    const data = await res.json();
                    setLeads(data);
                }
            } catch (error) {
                console.error("Failed to fetch leads", error);
                toast.error("Failed to load leads");
            } finally {
                setIsLoading(false);
            }
        }
        fetchLeads();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and track your potential customers.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="text-gray-600 border-gray-200">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                    <Button onClick={() => toast.success("Lead creation modal would open here")} className="shadow-lg shadow-indigo-200 hover:shadow-indigo-300">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Lead
                    </Button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search leads by company, contact, or email..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
            </div>

            <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Score</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="relative px-6 py-4"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                                        Loading leads...
                                    </td>
                                </tr>
                            ) : leads.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                                        No leads found. Click "Add Lead" to get started.
                                    </td>
                                </tr>
                            ) : (
                                leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50/80 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 font-bold border border-indigo-100">
                                                    {lead.companyName.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{lead.companyName}</div>
                                                    <div className="text-sm text-gray-500 flex items-center gap-1">
                                                        <Globe className="h-3 w-3" />
                                                        {lead.website}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600 ring-2 ring-white">
                                                    {lead.avatar}
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">{lead.contact}</div>
                                                    <div className="text-xs text-gray-500">{lead.role}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className={clsx(
                                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                                    lead.score >= 90 ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                                                        lead.score >= 70 ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
                                                            "bg-amber-50 text-amber-700 border-amber-100"
                                                )}>
                                                    {lead.score}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={clsx(
                                                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border",
                                                lead.status === 'new' ? "bg-blue-50 text-blue-700 border-blue-100" :
                                                    lead.status === 'contacted' ? "bg-purple-50 text-purple-700 border-purple-100" :
                                                        lead.status === 'won' ? "bg-green-50 text-green-700 border-green-100" :
                                                            "bg-gray-100 text-gray-700 border-gray-200"
                                            )}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                                                    <Mail className="h-4 w-4" />
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
