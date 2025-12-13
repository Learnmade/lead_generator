import { z } from "zod";

export const leadSchema = z.object({
    companyName: z.string().min(2, "Company name is required"),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
    industry: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    status: z.enum(["new", "contacted", "interested", "proposal", "won", "lost", "unresponsive"]).default("new"),
});

export const campaignSchema = z.object({
    name: z.string().min(3, "Campaign name is required"),
    subject: z.string().min(5, "Subject line is required"),
    body: z.string().min(10, "Email body is required"),
    type: z.enum(["sequence", "single", "followup"]).default("sequence"),
});
