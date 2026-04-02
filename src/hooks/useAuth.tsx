"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { PerfilUsuario } from "@/lib/types";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  perfil: PerfilUsuario | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  perfil: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
        });

        const { data: perfilData } = await supabase
          .from("perfiles_usuario")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        if (perfilData) {
          setPerfil(perfilData);
        }
      }
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
          });

          const { data: perfilData } = await supabase
            .from("perfiles_usuario")
            .select("*")
            .eq("user_id", session.user.id)
            .single();

          if (perfilData) {
            setPerfil(perfilData);
          }
        } else {
          setUser(null);
          setPerfil(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email || "",
      });
      router.push("/admin");
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/admin/login");
  };

  return (
    <AuthContext.Provider value={{ user, perfil, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
