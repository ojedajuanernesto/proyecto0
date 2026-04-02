"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { X, Plus } from "lucide-react";
import { NoticiaMaestro, Calificacion, Estudiante } from "@/lib/types";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "noticia" | "calificacion";
  editingItem?: NoticiaMaestro | Calificacion | null;
  onSave: () => void;
}

export default function FormModal({ isOpen, onClose, type, editingItem, onSave }: FormModalProps) {
  const { perfil } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  
  const [noticiaForm, setNoticiaForm] = useState({
    titulo: "",
    contenido: "",
    imagen: "",
    publicada: false,
  });

  const [califForm, setCalifForm] = useState({
    estudiante_id: "",
    estudiante_nombre: "",
    materia: "",
    calificacion: "",
    periodo: "Enero-Abril 2026",
    observaciones: "",
  });

  useEffect(() => {
    if (isOpen && type === "calificacion") {
      fetchEstudiantes();
    }
  }, [isOpen, type]);

  useEffect(() => {
    if (editingItem) {
      if (type === "noticia" && "titulo" in editingItem) {
        setNoticiaForm({
          titulo: editingItem.titulo,
          contenido: editingItem.contenido,
          imagen: editingItem.imagen || "",
          publicada: editingItem.publicada,
        });
      } else if (type === "calificacion" && "materia" in editingItem) {
        setCalifForm({
          estudiante_id: editingItem.estudiante_id,
          estudiante_nombre: editingItem.estudiante_nombre,
          materia: editingItem.materia,
          calificacion: String(editingItem.calificacion),
          periodo: editingItem.periodo,
          observaciones: editingItem.observaciones || "",
        });
      }
    } else {
      if (type === "noticia") {
        setNoticiaForm({ titulo: "", contenido: "", imagen: "", publicada: false });
      } else {
        setCalifForm({
          estudiante_id: "",
          estudiante_nombre: "",
          materia: "",
          calificacion: "",
          periodo: "Enero-Abril 2026",
          observaciones: "",
        });
      }
    }
  }, [editingItem, type, isOpen]);

  const fetchEstudiantes = async () => {
    const { data } = await supabase
      .from("estudiantes")
      .select("*")
      .eq("activo", true)
      .order("nombre");
    setEstudiantes(data || []);
  };

  const handleEstudianteChange = (estudianteId: string) => {
    const estudiante = estudiantes.find((e) => e.id === estudianteId);
    setCalifForm((prev) => ({
      ...prev,
      estudiante_id: estudianteId,
      estudiante_nombre: estudiante?.nombre || "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!perfil) return;

    setLoading(true);

    try {
      if (type === "noticia") {
        const payload = {
          ...noticiaForm,
          autor_id: perfil.id,
          fecha: new Date().toISOString().split("T")[0],
        };

        if (editingItem && "id" in editingItem) {
          await supabase
            .from("noticias_maestros")
            .update(payload)
            .eq("id", editingItem.id);
        } else {
          await supabase.from("noticias_maestros").insert([payload]);
        }
      } else {
        const payload = {
          ...califForm,
          calificacion: parseFloat(califForm.calificacion),
          maestro_id: perfil.id,
        };

        if (editingItem && "id" in editingItem) {
          await supabase
            .from("calificaciones")
            .update(payload)
            .eq("id", editingItem.id);
        } else {
          await supabase.from("calificaciones").insert([payload]);
        }
      }

      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              {editingItem ? "Editar" : "Nueva"}{" "}
              {type === "noticia" ? "Noticia" : "Calificación"}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {type === "noticia" ? (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={noticiaForm.titulo}
                  onChange={(e) => setNoticiaForm({ ...noticiaForm, titulo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Contenido
                </label>
                <textarea
                  value={noticiaForm.contenido}
                  onChange={(e) => setNoticiaForm({ ...noticiaForm, contenido: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  URL de Imagen (opcional)
                </label>
                <input
                  type="url"
                  value={noticiaForm.imagen}
                  onChange={(e) => setNoticiaForm({ ...noticiaForm, imagen: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="/images/ejemplo.jpg"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="publicada"
                  checked={noticiaForm.publicada}
                  onChange={(e) => setNoticiaForm({ ...noticiaForm, publicada: e.target.checked })}
                  className="w-4 h-4 text-secondary rounded"
                />
                <label htmlFor="publicada" className="text-sm text-gray-700">
                  Publicar inmediatamente
                </label>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Estudiante
                </label>
                <select
                  value={califForm.estudiante_id}
                  onChange={(e) => handleEstudianteChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  required
                >
                  <option value="">Seleccionar estudiante...</option>
                  {estudiantes.map((est) => (
                    <option key={est.id} value={est.id}>
                      {est.nombre} - {est.grado} {est.grupo}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Materia
                </label>
                <input
                  type="text"
                  value={califForm.materia}
                  onChange={(e) => setCalifForm({ ...califForm, materia: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Matemáticas, Español, etc."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Calificación (0-100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={califForm.calificacion}
                  onChange={(e) => setCalifForm({ ...califForm, calificacion: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Periodo
                </label>
                <select
                  value={califForm.periodo}
                  onChange={(e) => setCalifForm({ ...califForm, periodo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="Enero-Abril 2026">Enero - Abril 2026</option>
                  <option value="Mayo-Agosto 2026">Mayo - Agosto 2026</option>
                  <option value="Septiembre-Diciembre 2026">Septiembre - Diciembre 2026</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Observaciones (opcional)
                </label>
                <textarea
                  value={califForm.observaciones}
                  onChange={(e) => setCalifForm({ ...califForm, observaciones: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Comentarios adicionales..."
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-600 transition-colors disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}