import Card from "../ui/Card";
import { BookOpen, Users, Heart, Star, Lightbulb, Shield } from "lucide-react";

const valores = [
  {
    icon: BookOpen,
    titulo: "Excelencia Académica",
    descripcion: "Promovemos el aprendizaje integral y el pensamiento crítico en nuestros estudiantes.",
  },
  {
    icon: Heart,
    titulo: "Formación en Valores",
    descripcion: "Fomentamos la honestidad, respeto, responsabilidad y solidaridad.",
  },
  {
    icon: Users,
    titulo: "Comunidad",
    descripcion: "Creamos un ambiente de pertenencia donde cada miembro es valorado.",
  },
  {
    icon: Lightbulb,
    titulo: "Innovación",
    descripcion: "Impulsamos la creatividad y el uso de tecnología educativa moderna.",
  },
  {
    icon: Shield,
    titulo: "Seguridad",
    descripcion: "Garantizamos un entorno seguro y protegidos para todos.",
  },
  {
    icon: Star,
    titulo: "Superación",
    descripcion: "Motivamos a cada alumno a alcanzar su máximo potencial.",
  },
];

export default function Valores() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Nuestros Valores
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            En el Instituto Sur, nuestros valores guían cada decisión y acción, formando estudiantes íntegros y preparados para el futuro.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valores.map((valor, index) => (
            <Card key={index} className="p-6" hover>
              <valor.icon className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">{valor.titulo}</h3>
              <p className="text-gray-600">{valor.descripcion}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
