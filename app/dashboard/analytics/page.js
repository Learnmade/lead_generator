"use client";

import { Button } from "@/components/common/Button";
import { Download, Calendar } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import with SSR disabled to prevent Recharts build errors
const AnalyticsCharts = dynamic(() => import("@/components/analytics/AnalyticsCharts"), {
    ssr: false,
    loading: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-96 flex items-center justify-center text-gray-400">Loading Charts...</div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-96 flex items-center justify-center text-gray-400">Loading Charts...</div>
        </div>
    )
});

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="text-gray-600 border-gray-200">
                        <Calendar className="h-4 w-4 mr-2" />
                        Access Period
                    </Button>
                    <Button variant="outline" className="text-gray-600 border-gray-200">
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                    </Button>
                </div>
            </div>

            <AnalyticsCharts />
        </div>
    );
}
