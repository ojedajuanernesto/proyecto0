"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Mail, Trash2, Calendar, User, Phone, MessageSquare } from "lucide-react";

interface Mensaje {
  id: string;
  nombre: string;
  email: string;
  telefono: string | null;
  asunto: string | null;
  mensaje: string;
  created_at: string;
}

export default function AdminMensajes() {
  const { user, signOut, loading: authLoading } = useAuth();
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = "/admin/login";
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      fetchMensajes();
    }
  }, [user]);

  const fetchMensajes = async () => {
    try {
      const { data, error } = await supabase
        .from("mensajes_contacto")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMensajes(data || []);
    } catch (error) {
      console.error("Error fetching mensajes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Está seguro de eliminar este mensaje?")) return;
    
    try {
      const { error } = await supabase.from("mensajes_contacto").delete().eq("id", id);
      if (error) throw error;
      fetchMensajes();
    } catch (error) {
      console.error("Error deleting mensaje:", error);
    }
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
              <h1 className="text-xl font-bold">Mensajes de Contacto</h1>
            </div>
            <button onClick={signOut} className="bg-secondary/20 px-4 py-2 rounded-lg hover:bg-secondary/30">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-6">
          {mensajes.length > 0 ? (
            mensajes.map((mensaje) => (
              <div key={mensaje.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{mensaje.nombre}</h3>
                        <p className="text-sm text-gray-500">{mensaje.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      <Calendar className="w-4 h-4" />
                      {new Date(mensaje.created_at).toLocaleString("es-ES")}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {mensaje.telefono && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4 text-secondary" />
                        <span>{mensaje.telefono}</span>
                      </div>
                    )}
                    {mensaje.asunto && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MessageSquare className="w-4 h-4 text-secondary" />
                        <span className="capitalize">Asunto: {mensaje.asunto}</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4">
                    <p className="text-gray-700 whitespace-pre-wrap">{mensaje.mensaje}</p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDelete(mensaje.id)}
                      className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar Mensaje
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No hay mensajes de contacto aún.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
