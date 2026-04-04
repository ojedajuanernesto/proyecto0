require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  const key = process.env.GEMINI_API_KEY;
  console.log("Checking key length:", key ? key.length : "undefined");
  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hola");
    console.log("Response:", result.response.text());
  } catch (err) {
    console.error("Test failed:", err.message);
  }
}

test();
