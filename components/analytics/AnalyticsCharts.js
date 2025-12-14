"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const data = [
    { name: 'Opened', value: 400, color: '#4f46e5' },
    { name: 'Replied', value: 300, color: '#10b981' },
    { name: 'Bounced', value: 50, color: '#ef4444' },
    { name: 'Unopened', value: 200, color: '#e5e7eb' },
];

const barData = [
    { name: 'Mon', sent: 120, replied: 10 },
    { name: 'Tue', sent: 200, replied: 25 },
    { name: 'Wed', sent: 150, replied: 18 },
    { name: 'Thu', sent: 300, replied: 40 },
    { name: 'Fri', sent: 250, replied: 30 },
];

export default function AnalyticsCharts() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Email Performance</h3>
                <div className="h-80 w-full" style={{ minHeight: '320px' }}>
                    <ResponsiveContainer width="100%" height={320}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Engagement</h3>
                <div className="h-80 w-full" style={{ minHeight: '320px' }}>
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart data={barData}>
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: '#f3f4f6' }} />
                            <Bar dataKey="sent" fill="#e0e7ff" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="replied" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
