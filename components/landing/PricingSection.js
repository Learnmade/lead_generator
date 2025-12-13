"use client";

import { useState } from 'react';
import { Check, Zap } from 'lucide-react';
import clsx from 'clsx';
import { Button } from "@/components/common/Button";
import TrialModal from "@/components/billing/TrialModal";

const tiers = [
    {
        name: 'Starter',
        id: 'starter',
        href: '#',
        price: { USD: '$9', INR: '₹699' },
        period: '/month',
        description: 'Perfect for freelancers and individual consultants.',
        features: ['500 AI Lead Searches', 'Basic Email Automation', 'Email Support', 'Single User'],
        mostPopular: false,
    },
    {
        name: 'Pro Growth',
        id: 'pro',
        href: '#',
        price: { USD: '$29', INR: '₹1,999' },
        period: '/month',
        description: 'For growing sales teams and agencies.',
        features: [
            'Unlimited AI Lead Searches',
            'Advanced Email Sequences',
            'LinkedIn Data Enrichment',
            'Priority 24/7 Support',
            'Up to 5 Users',
            'CRM Integration',
        ],
        mostPopular: true,
    },
    {
        name: 'Agency',
        id: 'agency',
        href: '#',
        price: { USD: '$79', INR: '₹5,499' },
        period: '/month',
        description: 'Dedicated infrastructure for large scale operations.',
        features: [
            'Unlimited Everything',
            'White-label Reports',
            'Dedicated Account Manager',
            'Custom API Access',
            'Unlimited Users',
        ],
        mostPopular: false,
    },
];

export default function PricingSection() {
    const [currency, setCurrency] = useState('INR'); // Default to INR for affordability focus
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState("");

    const handleStartTrial = (planName) => {
        setSelectedPlan(planName);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-white py-24 sm:py-32" id="pricing">
            <TrialModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                planName={selectedPlan}
            />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Affordable plans for everyone
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Choose the plan that matches your ambition. Cancel at any time.
                    </p>
                </div>

                <div className="mt-10 flex justify-center">
                    <div className="grid grid-cols-2 gap-x-1 rounded-full bg-gray-100 p-1 text-center text-xs font-semibold leading-5 text-gray-500 ring-1 ring-inset ring-gray-200">
                        <button
                            onClick={() => setCurrency('INR')}
                            className={clsx(
                                "cursor-pointer rounded-full px-4 py-1.5 transition-all text-sm",
                                currency === 'INR' ? "bg-white text-indigo-600 shadow-sm" : "hover:text-gray-900"
                            )}
                        >
                            INR (₹)
                        </button>
                        <button
                            onClick={() => setCurrency('USD')}
                            className={clsx(
                                "cursor-pointer rounded-full px-4 py-1.5 transition-all text-sm",
                                currency === 'USD' ? "bg-white text-indigo-600 shadow-sm" : "hover:text-gray-900"
                            )}
                        >
                            USD ($)
                        </button>
                    </div>
                </div>

                <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={clsx(
                                tier.mostPopular ? 'ring-2 ring-indigo-600 bg-gray-900/5' : 'ring-1 ring-gray-200',
                                'rounded-3xl p-8 xl:p-10 transition-transform duration-300 hover:-translate-y-2 relative bg-white'
                            )}
                        >
                            {tier.mostPopular && (
                                <div className="absolute top-0 right-0 -mr-2 -mt-2">
                                    <span className="inline-flex items-center rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-indigo-600">Most Popular</span>
                                </div>
                            )}
                            <div className="flex items-center justify-between gap-x-4">
                                <h3
                                    id={tier.id}
                                    className={clsx(
                                        tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                                        'text-lg font-semibold leading-8'
                                    )}
                                >
                                    {tier.name}
                                </h3>
                            </div>
                            <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price[currency]}</span>
                                <span className="text-sm font-semibold leading-6 text-gray-600">{tier.period}</span>
                            </p>
                            <Button
                                onClick={() => handleStartTrial(tier.name)}
                                aria-describedby={tier.id}
                                variant={tier.mostPopular ? 'primary' : 'outline'}
                                className="mt-6 w-full shadow-md"
                            >
                                Start Free Trial
                            </Button>
                            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <Check className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
