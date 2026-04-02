import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// Función para obtener el conocimiento de los archivos locales (Simple RAG)
function getLocalKnowledge() {
  try {
    const knowledgeDir = path.join(process.cwd(), "src/data/knowledge");
    
    // Si no existe la carpeta, devolvemos un string vacío
    if (!fs.existsSync(knowledgeDir)) {
      console.warn("Directorio de conocimiento no encontrado:", knowledgeDir);
      return "";
    }

    const files = fs.readdirSync(knowledgeDir);
    let combinedKnowledge = "";

    files.forEach((file) => {
      if (file.endsWith(".md") || file.endsWith(".txt")) {
        const filePath = path.join(knowledgeDir, file);
        const content = fs.readFileSync(filePath, "utf-8");
        combinedKnowledge += `\n--- CONTENIDO DE ARCHIVO: ${file} ---\n${content}\n`;
      }
    });

    return combinedKnowledge;
  } catch (error) {
    console.error("Error al leer el conocimiento local:", error);
    return "";
  }
}

const BASE_SYSTEM_PROMPT = `Eres el asistente virtual del Instituto Sur, una institución educativa en Argentina.
Tu tarea es responder preguntas basándote ÚNICAMENTE en la información de respaldo que se te proporciona a continuación.

REGLAS CRÍTICAS:
1. SI LA INFORMACIÓN NO ESTÁ EN LOS DOCUMENTOS PROPORCIONADOS: Responde exactamente: "Lo siento, no tengo información específica sobre ese tema en mis registros actuales. Por favor, contactate con la administración para más detalles."
2. NO INVENTES: No utilices tu conocimiento general previo para responder cosas que no figuren en los archivos.
3. TONO: Mantené un tono amigable, profesional y usá español argentino (voseo).
4. CONCISIÓN: Sé directo y al punto.

INFORMACIÓN DE RESPALDO (CONTEXTO):`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message) {
      return NextResponse.json({ error: "Mensaje requerido" }, { status: 400 });
    }

    // Obtener conocimiento local
    const localKnowledge = getLocalKnowledge();
    const systemPrompt = `${BASE_SYSTEM_PROMPT}\n${localKnowledge}`;

    // Clave de respaldo si no está configurada en el entorno (Netlify)
    const apiKey = process.env.GEMINI_API_KEY || "AIzaSyDdGSAyuF8p5wLKg13u1JM9guBoh_FZXtA";
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Usar systemInstruction es la forma más robusta de fijar el comportamiento
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      systemInstruction: systemPrompt 
    });

    // Procesar el historial para que sea compatible con Gemini
    let geminiHistory = (history || [])
      .map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

    while (geminiHistory.length > 0 && geminiHistory[0].role !== "user") {
      geminiHistory.shift();
    }

    const chat = model.startChat({
      history: geminiHistory,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response.text();

    return NextResponse.json({ response });
  } catch (error: unknown) {
    console.error("Error en chatbot:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}