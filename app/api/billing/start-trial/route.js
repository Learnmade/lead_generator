
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // Assuming auth setup is compatible with v5 structure or user existing lib
import prisma from "@/lib/db";
import { mockPaymentProvider } from "@/lib/mockPayment";
import { z } from "zod";

const startTrialSchema = z.object({
    cardNumber: z.string(),
    expiry: z.string(),
    cvc: z.string(),
});

export async function POST(req) {
    try {
        const session = await auth();

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const result = startTrialSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const { cardNumber, expiry, cvc } = result.data;

        // 1. Validate Card & Get Fingerprint
        const cardResult = await mockPaymentProvider.validateCard(cardNumber, expiry, cvc);

        if (!cardResult.isValid) {
            return NextResponse.json({ error: cardResult.error }, { status: 400 });
        }

        // 2. Check if Card Fingerprint is already used
        const existingCard = await prisma.usedCard.findUnique({
            where: { fingerprint: cardResult.fingerprint },
        });

        if (existingCard) {
            return NextResponse.json(
                { error: "This card has already been used for a free trial." },
                { status: 403 }
            );
        }

        // 3. Start Trial for User
        // We update the user and record the used card in a transaction
        await prisma.$transaction([
            prisma.user.update({
                where: { email: session.user.email },
                data: {
                    subscriptionStatus: "TRIAL",
                    trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
                    cardLast4: cardResult.last4,
                },
            }),
            prisma.usedCard.create({
                data: {
                    fingerprint: cardResult.fingerprint,
                },
            }),
        ]);

        return NextResponse.json({ success: true, message: "Trial started successfully" });

    } catch (error) {
        console.error("Trial start error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
