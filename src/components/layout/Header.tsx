"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, GraduationCap } from "lucide-react";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/niveles", label: "Niveles" },
  { href: "/admision", label: "Admisión" },
  { href: "/uniforme", label: "Uniforme" },
  { href: "/calendario", label: "Calendario" },
  { href: "/descargas", label: "Descargas" },
  { href: "/galeria", label: "Galería" },
  { href: "/noticias", label: "Noticias" },
  { href: "/eventos", label: "Eventos" },
  { href: "/contacto", label: "Contacto" },
  { href: "/maestros", label: "Maestros" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-primary/95 backdrop-blur-md shadow-lg shadow-black/20 py-2" 
          : "bg-primary py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          
          {/* Logo Section - Enhanced */}
          <Link href="/" className="flex items-center gap-4 group">
            {/* Logo Container with Glow Effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/30 rounded-2xl blur-lg transform scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white rounded-2xl p-3 shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/logo.jpg"
                  alt="Instituto Sur"
                  className="h-14 md:h-16 w-auto"
                />
              </div>
            </div>
            
            {/* Text Logo */}
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-2xl tracking-tight leading-none">
                INSTITUTO <span className="text-secondary">SUR</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <GraduationCap className="w-3 h-3 text-secondary" />
                <p className="text-blue-200 text-xs font-medium tracking-wider">
                  EDUCACIÓN DE CALIDAD
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Enhanced */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-white/80 hover:text-white font-medium text-sm transition-colors duration-200 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-secondary rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            
            {/* CTA Button */}
            <Link
              href="/admision"
              className="ml-4 bg-secondary text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-secondary-600 transition-all duration-200 shadow-lg shadow-secondary/30 hover:shadow-xl hover:-translate-y-0.5"
            >
              Admisión 2026
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Slide Down */}
      <div 
        className={`xl:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-primary/98 backdrop-blur-lg border-t border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <Link
                href="/admision"
                className="block w-full bg-secondary text-white text-center px-6 py-3 rounded-lg font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Admisión 2026
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
