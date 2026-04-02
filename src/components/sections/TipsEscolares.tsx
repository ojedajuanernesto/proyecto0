import Card from "../ui/Card";
import { Lightbulb, BookOpen, Clock, PenTool } from "lucide-react";

export default function TipsEscolares() {
  const tips = [
    {
      icon: <Clock className="w-10 h-10 text-secondary mb-4" />,
      title: "Organiza tu Tiempo",
      description: "Crea un horario semanal que incluya tiempo para tareas, estudio y descanso. ¡La constancia es la clave!"
    },
    {
      icon: <BookOpen className="w-10 h-10 text-secondary mb-4" />,
      title: "Hábitos de Lectura",
      description: "Dedica al menos 20 minutos diarios a leer algo que te apasione, no solo los libros de texto."
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-secondary mb-4" />,
      title: "Técnicas de Estudio",
      description: "Prueba el método Pomodoro o los mapas mentales para hacer tus sesiones de repaso más dinámicas."
    },
    {
      icon: <PenTool className="w-10 h-10 text-secondary mb-4" />,
      title: "Prepara tu Mochila",
      description: "Revisa tu horario cada noche y guarda los útiles necesarios para evitar olvidos al día siguiente."
    }
  ];

  return (
    <section className="py-20 relative bg-[#F8FAFC] overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full font-semibold text-sm mb-4">
            Rincón del Estudiante
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight mb-4">
            Tips para un Año Exitoso
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pequeños consejos que marcan una gran diferencia en tu rendimiento académico y tu bienestar diario.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, index) => (
            <Card 
              key={index} 
              className="p-8 text-center bg-white border border-gray-100 hover:border-secondary/30 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                {tip.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{tip.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
