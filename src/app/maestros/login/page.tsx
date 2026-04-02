"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Lock, User, Eye, EyeOff, GraduationCap, BookOpen, Settings } from "lucide-react";

export default function MaestrosLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      if (signInData.user) {
        const { data: perfil, error: perfilError } = await supabase
          .from("perfiles_usuario")
          .select("*")
          .eq("user_id", signInData.user.id)
          .single();

        if (perfilError || !perfil) {
          await supabase.auth.signOut();
          setError("No tienes acceso autorizado. Contacta al administrador.");
          setLoading(false);
          return;
        }

        if (!perfil.activo) {
          await supabase.auth.signOut();
          setError("Tu cuenta ha sido desactivada. Contacta al administrador.");
          setLoading(false);
          return;
        }

        if (perfil.rol === "administrativo") {
          router.push("/maestros/dashboard/admin");
        } else {
          router.push("/maestros/dashboard");
        }
      }
    } catch (err) {
      setError("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-800 to-primary-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-secondary to-secondary-600 rounded-2xl mb-4">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-primary">Acceso Docentes</h1>
          <p className="text-gray-500">Instituto Sur</p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Maestros</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
            <Settings className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-purple-600 font-medium">Administrativos</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Correo Institucional
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                placeholder="docente@institutosur.edu"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-secondary to-secondary-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-secondary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Verificando...
              </span>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-gray-500 hover:text-primary text-sm transition-colors">
            ← Volver al sitio web
          </a>
        </div>
      </div>
    </div>
  );
}