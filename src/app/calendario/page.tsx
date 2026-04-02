import Card from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";
import { Calendar, Download, Clock, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";

async function getCalendario() {
  const { data } = await supabase
    .from("calendario_academico")
    .select("*")
    .order("fecha", { ascending: true });

  return data || [];
}

export default async function Calendario() {
  const items = await getCalendario();

  const tipoColors: Record<string, string> = {
    inicio: "bg-green-100 text-green-800 border-green-200",
    fin: "bg-red-100 text-red-800 border-red-200",
    examen: "bg-yellow-100 text-yellow-800 border-yellow-200",
    evento: "bg-blue-100 text-blue-800 border-blue-200",
    vacaciones: "bg-purple-100 text-purple-800 border-purple-200",
    reunion: "bg-orange-100 text-orange-800 border-orange-200",
  };

  const tipoLabels: Record<string, string> = {
    inicio: "Inicio de Clases",
    fin: "Cierre de Ciclo",
    examen: "Exámenes",
    evento: "Actividad Escolar",
    vacaciones: "Receso Escolar",
    reunion: "Reunión de Padres",
  };

  return (
    <div>
      <section className="bg-primary py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Calendar className="w-16 h-16 text-secondary mx-auto mb-6 opacity-80" />
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Calendario Académico <span className="text-secondary">2026</span>
          </h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto">
            Planifica tu año escolar con nosotros. Aquí encontrarás todas las fechas críticas y eventos especiales.
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {items.length > 0 ? (
                items.map((item) => (
                  <Card 
                    key={item.id} 
                    className="p-0 overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex md:flex-row flex-col">
                      <div className="md:w-32 bg-primary text-white flex flex-col items-center justify-center py-6 px-4">
                        <span className="text-4xl font-black">
                          {new Date(item.fecha).getDate()}
                        </span>
                        <span className="text-sm font-bold uppercase tracking-widest opacity-80">
                          {new Date(item.fecha).toLocaleDateString("es-ES", { month: "short" })}
                        </span>
                      </div>
                      <div className="flex-grow p-6 bg-white">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                          <h3 className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
                            {item.titulo}
                          </h3>
                          <span className={`px-4 py-1 rounded-full text-xs font-bold border ${tipoColors[item.tipo] || "bg-gray-100"}`}>
                            {tipoLabels[item.tipo] || item.tipo}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{item.descripcion}</p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl shadow-inner italic text-gray-400">
                  No hay eventos registrados en el calendario actualmente.
                </div>
              )}
            </div>

            <div className="mt-16 text-center">
              <div className="inline-block p-1 bg-white rounded-2xl shadow-lg">
                <Button href="/descargas" variant="primary" size="lg" className="rounded-xl">
                  <Download className="w-5 h-5 mr-3" />
                  Descargar PDF Completo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
