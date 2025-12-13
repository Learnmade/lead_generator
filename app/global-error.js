'use client';

import { useEffect } from 'react';
import { Button } from "@/components/common/Button";

export default function GlobalError({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html>
            <body className="h-full flex items-center justify-center bg-gray-50">
                <div className="text-center space-y-4 p-10 bg-white rounded-xl shadow-lg border border-gray-100 max-w-lg">
                    <h2 className="text-3xl font-bold text-gray-900">Something went wrong!</h2>
                    <p className="text-gray-500">
                        A critical error occurred. Our team has been notified.
                        Please try refreshing the page.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button onClick={() => window.location.reload()} variant="outline">
                            Refresh Page
                        </Button>
                        <Button onClick={() => reset()}>Test Again</Button>
                    </div>
                </div>
            </body>
        </html>
    );
}
