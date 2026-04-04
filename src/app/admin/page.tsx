"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { FileText, Calendar, Image, LogOut, Home, BarChart3, Users, Eye, Edit, Trash2, Mail } from "lucide-react";

interface Stats {
  noticias: number;
  eventos: number;
  galeria: number;
  mensajes: number;
}

interface Noticia {
  id: string;
  titulo: string;
  fecha: string;
  publicada: boolean;
}

interface Evento {
  id: string;
  titulo: string;
  fecha: string;
  hora: string;
  lugar: string;
}

export default function AdminDashboard() {
  const { user, signOut, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<Stats>({ noticias: 0, eventos: 0, galeria: 0, mensajes: 0 });
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = "/admin/login";
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [noticiasRes, eventosRes, galeriaRes, mensajesRes] = await Promise.all([
        supabase.from("noticias").select("id, titulo, fecha, publicada"),
        supabase.from("eventos").select("id, titulo, fecha, hora, lugar"),
        supabase.from("galeria").select("id"),
        supabase.from("leads").select("id"),
      ]);

      setStats({
        noticias: noticiasRes.data?.length || 0,
        eventos: eventosRes.data?.length || 0,
        galeria: galeriaRes.data?.length || 0,
        mensajes: mensajesRes.data?.length || 0,
      });

      setNoticias((noticiasRes.data || []).slice(0, 3));
      setEventos((eventosRes.data || []).slice(0, 3));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="hover:text-blue-200 transition-colors">
                <img src="/images/logo.jpg" alt="Instituto Sur" className="h-12 bg-white rounded-lg p-1" />
              </Link>
              <div>
                <h1 className="text-xl font-bold">Panel de Administración</h1>
                <p className="text-blue-200 text-sm">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                <Home className="w-4 h-4" />
                Ver Sitio
              </Link>
              <button
                onClick={signOut}
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
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/admin/noticias">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-xl">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800">{stats.noticias}</h3>
                  <p className="text-gray-500">Noticias</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/admin/eventos">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-4 rounded-xl">
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800">{stats.eventos}</h3>
                  <p className="text-gray-500">Eventos</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/admin/galeria">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-4 rounded-xl">
                  <Image className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800">{stats.galeria}</h3>
                  <p className="text-gray-500">Imágenes</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/admin/mensajes">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 p-4 rounded-xl">
                  <Mail className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800">{stats.mensajes}</h3>
                  <p className="text-gray-500">Mensajes</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Últimas Noticias</h3>
              <Link href="/admin/noticias" className="text-secondary font-semibold hover:underline text-sm">
                Ver todas →
              </Link>
            </div>
            <div className="space-y-4">
              {noticias.length > 0 ? (
                noticias.map((noticia) => (
                  <div key={noticia.id} className="flex items-center gap-4 pb-4 border-b">
                    <div className="flex-grow">
                      <h4 className="font-semibold text-gray-800">{noticia.titulo}</h4>
                      <p className="text-sm text-gray-500">{noticia.fecha}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      noticia.publicada ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {noticia.publicada ? "Publicada" : "Borrador"}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No hay noticias registradas</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Próximos Eventos</h3>
              <Link href="/admin/eventos" className="text-secondary font-semibold hover:underline text-sm">
                Ver todos →
              </Link>
            </div>
            <div className="space-y-4">
              {eventos.length > 0 ? (
                eventos.map((evento) => (
                  <div key={evento.id} className="flex items-center gap-4 pb-4 border-b">
                    <div className="bg-secondary text-white rounded-lg p-3 text-center min-w-[70px]">
                      <div className="text-lg font-bold">{new Date(evento.fecha).getDate()}</div>
                      <div className="text-xs uppercase">
                        {new Date(evento.fecha).toLocaleDateString("es-ES", { month: "short" })}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{evento.titulo}</h4>
                      <p className="text-sm text-gray-500">{evento.hora} - {evento.lugar}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No hay eventos registrados</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
