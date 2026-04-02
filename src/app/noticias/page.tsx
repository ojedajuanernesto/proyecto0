import NoticiaCard from "@/components/ui/NoticiaCard";
import { supabase } from "@/lib/supabase";

// export const revalidate = 0;

async function getNoticias() {
  const { data } = await supabase
    .from("noticias")
    .select("*")
    .eq("publicada", true)
    .order("fecha", { ascending: false });

  return data || [];
}

export default async function Noticias() {
  const noticias = await getNoticias();

  return (
    <div>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Noticias</h1>
          <p className="text-blue-200 text-lg">Mantente informado sobre las novedades del Instituto Sur</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {noticias.length > 0 ? (
              <div className="space-y-6">
                {noticias.map((noticia) => (
                  <NoticiaCard
                    key={noticia.id}
                    id={noticia.id}
                    titulo={noticia.titulo}
                    contenido={noticia.contenido}
                    fecha={noticia.fecha}
                    imagen={noticia.imagen}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No hay noticias publicadas actualmente.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
