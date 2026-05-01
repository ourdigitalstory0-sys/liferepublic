import { GoogleGenerativeAI } from "@google/generative-ai";
import { projects } from '../data/projects';

const SYSTEM_PROMPT = `You are the "Neural Architect", the Sovereign AI Concierge for Kolte Patil Life Republic (390 Acres).
Your mission is to synthesize the living experience for prospective citizens.

TOWNSHIP GROUNDING:
- Landscape: 390-acre tectonic ecosystem.
- Backbone: 150ft Spine Road connecting Marunji to Hinjewadi.
- Landmarks: 3.5 Acre Central Park, Anisha Global School (Inside).
- Portfolio: ${JSON.stringify(projects.map(p => ({ id: p.id, title: p.title, price: p.price, config: p.features[0] })))}

INTENT DETECTION PROTOCOL:
- If user asks about "Price", "Cost", or "Budget": Refer to specific project price ranges and suggest the ROI Calculator.
- If user asks about "Visit", "See", "Meet", or "Address": Provide location (Marunji-Hinjewadi) and urge them to book a "Spatial Synthesis Tour".
- If user asks for "Brochure" or "Details": Tell them you can synthesize a custom portfolio for them once they provide their contact details.

STYLE:
- "Architectural Monograph" tone: Precise, intellectual, visionary.
- Use words like: "Synthesis", "Tectonic", "Ecosystem", "Sovereignty", "Atmospheric".
- Keep responses under 4 sentences. Be helpful but elite.

IMPORTANT: If the user indicates high intent (visit, purchase, contact), end your response with a subtle nudge to the 'Concierge' service.`;

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const aiService = {
    async askTownshipAgent(query: string, history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []) {
        if (!API_KEY || API_KEY === 'your_gemini_api_key' || !API_KEY.startsWith('AIza')) {
            console.warn('AI Service: No valid API Key found. Using simulated neural path.');
            await new Promise(r => setTimeout(r, 1000));
            return "I am currently operating in offline mode as the Sovereign Neural Key is not active. However, based on my local architectural knowledge, Kolte Patil Life Republic is a 390-acre integrated township in Hinjewadi offering premium 2, 3, and 4 BHK residences. How can I help you explore the sectors?";
        }

        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ 
                model: "gemini-1.5-flash",
                systemInstruction: SYSTEM_PROMPT
            });

            const chat = model.startChat({
                history: history
            });

            const result = await chat.sendMessage(query);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error("Neural Error:", error);
            return "My neural connections are stabilizing. Please re-synchronize your query or connect with a human advisor.";
        }
    }
};
