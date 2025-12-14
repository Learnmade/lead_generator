
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Validation schema
const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    company: z.string().optional(),
    jobTitle: z.string().optional(),
});

export async function POST(req) {
    try {
        const body = await req.json();
        const result = registerSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const { email, password, company, jobTitle } = result.data;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                company,
                // Map jobTitle to customFields or a specific field if added to schema in future
                // For now, storing in 'customFields' or if it doesn't exist, we can add it to schema or ignore
                // Checking schema: company exists. jobTitle does NOT exist in schema. 
                // We will store jobTitle in customFields JSON for now to avoid migration overhead unless critical.
                customFields: JSON.stringify({ jobTitle }),
            },
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
