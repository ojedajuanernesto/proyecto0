/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Desactivado para permitir rutas de API (Chatbot) en Netlify
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
