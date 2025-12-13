import { Button } from "@/components/common/Button";
import { ArrowUpRight, Plus, Users, Send, MousePointerClick, MailOpen, TrendingUp, BarChart2 } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Overview of your sales pipeline performance.</p>
                </div>
                <Button className="shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all">
                    <Plus className="h-4 w-4 mr-2" />
                    New Campaign
                </Button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Total Leads", value: "0", change: "+0%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                    { title: "Emails Sent", value: "0", change: "+0%", icon: Send, color: "text-indigo-600", bg: "bg-indigo-50" },
                    { title: "Open Rate", value: "0%", change: "+0%", icon: MailOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { title: "Reply Rate", value: "0%", change: "0%", icon: MousePointerClick, color: "text-purple-600", bg: "bg-purple-50" }
                ].map((kpi, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex items-start justify-between group">
                        <div>
                            <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">{kpi.title}</p>
                            <h3 className="text-3xl font-bold mt-2 text-gray-900">{kpi.value}</h3>
                            <span className={kpi.change.startsWith('+') ? "text-emerald-600 text-xs font-semibold flex items-center mt-2 bg-emerald-50 w-fit px-2 py-1 rounded-full" : "text-gray-600 text-xs font-semibold flex items-center mt-2 bg-gray-50 w-fit px-2 py-1 rounded-full"}>
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {kpi.change}
                            </span>
                        </div>
                        <div className={`p-4 rounded-xl ${kpi.bg}`}>
                            <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Pipeline Performance</h3>
                        <select className="text-sm border-gray-200 rounded-md text-gray-500 focus:ring-indigo-500 focus:border-indigo-500">
                            <option>Last 30 Days</option>
                            <option>Last 7 Days</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    <div className="h-80 bg-gradient-to-br from-gray-50 to-white rounded-xl flex items-center justify-center border border-dashed border-gray-200 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <span className="text-gray-400 font-medium z-10 flex items-center">
                            <BarChart2 className="h-5 w-5 mr-2" />
                            Interactive Chart Visualization
                        </span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
                    <div className="text-center py-10 text-gray-500 text-sm">
                        No recent activity found.
                    </div>
                    <Button variant="ghost" className="w-full mt-6 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                        View All Activity <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
