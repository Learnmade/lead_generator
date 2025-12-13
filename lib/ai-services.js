import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function scoreLead(leadData) {
    const prompt = `
    Score this lead for web development services (0-100):
    Company: ${leadData.companyName}
    Industry: ${leadData.industry}
    Website: ${leadData.website}
    
    Consider: budget indicators, pain points, buying signals, urgency.
    Return JSON: { "score": number, "painPoints": [], "buyingSignals": [], "reasoning": "string" }
  `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });
        return JSON.parse(response.choices[0].message.content);
    } catch (error) {
        console.error("AI Scoring Error:", error);
        return { score: 0, painPoints: [], buyingSignals: [], reasoning: "Error" };
    }
}
