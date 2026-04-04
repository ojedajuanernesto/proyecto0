require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
  const key = process.env.GEMINI_API_KEY;
  try {
    const genAI = new GoogleGenerativeAI(key);
    // There isn't a direct listModels in the simple SDK sometimes, but let's try
    // Actually, usually it's genAI.getGenerativeModel({ model: "..." }).listModels()? No.
    // Let's just try gemini-2.0-flash or gemini-1.5-flash-latest
    
    // Alternative: use the REST API
    const https = require('https');
    https.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const models = JSON.parse(data);
        console.log(JSON.stringify(models, null, 2));
      });
    }).on('error', (err) => {
      console.error(err.message);
    });
  } catch (err) {
    console.error(err.message);
  }
}

listModels();
