import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bwuavvchacejfjckvmye.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3dWF2dmNoYWNlamZqY2t2bXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5ODcwMzYsImV4cCI6MjA5MDU2MzAzNn0.j079ZQU-oSV-4hN0rzWxrvZyZQpEA9bCGrVQ_BGoMVk";
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para extraer datos de contacto del mensaje del usuario
function extractContactData(text: string): { nombre?: string; telefono?: string; email?: string; motivo?: string } | null {
  const result: { nombre?: string; telefono?: string; email?: string; motivo?: string } = {};
  const lowerText = text.toLowerCase();
  
  // Detectar email
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) result.email = emailMatch[0];
  
  // Detectar teléfono argentino (formatos variados - más amplio)
  const phonePatterns = [
    /(?:549?|0)?(?:11|15|223|261|299|341|351|381|411|422|423|431|449|456|479|485|493|511|522|543|548|555|564|579|585|590|597|610|620|630|640|644|648|660|670|680|690|699|710|720|730|740|760|770|780|790|800|810|820|830|840|850|860|870|880|890|9\d{2})[ -]?\d{3}[ -]?\d{4}/,
    /(?:11|15)\d{8}/,
    /\d{10}/,
    /\d{4}[ -]?\d{4}/
  ];
  
  for (const pattern of phonePatterns) {
    const match = text.match(pattern);
    if (match) {
      result.telefono = match[0].replace(/\s+/g, '');
      break;
    }
  }
  
  // Detectar nombre - buscar patrón "me llamo" o "soy"
  const nombrePatterns = [
    /me\s+llamo\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i,
    /soy\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i,
    /mi\s+nombre\s+es\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i,
    /llam[oa]s?\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i
  ];
  
  for (const pattern of nombrePatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      result.nombre = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
      break;
    }
  }
  
  // Si no encontró nombre con patrones, buscar primera palabra que no sea email/teléfono
  if (!result.nombre && text.length > 5) {
    const words = text.split(/[\s,;:]+/).filter(w => w.length > 2 && !w.includes('@') && !/\d/.test(w));
    if (words.length > 0) {
      result.nombre = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    }
  }
  
  // Detectar motivo - palabras clave relacionadas con consultas comunes
  if (lowerText.includes('inscripci') || lowerText.includes('matricul') || lowerText.includes('carrera') || lowerText.includes('curso') || lowerText.includes('estudiar')) {
    result.motivo = 'Inscripción/Matriculación';
  } else if (lowerText.includes('precio') || lowerText.includes('costo') || lowerText.includes('cuota')) {
    result.motivo = 'Consulta de precios';
  } else if (lowerText.includes('horario') || lowerText.includes('turno')) {
    result.motivo = 'Consulta de horarios';
  } else if (lowerText.includes('hablar') || lowerText.includes('contactar') || lowerText.includes('atención') || lowerText.includes('asesor')) {
    result.motivo = 'Atención personalizada';
  } else if (lowerText.includes('informaci')) {
    result.motivo = 'Solicitud de información';
  } else if (lowerText.includes('docente') || lowerText.includes('profesor') || lowerText.includes('maestro')) {
    result.motivo = 'Consulta docente';
  } else if (lowerText.includes('alumno') || lowerText.includes('estudiante')) {
    result.motivo = 'Consulta de estudiante';
  } else {
    result.motivo = 'Consulta general';
  }
  
  return Object.keys(result).length > 0 ? result : null;
}

// Función para guardar lead en Supabase
async function saveLead(data: { nombre?: string; telefono?: string; email?: string; mensaje?: string; motivo?: string }) {
  const { error } = await supabase.from('leads').insert([{
    nombre: data.nombre || 'Sin nombre',
    telefono: data.telefono,
    email: data.email,
    motivo: data.motivo,
    mensaje: data.mensaje || 'Contacto desde chatbot',
    origen: 'chatbot',
    estado: 'nuevo',
    created_at: new Date().toISOString()
  }]);
  
  if (error) {
    console.error('Error guardando lead:', error.message);
  }
}

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
3. NO USES ASTERISCOS: Nunca uses asteriscos (*) para delimitar o formatear información. Las respuestas deben ser fluidas y naturales, sin marcadores de ningún tipo.
4. TONO: Mantené un tono amigable, profesional y usá español argentino (voseo: "querés", "estás", "tenés").
5. CONCISIÓN: Sé directo y al punto.
6. FORMATO: Usá Markdown SOLO para negritas, listas o encabezados cuando sea necesario. Evita usar asteriscos sueltos.
7. SOLICITUD DE DATOS: Si el usuario necesita atención personalizada o información que no tengas, pedí su nombre, teléfono (o email) y el motivo de consulta.

IMPORTANTE - CUANDO EL USUARIO APORTA DATOS:
- Si el usuario proporciona un correo electrónico O un teléfono Y se entiende el motivo de consulta, NO pidas más datos.
- Simplemente confirmá que recibiste los datos y decí que un administrativo se comunicará pronto.
- Ejemplo de confirmación: "¡Perfecto! He registrado tu consulta. Un administrativo te contactará pronto a [email/teléfono]."

Ejemplo de cómo proceder:
- Usuario: "Quiero info sobre inscripciones, me llamo Juan, mi email es juan@gmail.com"
- Vos: "¡Perfecto Juan! He registrado tu interés en inscripciones. Un administrativo te contactará pronto a juan@gmail.com."

8. NO MENCIONES LAS FUENTES: No digas "según el archivo", "en los documentos", ni referencias externas en tus respuestas. La información debe parecer que la sabés naturalmente.

INFORMACIÓN DE CONTEXTO:`;

// Función para llamar a OpenRouter (DeepSeek v3.1)
async function callOpenRouter(message: string, history: any[], systemPrompt: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey === "tu_openrouter_api_key_aqui") {
    throw new Error("OPENROUTER_API_KEY no configurada");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://instituto-sur.edu.ar",
      "X-Title": "Instituto Sur Virtual Assistant",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat-v3.1",
      messages: [
        { role: "system", content: systemPrompt },
        ...(history || []).map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        { role: "user", content: message },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Error en OpenRouter");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Función para llamar a Gemini (Fallback)
async function callGemini(message: string, history: any[], systemPrompt: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY no configurada");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: systemPrompt 
  });

  let geminiHistory = (history || [])
    .map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

  while (geminiHistory.length > 0 && geminiHistory[0].role !== "user") {
    geminiHistory.shift();
  }

  const chat = model.startChat({ history: geminiHistory });
  const result = await chat.sendMessage(message);
  return await result.response.text();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message) {
      return NextResponse.json({ error: "Mensaje requerido" }, { status: 400 });
    }

    // Detectar datos de contacto en el mensaje del usuario
    const contactData = extractContactData(message);
    if (contactData && (contactData.email || contactData.telefono)) {
      console.log("Datos de contacto detectados, guardando lead...");
      await saveLead({
        nombre: contactData.nombre,
        telefono: contactData.telefono,
        email: contactData.email,
        motivo: contactData.motivo,
        mensaje: `Motivo: ${contactData.motivo}`
      });
    }

    // Obtener conocimiento local
    const localKnowledge = getLocalKnowledge();
    const systemPrompt = `${BASE_SYSTEM_PROMPT}\n${localKnowledge}`;

    // Paso 1: Intentar con DeepSeek v3.1 de OpenRouter
    try {
      console.log("Intentando con DeepSeek v3.1 (OpenRouter)...");
      const response = await callOpenRouter(message, history, systemPrompt);
      return NextResponse.json({ response, provider: "openrouter" });
    } catch (orError: any) {
      console.error("Fallo OpenRouter:", orError.message);
      
      // Paso 2: Fallback a Gemini si OpenRouter falla o no tiene clave
      try {
        console.log("Intentando fallback con Gemini...");
        const response = await callGemini(message, history, systemPrompt);
        return NextResponse.json({ response, provider: "gemini" });
      } catch (gemError: any) {
        console.error("Fallo terminal en ambos proveedores:", gemError.message);
        return NextResponse.json(
          { error: "No se pudo obtener respuesta de ningún modelo AI." },
          { status: 500 }
        );
      }
    }
  } catch (error: unknown) {
    console.error("Error crítico en chatbot:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}