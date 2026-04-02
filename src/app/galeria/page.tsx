"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";
import { X, ImageIcon } from "lucide-react";

interface GaleriaItem {
  id: string;
  titulo: string;
  imagen: string;
  categoria: string;
  fecha: string;
}

const categorias = [
  { key: "all", label: "Todas" },
  { key: "instalaciones", label: "Instalaciones" },
  { key: "actividades", label: "Actividades" },
  { key: "eventos", label: "Eventos" },
  { key: "graduaciones", label: "Graduaciones" },
];

export default function Galeria() {
  const [items, setItems] = useState<GaleriaItem[]>([]);
  const [categoria, setCategoria] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GaleriaItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGaleria();
  }, []);

  const fetchGaleria = async () => {
    try {
      const { data, error } = await supabase
        .from("galeria")
        .select("*")
        .order("fecha", { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching galeria:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = categoria === "all" 
    ? items 
    : items.filter(item => item.categoria === categoria);

  return (
    <div>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Galería</h1>
          <p className="text-blue-200 text-lg">Conoce nuestras instalaciones y actividades</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categorias.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategoria(cat.key)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                    categoria === cat.key
                      ? "bg-secondary text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-secondary border-t-transparent mx-auto"></div>
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden cursor-pointer group"
                    hover={false}
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="relative aspect-square">
                      <img
                        src={item.imagen}
                        alt={item.titulo}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-center p-2 font-semibold">{item.titulo}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No hay imágenes en esta categoría.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.imagen}
              alt={selectedImage.titulo}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-4 text-xl">{selectedImage.titulo}</p>
          </div>
        </div>
      )}
    </div>
  );
}
