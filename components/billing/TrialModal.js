"use client";

import { useState } from "react";
import { X, CreditCard, Lock, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/common/Button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function TrialModal({ isOpen, onClose, planName }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Input, 2: Success
    const [error, setError] = useState("");
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'upi', 'netbanking'

    const [formData, setFormData] = useState({
        cardNumber: "",
        expiry: "",
        cvc: ""
    });

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Basic formatting
        if (name === "cardNumber") {
            formattedValue = value.replace(/\D/g, '').slice(0, 16);
        } else if (name === "expiry") {
            formattedValue = value.replace(/\D/g, '').slice(0, 4);
            if (formattedValue.length > 2) {
                formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
            }
        } else if (name === "cvc") {
            formattedValue = value.replace(/\D/g, '').slice(0, 4);
        }

        setFormData(prev => ({ ...prev, [name]: formattedValue }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/billing/start-trial", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to start trial");
            }

            setStep(2);
            toast.success("Free trial activated successfully!");
            setTimeout(() => {
                onClose();
                router.push("/dashboard");
            }, 2000);

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {step === 1 ? `Start your ${planName} Trial` : "Trial Activated"}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6">
                    {step === 1 ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                                <Lock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <p>No charge today. You will get 14 days free. We verify your card to prevent abuse.</p>
                            </div>

                            <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
                                {['card', 'upi', 'netbanking'].map((method) => (
                                    <button
                                        key={method}
                                        type="button"
                                        onClick={() => setPaymentMethod(method)}
                                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${paymentMethod === method
                                            ? 'bg-white text-indigo-600 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {method === 'card' && 'Card'}
                                        {method === 'upi' && 'UPI'}
                                        {method === 'netbanking' && 'Net Banking'}
                                    </button>
                                ))}
                            </div>

                            {paymentMethod === 'card' && (
                                <div className="space-y-4">
                                    {error && (
                                        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                                            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                            <p>{error}</p>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                placeholder="0000 0000 0000 0000"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                            <input
                                                type="text"
                                                name="expiry"
                                                value={formData.expiry}
                                                onChange={handleInputChange}
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                            <input
                                                type="text"
                                                name="cvc"
                                                value={formData.cvc}
                                                onChange={handleInputChange}
                                                placeholder="123"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'upi' && (
                                <div className="space-y-4">
                                    <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                                        <Lock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <p>Secure UPI verification. No charge today.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID / VPA</label>
                                        <input
                                            type="text"
                                            placeholder="username@okaxis"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'netbanking' && (
                                <div className="space-y-4">
                                    <div className="bg-yellow-50 text-yellow-700 px-4 py-3 rounded-lg text-sm">
                                        <p>Net Banking is currently disabled for trial verifications. Please use Card or UPI.</p>
                                    </div>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full mt-2"
                                disabled={isLoading || (paymentMethod === 'card' && (!formData.cardNumber || !formData.expiry || !formData.cvc))}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    "Start Free Trial"
                                )}
                            </Button>

                            <p className="text-xs text-center text-gray-500 mt-4">
                                Secure handling with mock encryption.
                            </p>
                        </form>
                    ) : (
                        <div className="text-center py-8">
                            <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">You're all set!</h3>
                            <p className="text-gray-600 mb-6">Your 14-day free trial has been activated. Redirecting you to the dashboard...</p>
                            <Button onClick={() => router.push('/dashboard')} className="w-full bg-indigo-600 hover:bg-indigo-700">
                                Go to Dashboard
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
