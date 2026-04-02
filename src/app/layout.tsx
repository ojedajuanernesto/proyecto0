import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "./providers";
import ChatBot from "@/components/ChatBot";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instituto Sur - Educación de Calidad",
  description: "Instituto Sur - Más de 25 años formando generaciones con excelencia académica, valores sólidos y compromiso social.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatBot />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
