import EventoCard from "@/components/ui/EventoCard";
import { supabase } from "@/lib/supabase";

async function getEventos() {
  const { data } = await supabase
    .from("eventos")
    .select("*")
    .order("fecha", { ascending: true });

  return data || [];
}

export default async function Eventos() {
  const eventos = await getEventos();

  return (
    <div>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Eventos</h1>
          <p className="text-blue-200 text-lg">Calendario de actividades y eventos</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {eventos.length > 0 ? (
              <div className="space-y-6">
                {eventos.map((evento, index) => (
                  <EventoCard
                    key={evento.id}
                    titulo={evento.titulo}
                    descripcion={evento.descripcion}
                    fecha={evento.fecha}
                    hora={evento.hora}
                    lugar={evento.lugar}
                    categoria={evento.categoria}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No hay eventos programados actualmente.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
