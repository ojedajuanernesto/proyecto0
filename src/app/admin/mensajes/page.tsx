"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Mail, Trash2, Calendar, User, Phone, MessageSquare, Check, X, Eye, Bot } from "lucide-react";

interface Lead {
  id: string;
  nombre: string | null;
  email: string | null;
  telefono: string | null;
  mensaje: string | null;
  motivo: string | null;
  origen: string;
  estado: 'nuevo' | 'contactado' | 'atendido' | 'descartado';
  created_at: string;
}

export default function AdminMensajes() {
  const { user, signOut, loading: authLoading } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = "/admin/login";
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      fetchLeads();
    }
  }, [user]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Está seguro de eliminar este lead?")) return;
    
    try {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
      fetchLeads();
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const handleUpdateEstado = async (id: string, nuevoEstado: Lead['estado']) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ estado: nuevoEstado, updated_at: new Date().toISOString() })
        .eq("id", id);
      
      if (error) throw error;
      fetchLeads();
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  const getEstadoColor = (estado: Lead['estado']) => {
    switch (estado) {
      case 'nuevo': return 'bg-yellow-100 text-yellow-800';
      case 'contactado': return 'bg-blue-100 text-blue-800';
      case 'atendido': return 'bg-green-100 text-green-800';
      case 'descartado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrigenIcon = (origen: string) => {
    return origen === 'chatbot' ? <Bot className="w-4 h-4" /> : <Mail className="w-4 h-4" />;
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
              <h1 className="text-xl font-bold">Contactos / Leads</h1>
            </div>
            <button onClick={signOut} className="bg-secondary/20 px-4 py-2 rounded-lg hover:bg-secondary/30">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-bold text-gray-800">Leads del Chatbot</h2>
          </div>
          <p className="text-gray-500 text-sm">
            Contactos capturados automáticamente por el asistente virtual.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {leads.length > 0 ? (
            leads.map((lead) => (
              <div key={lead.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{lead.nombre || 'Sin nombre'}</h3>
                        <p className="text-sm text-gray-500">{lead.email || 'Sin email'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(lead.estado)}`}>
                        {getOrigenIcon(lead.origen)}
                        {lead.estado.charAt(0).toUpperCase() + lead.estado.slice(1)}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        <Calendar className="w-4 h-4" />
                        {new Date(lead.created_at).toLocaleString("es-ES")}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {lead.telefono && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4 text-secondary" />
                        <span>{lead.telefono}</span>
                      </div>
                    )}
                    {lead.motivo && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        <span className="font-medium">{lead.motivo}</span>
                      </div>
                    )}
                    {lead.mensaje && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MessageSquare className="w-4 h-4 text-secondary" />
                        <span className="truncate">{lead.mensaje.substring(0, 50)}...</span>
                      </div>
                    )}
                  </div>

                  {lead.mensaje && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4">
                      <p className="text-gray-700 whitespace-pre-wrap">{lead.mensaje}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap justify-between items-center gap-3">
                    <div className="flex flex-wrap gap-2">
                      {lead.estado === 'nuevo' && (
                        <button
                          onClick={() => handleUpdateEstado(lead.id, 'contactado')}
                          className="flex items-center gap-1 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          Marcar Contactado
                        </button>
                      )}
                      {lead.estado === 'contactado' && (
                        <button
                          onClick={() => handleUpdateEstado(lead.id, 'atendido')}
                          className="flex items-center gap-1 text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          Marcar Atendido
                        </button>
                      )}
                      {(lead.estado === 'nuevo' || lead.estado === 'contactado') && (
                        <button
                          onClick={() => handleUpdateEstado(lead.id, 'descartado')}
                          className="flex items-center gap-1 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Descartar
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
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
              <p className="text-gray-500 text-lg">No hay leads capturados aún.</p>
              <p className="text-gray-400 text-sm mt-2">Los contactos del chatbot aparecerán aquí.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
