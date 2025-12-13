import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { leadSchema } from "@/lib/validators";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const status = searchParams.get("status");

        const where = {
            userId: session.user.id,
            ...(status && { status }),
        };

        const [leads, total] = await Promise.all([
            prisma.lead.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            prisma.lead.count({ where }),
        ]);

        return NextResponse.json({ leads, total, page, limit });
    } catch (error) {
        console.error("Leads API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const validatedData = leadSchema.parse(body);

        const lead = await prisma.lead.create({
            data: {
                ...validatedData,
                userId: session.user.id,
            },
        });

        return NextResponse.json(lead);
    } catch (error) {
        console.error("Create Lead Error:", error);
        return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
    }
}
