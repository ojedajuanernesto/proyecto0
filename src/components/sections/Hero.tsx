"use client";

import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { GraduationCap, Users, BookOpen, Award } from "lucide-react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[700px] flex items-center overflow-hidden">
      {/* Animated Background Image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110 animate-ken-burns"
          style={{
            backgroundImage: "url('/images/frente.webp')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className={`max-w-3xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <GraduationCap className="w-5 h-5 text-secondary" />
            <span className="text-white/90 text-sm font-medium">Más de 25 años de excelencia educativa</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Bienvenidos al{' '}
            <span className="relative inline-block">
              <span className="text-secondary">Instituto Sur</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-secondary/50" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M0,8 Q50,0 100,8 T200,8" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed max-w-2xl">
            Formando generaciones con excelencia académica, valores sólidos y compromiso social.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-10 max-w-xl">
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-white">25+</div>
              <div className="text-blue-200 text-sm">Años</div>
            </div>
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-white">1500+</div>
              <div className="text-blue-200 text-sm">Alumnos</div>
            </div>
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-white">98%</div>
              <div className="text-blue-200 text-sm">Aprobación</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="/admision"
              className="group inline-flex items-center gap-3 bg-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-secondary-600 transition-all duration-300 shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 hover:-translate-y-1"
            >
              <GraduationCap className="w-6 h-6" />
              Conoce Nuestro Proceso de Admisión
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/nosotros"
              className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              <Users className="w-6 h-6" />
              Conoce Más Sobre Nosotros
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white rounded-full animate-scroll" />
        </div>
      </div>

      <style jsx>{`
        @keyframes ken-burns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
        
        @keyframes scroll {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(8px);
            opacity: 0.5;
          }
        }
        
        .animate-ken-burns {
          animation: ken-burns 20s ease-out forwards;
        }
        
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
