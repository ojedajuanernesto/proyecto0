"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const { error } = await supabase.from("mensajes_contacto").insert([
        {
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono || null,
          asunto: form.asunto || null,
          mensaje: form.mensaje,
        },
      ]);

      if (error) throw error;

      setStatus("success");
      setForm({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" });
    } catch (err) {
      console.error("Error al enviar mensaje:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contáctenos</h1>
          <p className="text-blue-200 text-lg">Estamos para servirle</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Envíenos un mensaje</h2>
              <Card className="p-6" hover>
                {status === "success" && (
                  <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">
                      ¡Mensaje enviado con éxito! Nos comunicaremos a la brevedad.
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">
                      Ocurrió un error al enviar. Por favor intente nuevamente.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="Ingrese su nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Asunto
                    </label>
                    <select
                      name="asunto"
                      value={form.asunto}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="admision">Admisión</option>
                      <option value="academico">Asuntos Académicos</option>
                      <option value="uniforme">Uniforme y Útiles</option>
                      <option value="pagos">Pagos y Colegiaturas</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Mensaje *
                    </label>
                    <textarea
                      name="mensaje"
                      value={form.mensaje}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="Escriba su mensaje aquí..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-secondary-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar Mensaje
                      </>
                    )}
                  </button>
                </form>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Información de Contacto</h2>

              <Card className="p-6 mb-6" hover>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-primary">Dirección</h3>
                      <p className="text-gray-600">Av. Educación 1234, Zona Sur</p>
                      <p className="text-gray-600">Ciudad, País</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-primary">Teléfono</h3>
                      <p className="text-gray-600">(123) 456-7890</p>
                      <p className="text-gray-600">(123) 456-7891</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-primary">Correo Electrónico</h3>
                      <p className="text-gray-600">info@institutosur.edu</p>
                      <p className="text-gray-600">admisiones@institutosur.edu</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-primary">Horario de Atención</h3>
                      <p className="text-gray-600">Lunes a Viernes: 7:00 - 17:00</p>
                      <p className="text-gray-600">Sábados: 8:00 - 12:00</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gray-100" hover={false}>
                <h3 className="font-semibold text-primary mb-4">Secretaría Académica</h3>
                <p className="text-gray-600 mb-2">
                  Para trámites académicos, certificados y constancias, favor de comunicarse a la
                  secretaría en horario de oficina.
                </p>
                <p className="text-secondary font-semibold">Tel: (123) 456-7892</p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
