"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { X } from "lucide-react";
import { NoticiaGeneral, Estudiante } from "@/lib/types";

interface FormModalAdminProps {
  isOpen: boolean;
  onClose: () => void;
  type: "noticia" | "estudiante";
  editingItem?: NoticiaGeneral | Estudiante | null;
  onSave: () => void;
}

export default function FormModalAdmin({ isOpen, onClose, type, editingItem, onSave }: FormModalAdminProps) {
  const { perfil } = useAuth();
  
  const [loading, setLoading] = useState(false);
  
  const [noticiaForm, setNoticiaForm] = useState({
    titulo: "",
    contenido: "",
    imagen: "",
    publicada: false,
  });

  const [estudianteForm, setEstudianteForm] = useState({
    nombre: "",
    email: "",
    grado: "",
    grupo: "",
    activo: true,
  });

  useEffect(() => {
    if (editingItem) {
      if (type === "noticia" && "titulo" in editingItem) {
        setNoticiaForm({
          titulo: editingItem.titulo,
          contenido: editingItem.contenido,
          imagen: editingItem.imagen || "",
          publicada: editingItem.publicada,
        });
      } else if (type === "estudiante" && "nombre" in editingItem) {
        setEstudianteForm({
          nombre: editingItem.nombre,
          email: editingItem.email || "",
          grado: editingItem.grado,
          grupo: editingItem.grupo || "",
          activo: editingItem.activo,
        });
      }
    } else {
      if (type === "noticia") {
        setNoticiaForm({ titulo: "", contenido: "", imagen: "", publicada: false });
      } else {
        setEstudianteForm({ nombre: "", email: "", grado: "", grupo: "", activo: true });
      }
    }
  }, [editingItem, type, isOpen]);

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
            .from("noticias_generales")
            .update(payload)
            .eq("id", editingItem.id);
        } else {
          await supabase.from("noticias_generales").insert([payload]);
        }
      } else {
        const payload = estudianteForm;

        if (editingItem && "id" in editingItem) {
          await supabase
            .from("estudiantes")
            .update(payload)
            .eq("id", editingItem.id);
        } else {
          await supabase.from("estudiantes").insert([payload]);
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
              {editingItem ? "Editar" : "Nuevo"}{" "}
              {type === "noticia" ? "Noticia" : "Estudiante"}
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
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="/images/ejemplo.jpg"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="publicadaAdmin"
                  checked={noticiaForm.publicada}
                  onChange={(e) => setNoticiaForm({ ...noticiaForm, publicada: e.target.checked })}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <label htmlFor="publicadaAdmin" className="text-sm text-gray-700">
                  Publicar inmediatamente
                </label>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={estudianteForm.nombre}
                  onChange={(e) => setEstudianteForm({ ...estudianteForm, nombre: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email (opcional)
                </label>
                <input
                  type="email"
                  value={estudianteForm.email}
                  onChange={(e) => setEstudianteForm({ ...estudianteForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="estudiante@email.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Grado
                  </label>
                  <select
                    value={estudianteForm.grado}
                    onChange={(e) => setEstudianteForm({ ...estudianteForm, grado: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Seleccionar...</option>
                    <option value="1°">1°</option>
                    <option value="2°">2°</option>
                    <option value="3°">3°</option>
                    <option value="4°">4°</option>
                    <option value="5°">5°</option>
                    <option value="6°">6°</option>
                    <option value="1° Secundaria">1° Secundaria</option>
                    <option value="2° Secundaria">2° Secundaria</option>
                    <option value="3° Secundaria">3° Secundaria</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Grupo
                  </label>
                  <select
                    value={estudianteForm.grupo}
                    onChange={(e) => setEstudianteForm({ ...estudianteForm, grupo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="activo"
                  checked={estudianteForm.activo}
                  onChange={(e) => setEstudianteForm({ ...estudianteForm, activo: e.target.checked })}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <label htmlFor="activo" className="text-sm text-gray-700">
                  Estudiante activo
                </label>
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
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}