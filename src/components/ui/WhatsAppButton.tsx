"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5493434565425"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-[9999] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20BD5A] hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute -top-12 left-0 bg-white text-[#25D366] text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#25D366]/10">
        ¡Escribinos por WhatsApp!
      </span>
    </a>
  );
}
