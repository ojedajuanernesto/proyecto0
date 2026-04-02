"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, ArrowLeft, Eye, X, Check } from "lucide-react";

interface Noticia {
  id: string;
  titulo: string;
  contenido: string;
  fecha: string;
  imagen?: string;
  publicada: boolean;
  autor: string;
}

export default function AdminNoticias() {
  const { user, signOut, loading: authLoading } = useAuth();
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNoticia, setEditingNoticia] = useState<Noticia | null>(null);

  const [formData, setFormData] = useState({
    titulo: "",
    contenido: "",
    imagen: "",
    publicada: true,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = "/admin/login";
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      fetchNoticias();
    }
  }, [user]);

  const fetchNoticias = async () => {
    try {
      const { data, error } = await supabase
        .from("noticias")
        .select("*")
        .order("fecha", { ascending: false });

      if (error) throw error;
      setNoticias(data || []);
    } catch (error) {
      console.error("Error fetching noticias:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingNoticia) {
        const { error } = await supabase
          .from("noticias")
          .update({
            titulo: formData.titulo,
            contenido: formData.contenido,
            imagen: formData.imagen || null,
            publicada: formData.publicada,
          })
          .eq("id", editingNoticia.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("noticias").insert({
          titulo: formData.titulo,
          contenido: formData.contenido,
          imagen: formData.imagen || null,
          publicada: formData.publicada,
          fecha: new Date().toISOString().split("T")[0],
          autor: user?.email || "Admin",
        });

        if (error) throw error;
      }
      
      resetForm();
      fetchNoticias();
    } catch (error) {
      console.error("Error saving noticia:", error);
      alert("Error al guardar la noticia");
    }
  };

  const handleEdit = (noticia: Noticia) => {
    setEditingNoticia(noticia);
    setFormData({
      titulo: noticia.titulo,
      contenido: noticia.contenido,
      imagen: noticia.imagen || "",
      publicada: noticia.publicada,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Está seguro de eliminar esta noticia?")) return;
    
    try {
      const { error } = await supabase.from("noticias").delete().eq("id", id);
      if (error) throw error;
      fetchNoticias();
    } catch (error) {
      console.error("Error deleting noticia:", error);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingNoticia(null);
    setFormData({ titulo: "", contenido: "", imagen: "", publicada: true });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-secondary border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
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
              <h1 className="text-xl font-bold">Gestión de Noticias</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={signOut}
                className="bg-secondary/20 px-4 py-2 rounded-lg hover:bg-secondary/30 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {showForm && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {editingNoticia ? "Editar Noticia" : "Nueva Noticia"}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Contenido</label>
                <textarea
                  value={formData.contenido}
                  onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl h-32 focus:ring-2 focus:ring-secondary"
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
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.publicada}
                    onChange={(e) => setFormData({ ...formData, publicada: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-secondary focus:ring-secondary"
                  />
                  <span className="text-sm text-gray-700">Publicar inmediatamente</span>
                </label>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="bg-secondary text-white px-6 py-3 rounded-xl font-semibold hover:bg-secondary-600 transition-colors">
                  {editingNoticia ? "Actualizar" : "Crear"}
                </button>
                <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Noticias ({noticias.length})</h2>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nueva Noticia
            </button>
          </div>
          
          {noticias.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Título</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Fecha</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Estado</th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {noticias.map((noticia) => (
                  <tr key={noticia.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {noticia.imagen && (
                          <img src={noticia.imagen} alt="" className="w-12 h-12 object-cover rounded-lg" />
                        )}
                        <span className="font-medium text-gray-800">{noticia.titulo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{noticia.fecha}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        noticia.publicada ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {noticia.publicada ? "Publicada" : "Borrador"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <a href="/noticias" target="_blank" className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </a>
                        <button onClick={() => handleEdit(noticia)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(noticia.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500">No hay noticias registradas. Crea tu primera noticia.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
