import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const searchLeadsWithAI = async (query: string) => {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-exp",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Você é um especialista em inteligência de mercado B2B. 
            O usuário está procurando leads com a seguinte descrição: "${query}".
            
            Gere uma lista de 5 empresas fictícias (mas realistas) que se encaixam nessa descrição para o mercado brasileiro.
            Para cada empresa, forneça:
            - Nome da empresa
            - CNPJ (formato XX.XXX.XXX/0001-XX)
            - Status (sempre "ATIVA")
            - Capital Social (valor formatado em R$)
            - Faturamento Estimado (uma das opções: "Até R$ 360 mil", "R$ 360k - R$ 4.8m", "R$ 4.8m - R$ 10m", "R$ 10m - R$ 300m", "Acima de R$ 300m")
            - CNAE Principal (7 dígitos)
            - Descrição da atividade
            - Localização (Cidade, UF)
            
            Retorne os dados estritamente em formato JSON.`
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            cnpj: { type: Type.STRING },
            status: { type: Type.STRING },
            capital: { type: Type.STRING },
            faturamento: { type: Type.STRING },
            cnae: { type: Type.STRING },
            atividade: { type: Type.STRING },
            localizacao: { type: Type.STRING }
          },
          required: ["name", "cnpj", "status", "capital", "faturamento", "cnae", "atividade", "localizacao"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Erro ao parsear resposta da IA:", e);
    return [];
  }
};
