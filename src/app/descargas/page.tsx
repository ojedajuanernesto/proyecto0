import Card from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";
import { FileText, Download, File, BookOpen, Clock } from "lucide-react";

async function getDescargas() {
  const { data } = await supabase
    .from("descargas")
    .select("*")
    .order("created_at", { ascending: true });

  return data || [];
}

const tipoIcons: Record<string, React.ElementType> = {
  matricula: FileText,
  reglamento: BookOpen,
  calendario: File,
  horario: Clock,
  otro: File,
};

export default async function Descargas() {
  const items = await getDescargas();

  return (
    <div>
      <section className="bg-primary py-24 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <Download className="w-16 h-16 text-secondary mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Descargas</h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto">
            Documentación oficial, formularios y guías para nuestra comunidad educativa.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {items.length > 0 ? (
                items.map((doc) => {
                  const IconComponent = tipoIcons[doc.tipo] || File;
                  return (
                    <Card 
                      key={doc.id} 
                      className="p-8 border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-slate-50 group hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-6">
                        <div className="bg-white p-5 rounded-2xl shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <IconComponent className="w-10 h-10 text-primary group-hover:text-white" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                            {doc.titulo}
                          </h3>
                          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                            {doc.descripcion}
                          </p>
                          <a 
                            href={doc.archivo}
                            download
                            className="inline-flex items-center gap-3 bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                          >
                            <Download className="w-5 h-5" />
                            Descargar PDF
                          </a>
                        </div>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-2 text-center py-20 italic text-gray-400 bg-slate-50 rounded-3xl">
                  No hay documentos disponibles para descarga en este momento.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white overflow-hidden relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Buscas algo más?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Si no encuentras el documento que necesitas, puedes solicitarlo directamente a nuestra administración.
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center justify-center px-10 py-4 bg-secondary text-white font-black text-lg rounded-2xl hover:scale-105 transition-transform shadow-xl"
          >
            Solicitar Información
          </a>
        </div>
      </section>
    </div>
  );
}
