import Link from "next/link";
import { Calendar } from "lucide-react";
import Card from "./Card";

interface NoticiaCardProps {
  id: string;
  titulo: string;
  contenido: string;
  fecha: string;
  imagen?: string;
}

export default function NoticiaCard({ id, titulo, contenido, fecha, imagen }: NoticiaCardProps) {
  const fechaFormateada = new Date(fecha).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card hover>
      <div className="md:flex">
        {imagen && (
          <div className="md:w-1/3">
            <img
              src={imagen}
              alt={titulo}
              className="h-48 md:h-full w-full object-cover"
            />
          </div>
        )}
        <div className="p-6 md:w-2/3">
          <div className="flex items-center gap-2 text-secondary mb-2">
            <Calendar size={16} />
            <span className="text-sm">{fechaFormateada}</span>
          </div>
          <h3 className="text-xl font-bold text-primary mb-3">{titulo}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{contenido}</p>
          <Link
            href={`/noticias/${id}`}
            className="text-secondary font-semibold hover:underline"
          >
            Leer más →
          </Link>
        </div>
      </div>
    </Card>
  );
}
