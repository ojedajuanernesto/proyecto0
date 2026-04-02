import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Valores from "@/components/sections/Valores";
import NoticiaCard from "@/components/ui/NoticiaCard";
import EventoCard from "@/components/ui/EventoCard";
import Card from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";
import { Users, BookOpen, Calendar, Download, CheckCircle, ArrowRight, Award, Heart, MessageCircle } from "lucide-react";

// export const revalidate = 0; // Desactivado para permitir exportación estática total

async function getData() {
  const [noticiasRes, eventosRes] = await Promise.all([
    supabase
      .from("noticias")
      .select("*")
      .eq("publicada", true)
      .order("fecha", { ascending: false })
      .limit(2),
    supabase
      .from("eventos")
      .select("*")
      .order("fecha", { ascending: true })
      .limit(2),
  ]);

  return {
    noticias: noticiasRes.data || [],
    eventos: eventosRes.data || [],
  };
}

export default async function Home() {
  const { noticias, eventos } = await getData();

  return (
    <div className="pt-16">
      <Hero />
      
      <Stats />
      
      <Valores />
      
      {/* Niveles Educativos - Enhanced Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary font-semibold text-sm rounded-full mb-4">
              EDUCACIÓN INTEGRAL
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Niveles Educativos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Ofrecemos educación integral desde primaria hasta secundaria, con programas diseñados para el desarrollo completo de cada estudiante.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Primaria Card */}
            <Card className="group relative overflow-hidden" hover={false}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-secondary/20 to-transparent rounded-bl-full" />
              <div className="relative p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-secondary/10 p-4 rounded-2xl">
                    <BookOpen className="w-10 h-10 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary">Educación Primaria</h3>
                    <p className="text-gray-500">Grados 1° a 6°</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Fomentamos el amor por el aprendizaje a través de actividades lúdicas y estructuradas que desarrollan habilidades fundamentales.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    <span>Desarrollo de lectoescritura</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    <span>Matemáticas y razonamiento lógico</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    <span>Actividades artísticas y deportivas</span>
                  </li>
                </ul>
                <a
                  href="/niveles"
                  className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-4 transition-all"
                >
                  Más Información
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </Card>
            
            {/* Secundaria Card */}
            <Card className="group relative overflow-hidden" hover={false}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
              <div className="relative p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-primary/10 p-4 rounded-2xl">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary">Educación Secundaria</h3>
                    <p className="text-gray-500">Grados 7° a 12°</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Preparamos a los adolescentes para la universidad y la vida profesional con un enfoque crítico y analítico.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Preparación preuniversitaria</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Orientación vocacional</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Actividades extracurriculares</span>
                  </li>
                </ul>
                <a
                  href="/niveles"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all"
                >
                  Más Información
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us - Enhanced */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-white/10 text-white font-semibold text-sm rounded-full mb-4">
              ¿POR QUÉ ELEGIRNOS?
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Excelencia en Cada Detalle
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:bg-white/20 transition-all">
              <div className="w-16 h-16 bg-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">98%</h3>
              <p className="text-blue-200">Tasa de Aprobación</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:bg-white/20 transition-all">
              <div className="w-16 h-16 bg-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">120+</h3>
              <p className="text-blue-200">Docentes Calificados</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:bg-white/20 transition-all">
              <div className="w-16 h-16 bg-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">10K+</h3>
              <p className="text-blue-200">Libros en Biblioteca</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:bg-white/20 transition-all">
              <div className="w-16 h-16 bg-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">25+</h3>
              <p className="text-blue-200">Años de Experiencia</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* News Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
              ACTUALIDADES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Últimas Noticias
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mantente informado sobre las novedades y actividades de nuestra comunidad educativa.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {noticias.length > 0 ? (
              noticias.map((noticia) => (
                <NoticiaCard
                  key={noticia.id}
                  id={noticia.id}
                  titulo={noticia.titulo}
                  contenido={noticia.contenido}
                  fecha={noticia.fecha}
                  imagen={noticia.imagen}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-500">No hay noticias publicadas actualmente.</p>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <a
              href="/noticias"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl"
            >
              Ver Todas las Noticias
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Events Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary font-semibold text-sm rounded-full mb-4">
              CALENDARIO
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Próximos Eventos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              No te pierdas nuestras próximas actividades y eventos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {eventos.length > 0 ? (
              eventos.map((evento, index) => (
                <EventoCard
                  key={evento.id}
                  titulo={evento.titulo}
                  descripcion={evento.descripcion}
                  fecha={evento.fecha}
                  hora={evento.hora}
                  lugar={evento.lugar}
                  categoria={evento.categoria}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-500">No hay eventos programados actualmente.</p>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <a
              href="/eventos"
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-600 transition-all shadow-lg hover:shadow-xl"
            >
              Ver Todos los Eventos
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Gallery Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-4 border-secondary/20 rounded-2xl" />
              <img
                src="/images/frente.webp"
                alt="Fachada del Instituto Sur"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div>
              <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary font-semibold text-sm rounded-full mb-4">
                INSTALACIONES
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Conoce Nuestras Instalaciones
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Contamos con modernas instalaciones diseñadas para brindar la mejor experiencia educativa a nuestros estudiantes.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-gray-700 font-medium">Laboratorios de computación equipados</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-gray-700 font-medium">Biblioteca con más de 10,000 títulos</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-gray-700 font-medium">Canchas deportivas y área recreativa</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-gray-700 font-medium">Aulas modernas con tecnología</span>
                </li>
              </ul>
              <a
                href="/galeria"
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-600 transition-all shadow-lg"
              >
                Ver Galería Completa
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Calendar className="w-20 h-20 text-secondary mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Calendario Académico 2026
          </h2>
          <p className="text-blue-200 text-xl mb-10 max-w-2xl mx-auto">
            Consulta las fechas importantes del año escolar: inicio de clases, exámenes, vacaciones y eventos especiales.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/calendario"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
            >
              <Calendar className="w-5 h-5" />
              Ver Calendario
            </a>
            <a
              href="/descargas"
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-600 transition-all shadow-lg"
            >
              <Download className="w-5 h-5" />
              Descargar Documentos
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
