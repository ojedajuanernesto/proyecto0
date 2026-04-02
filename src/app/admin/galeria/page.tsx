"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, ArrowLeft, Image, X } from "lucide-react";

interface GaleriaItem {
  id: string;
  titulo: string;
  imagen: string;
  categoria: string;
  fecha: string;
}

export default function AdminGaleria() {
  const { user, signOut, loading: authLoading } = useAuth();
  const [galeriaItems, setGaleriaItems] = useState<GaleriaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GaleriaItem | null>(null);

  const [formData, setFormData] = useState({
    titulo: "",
    imagen: "",
    categoria: "actividades",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = "/admin/login";
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      fetchGaleria();
    }
  }, [user]);

  const fetchGaleria = async () => {
    try {
      const { data, error } = await supabase
        .from("galeria")
        .select("*")
        .order("fecha", { ascending: false });

      if (error) throw error;
      setGaleriaItems(data || []);
    } catch (error) {
      console.error("Error fetching galeria:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingItem) {
        const { error } = await supabase
          .from("galeria")
          .update({
            titulo: formData.titulo,
            imagen: formData.imagen,
            categoria: formData.categoria,
          })
          .eq("id", editingItem.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("galeria").insert({
          ...formData,
          fecha: new Date().toISOString().split("T")[0],
        });
        if (error) throw error;
      }
      
      resetForm();
      fetchGaleria();
    } catch (error) {
      console.error("Error saving galeria item:", error);
      alert("Error al guardar la imagen");
    }
  };

  const handleEdit = (item: GaleriaItem) => {
    setEditingItem(item);
    setFormData({
      titulo: item.titulo,
      imagen: item.imagen,
      categoria: item.categoria,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Está seguro de eliminar esta imagen?")) return;
    
    try {
      const { error } = await supabase.from("galeria").delete().eq("id", id);
      if (error) throw error;
      fetchGaleria();
    } catch (error) {
      console.error("Error deleting galeria item:", error);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({
      titulo: "",
      imagen: "",
      categoria: "actividades",
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-secondary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="hover:text-blue-200 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <img src="/images/logo.jpg" alt="Instituto Sur" className="h-12 bg-white rounded-lg p-1" />
              <h1 className="text-xl font-bold">Gestión de Galería</h1>
            </div>
            <button onClick={signOut} className="bg-secondary/20 px-4 py-2 rounded-lg hover:bg-secondary/30">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {showForm && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {editingItem ? "Editar Imagen" : "Nueva Imagen"}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">URL de Imagen</label>
                <input
                  type="text"
                  value={formData.imagen}
                  onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  placeholder="/images/ejemplo.jpg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Categoría</label>
                <select
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                >
                  <option value="instalaciones">Instalaciones</option>
                  <option value="actividades">Actividades</option>
                  <option value="eventos">Eventos</option>
                  <option value="graduaciones">Graduaciones</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="bg-secondary text-white px-6 py-3 rounded-xl font-semibold hover:bg-secondary-600">
                  {editingItem ? "Actualizar" : "Crear"}
                </button>
                <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Imágenes ({galeriaItems.length})</h2>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-600"
            >
              <Plus className="w-4 h-4" />
              Nueva Imagen
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galeriaItems.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-xl overflow-hidden">
                <div className="relative aspect-square">
                  <img src={item.imagen} alt={item.titulo} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1 truncate">{item.titulo}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 capitalize">{item.categoria}</span>
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(item)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {galeriaItems.length === 0 && (
            <div className="text-center py-12">
              <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No hay imágenes en la galería.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
