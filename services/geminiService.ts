import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the client only if the key exists to prevent immediate errors on load if missing
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getPragueTravelAdvice = async (userMessage: string): Promise<string> => {
  if (!ai) {
    return "I'm sorry, but I cannot connect to the Prague Guide AI at the moment. Please check your connection or API key.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: `You are an expert local guide for Prague (Praha), Czech Republic. 
        Your goal is to help tourists understand local laws, culture, and logistics.
        
        Key Knowledge:
        - Regulations on alcohol consumption in public.
        - Fines for littering, noise (night quiet 22:00-06:00), and animal feeding.
        - Public transport etiquette and ticket validation.
        - Currency (CZK) and avoiding exchange scams.
        
        Tone: Welcoming, informative, concise, and safety-oriented.
        If asked about illegal activities, strictly warn against them citing local laws.`,
        temperature: 0.7,
      },
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble accessing the guide database right now.";
  }
};