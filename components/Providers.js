"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/common/Toaster";

export function Providers({ children }) {
    return (
        <SessionProvider>
            {children}
            <Toaster />
        </SessionProvider>
    );
}
