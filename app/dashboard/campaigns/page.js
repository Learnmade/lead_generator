"use client";

import { Button } from "@/components/common/Button";
import { Plus, Mail, Clock, CheckCircle, MoreHorizontal, PauseCircle, PlayCircle } from "lucide-react";
import { useState } from "react";

const mockCampaigns = [
    { id: 1, name: "SaaS Founders Outreach", status: "active", sent: 1240, openRate: "45%", replyRate: "12%", nextSchedule: "Tomorrow, 9:00 AM" },
    { id: 2, name: "Agency Partnership", status: "paused", sent: 450, openRate: "38%", replyRate: "8%", nextSchedule: "-" },
    { id: 3, name: "Webinar Invite Q4", status: "draft", sent: 0, openRate: "-", replyRate: "-", nextSchedule: "-" },
    { id: 4, name: "Follow-up Sequence", status: "completed", sent: 890, openRate: "52%", replyRate: "15%", nextSchedule: "-" },
];

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState(mockCampaigns);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your email sequences and automation.</p>
                </div>
                <Button className="shadow-lg shadow-indigo-200 hover:shadow-indigo-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Campaign
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-lg ${campaign.status === 'active' ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
                                        {campaign.name}
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                                                campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                                                    campaign.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {campaign.status}
                                        </span>
                                    </h3>
                                    <div className="flex items-center gap-6 mt-2 text-sm text-gray-500">
                                        <span className="flex items-center gap-1.5">
                                            <CheckCircle className="h-4 w-4" />
                                            {campaign.sent} sent
                                        </span>
                                        <span>•</span>
                                        <span>{campaign.openRate} open rate</span>
                                        <span>•</span>
                                        <span>{campaign.replyRate} reply rate</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {campaign.status === 'active' ? (
                                    <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-900 border-gray-200">
                                        <PauseCircle className="h-4 w-4 mr-2" />
                                        Pause
                                    </Button>
                                ) : campaign.status === 'paused' ? (
                                    <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-900 border-gray-200">
                                        <PlayCircle className="h-4 w-4 mr-2" />
                                        Resume
                                    </Button>
                                ) : null}
                                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                                    <MoreHorizontal className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {campaign.status === 'active' && (
                            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4 text-indigo-500" />
                                Next scheduled batch: <span className="font-medium text-gray-900">{campaign.nextSchedule}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
