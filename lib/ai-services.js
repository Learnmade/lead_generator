import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function scoreLead(leadData) {
    const prompt = `
    Score this lead for web development services (0-100).
    Company: ${leadData.companyName}
    Industry: ${leadData.industry}
    Website: ${leadData.website}
    
    Consider: budget indicators, pain points, buying signals, urgency.
    Return ONLY a JSON object: { "score": number, "painPoints": [], "buyingSignals": [], "reasoning": "string" }
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        // Clean markdown code blocks if present
        const text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(text);
    } catch (error) {
        console.error("AI Scoring Error:", error);
        return { score: 0, painPoints: [], buyingSignals: [], reasoning: "Error (Check GEMINI_API_KEY)" };
    }
}
