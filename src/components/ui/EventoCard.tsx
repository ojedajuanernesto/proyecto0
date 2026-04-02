import { Calendar, Clock, MapPin } from "lucide-react";
import Card from "./Card";

interface EventoCardProps {
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  lugar: string;
  categoria: string;
}

export default function EventoCard({
  titulo,
  descripcion,
  fecha,
  hora,
  lugar,
  categoria,
}: EventoCardProps) {
  const fechaFormateada = new Date(fecha).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const categoriaColors: Record<string, string> = {
    academico: "bg-blue-100 text-blue-800",
    cultural: "bg-purple-100 text-purple-800",
    deportivo: "bg-green-100 text-green-800",
    general: "bg-gray-100 text-gray-800",
  };

  return (
    <Card hover>
      <div className="p-6">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
            categoriaColors[categoria] || categoriaColors.general
          }`}
        >
          {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
        </span>
        <h3 className="text-xl font-bold text-primary mb-2">{titulo}</h3>
        <p className="text-gray-600 mb-4">{descripcion}</p>
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-secondary" />
            <span>{fechaFormateada}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-secondary" />
            <span>{hora}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-secondary" />
            <span>{lugar}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
