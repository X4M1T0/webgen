import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyA80Aj9usZo7bP91rwHo9ZpCny5brpqzyk"; // ⚠️ Melhor usar via backend
const genAI = new GoogleGenerativeAI(API_KEY);

export async function sendToGemini(prompt, agent, messages) {
    try {

        let lastMessages = '';

        if(messages && messages.length > 0){
            for(const msg of messages){
                lastMessages += msg.value;
            }
        }

        const message = `
    
            você é um agente de IA especializado em ${agent.name}.

            Configurações: ${agent.instructions}

            As ultimas mensagens são: ${lastMessages}

            O prompt do usuário é: ${prompt}
            
        `

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(message);

        // texto retornado
        return result.response.text();


    } catch (error) {
        console.error("Erro:", error);
        return null;
    }
}
