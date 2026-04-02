"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { 
  FileText, 
  GraduationCap, 
  LogOut, 
  Home,
  Plus,
  Trash2,
  Edit
} from "lucide-react";
import { NoticiaMaestro, Calificacion } from "@/lib/types";
import FormModal from "@/components/maestros/FormModal";

export default function MaestrosDashboard() {
  const { user, perfil, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"noticias" | "calificaciones">("noticias");
  const [noticias, setNoticias] = useState<NoticiaMaestro[]>([]);
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<NoticiaMaestro | Calificacion | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/maestros/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && perfil) {
      fetchData();
    }
  }, [user, perfil]);

  const fetchData = async () => {
    try {
      if (perfil?.rol === "maestro") {
        const [noticiasRes, califRes] = await Promise.all([
          supabase
            .from("noticias_maestros")
            .select("*")
            .eq("autor_id", perfil.id)
            .order("fecha", { ascending: false }),
          supabase
            .from("calificaciones")
            .select("*")
            .eq("maestro_id", perfil.id)
            .order("created_at", { ascending: false }),
        ]);

        setNoticias(noticiasRes.data || []);
        setCalificaciones(califRes.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/maestros/login");
  };

  const handleDelete = async (type: "noticia" | "calificacion", id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este elemento?")) return;
    
    try {
      if (type === "noticia") {
        await supabase.from("noticias_maestros").delete().eq("id", id);
        setNoticias(noticias.filter(n => n.id !== id));
      } else {
        await supabase.from("calificaciones").delete().eq("id", id);
        setCalificaciones(calificaciones.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleEdit = (item: NoticiaMaestro | Calificacion) => {
    setEditingItem(item);
    setShowForm(true);
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

  if (!user || !perfil || perfil.rol !== "maestro") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-primary to-primary-800 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/maestros/dashboard" className="hover:opacity-90 transition-opacity">
                <div className="bg-white/10 rounded-xl p-2">
                  <img src="/images/logo.jpg" alt="Instituto Sur" className="h-10 bg-white rounded-lg" />
                </div>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Panel de Docentes</h1>
                <p className="text-blue-200 text-sm">{perfil.nombre} - Maestro</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                <Home className="w-4 h-4" />
                Sitio Web
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-lg hover:bg-secondary/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Bienvenido, {perfil.nombre}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setActiveTab("noticias")}
            className={`p-6 rounded-xl transition-all ${
              activeTab === "noticias"
                ? "bg-gradient-to-r from-secondary to-secondary-600 text-white shadow-lg"
                : "bg-white hover:shadow-md"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-xl ${activeTab === "noticias" ? "bg-white/20" : "bg-blue-100"}`}>
                <FileText className={`w-8 h-8 ${activeTab === "noticias" ? "text-white" : "text-primary"}`} />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold">{noticias.length}</h3>
                <p className={activeTab === "noticias" ? "text-white/80" : "text-gray-500"}>Mis Noticias</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("calificaciones")}
            className={`p-6 rounded-xl transition-all ${
              activeTab === "calificaciones"
                ? "bg-gradient-to-r from-secondary to-secondary-600 text-white shadow-lg"
                : "bg-white hover:shadow-md"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-xl ${activeTab === "calificaciones" ? "bg-white/20" : "bg-green-100"}`}>
                <GraduationCap className={`w-8 h-8 ${activeTab === "calificaciones" ? "text-white" : "text-green-600"}`} />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold">{calificaciones.length}</h3>
                <p className={activeTab === "calificaciones" ? "text-white/80" : "text-gray-500"}>Calificaciones</p>
              </div>
            </div>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">
                {activeTab === "noticias" ? "Mis Noticias" : "Calificaciones Registradas"}
              </h3>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                {activeTab === "noticias" ? "Nueva Noticia" : "Nueva Calificación"}
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "noticias" ? (
              <div className="space-y-4">
                {noticias.length > 0 ? (
                  noticias.map((noticia) => (
                    <div key={noticia.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-grow">
                        <h4 className="font-semibold text-gray-800">{noticia.titulo}</h4>
                        <p className="text-sm text-gray-500 line-clamp-2">{noticia.contenido}</p>
                        <p className="text-xs text-gray-400 mt-1">{noticia.fecha}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          noticia.publicada ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {noticia.publicada ? "Publicada" : "Borrador"}
                        </span>
                        <button
                          onClick={() => handleEdit(noticia)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete("noticia", noticia.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No hay noticias registradas</p>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Estudiante</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Materia</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Calificación</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Periodo</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Observaciones</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calificaciones.length > 0 ? (
                      calificaciones.map((calif) => (
                        <tr key={calif.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{calif.estudiante_nombre}</td>
                          <td className="py-3 px-4">{calif.materia}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-sm font-semibold ${
                              calif.calificacion >= 70 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}>
                              {calif.calificacion}
                            </span>
                          </td>
                          <td className="py-3 px-4">{calif.periodo}</td>
                          <td className="py-3 px-4 text-gray-500">{calif.observaciones || "-"}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(calif)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete("calificacion", calif.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-gray-500">
                          No hay calificaciones registradas
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <FormModal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingItem(null);
        }}
        type={activeTab === "noticias" ? "noticia" : "calificacion"}
        editingItem={editingItem}
        onSave={fetchData}
      />
    </div>
  );
}