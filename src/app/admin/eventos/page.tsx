"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, ArrowLeft, Eye, X } from "lucide-react";

interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  lugar: string;
  categoria: string;
}

export default function AdminEventos() {
  const { user, signOut, loading: authLoading } = useAuth();
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvento, setEditingEvento] = useState<Evento | null>(null);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    hora: "",
    lugar: "",
    categoria: "general",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = "/admin/login";
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      fetchEventos();
    }
  }, [user]);

  const fetchEventos = async () => {
    try {
      const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .order("fecha", { ascending: true });

      if (error) throw error;
      setEventos(data || []);
    } catch (error) {
      console.error("Error fetching eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingEvento) {
        const { error } = await supabase
          .from("eventos")
          .update(formData)
          .eq("id", editingEvento.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("eventos").insert(formData);
        if (error) throw error;
      }
      
      resetForm();
      fetchEventos();
    } catch (error) {
      console.error("Error saving evento:", error);
      alert("Error al guardar el evento");
    }
  };

  const handleEdit = (evento: Evento) => {
    setEditingEvento(evento);
    setFormData({
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fecha: evento.fecha,
      hora: evento.hora,
      lugar: evento.lugar,
      categoria: evento.categoria,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Está seguro de eliminar este evento?")) return;
    
    try {
      const { error } = await supabase.from("eventos").delete().eq("id", id);
      if (error) throw error;
      fetchEventos();
    } catch (error) {
      console.error("Error deleting evento:", error);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingEvento(null);
    setFormData({
      titulo: "",
      descripcion: "",
      fecha: "",
      hora: "",
      lugar: "",
      categoria: "general",
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

  const categoriaColors: Record<string, string> = {
    academico: "bg-blue-100 text-blue-800",
    cultural: "bg-purple-100 text-purple-800",
    deportivo: "bg-green-100 text-green-800",
    general: "bg-gray-100 text-gray-800",
  };

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
              <h1 className="text-xl font-bold">Gestión de Eventos</h1>
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
                {editingEvento ? "Editar Evento" : "Nuevo Evento"}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl h-24"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha</label>
                <input
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Hora</label>
                <input
                  type="time"
                  value={formData.hora}
                  onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Lugar</label>
                <input
                  type="text"
                  value={formData.lugar}
                  onChange={(e) => setFormData({ ...formData, lugar: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
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
                  <option value="general">General</option>
                  <option value="academico">Académico</option>
                  <option value="cultural">Cultural</option>
                  <option value="deportivo">Deportivo</option>
                </select>
              </div>
              <div className="md:col-span-2 flex gap-4 pt-4">
                <button type="submit" className="bg-secondary text-white px-6 py-3 rounded-xl font-semibold hover:bg-secondary-600">
                  {editingEvento ? "Actualizar" : "Crear"}
                </button>
                <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Eventos ({eventos.length})</h2>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-600"
            >
              <Plus className="w-4 h-4" />
              Nuevo Evento
            </button>
          </div>
          
          {eventos.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Fecha</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Título</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Hora</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Categoría</th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {eventos.map((evento) => (
                  <tr key={evento.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800">{evento.fecha}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{evento.titulo}</td>
                    <td className="px-6 py-4 text-gray-600">{evento.hora}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoriaColors[evento.categoria]}`}>
                        {evento.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <a href="/eventos" target="_blank" className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Eye className="w-4 h-4" />
                        </a>
                        <button onClick={() => handleEdit(evento)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(evento.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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
              <p className="text-gray-500">No hay eventos registrados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
