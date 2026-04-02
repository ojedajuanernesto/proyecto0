import Card from "../ui/Card";
import { GraduationCap, Users, BookOpen, Award } from "lucide-react";

const stats = [
  {
    icon: GraduationCap,
    number: "25+",
    label: "Años de Experiencia",
  },
  {
    icon: Users,
    number: "1500+",
    label: "Alumnos Activos",
  },
  {
    icon: BookOpen,
    number: "120+",
    label: "Docentes Calificados",
  },
  {
    icon: Award,
    number: "98%",
    label: "Tasa de Aprobación",
  },
];

export default function Stats() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center">
              <stat.icon className="w-10 h-10 text-secondary mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
