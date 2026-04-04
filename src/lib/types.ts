export interface Noticia {
  id: string;
  titulo: string;
  contenido: string;
  fecha: string;
  imagen?: string;
  autor: string;
  publicada: boolean;
}

export interface PerfilUsuario {
  id: string;
  user_id: string;
  email: string;
  nombre: string;
  rol: 'maestro' | 'administrativo';
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface NoticiaGeneral {
  id: string;
  titulo: string;
  contenido: string;
  fecha: string;
  imagen?: string;
  publicada: boolean;
  autor_id?: string;
  created_at: string;
  updated_at: string;
}

export interface NoticiaMaestro {
  id: string;
  titulo: string;
  contenido: string;
  fecha: string;
  imagen?: string;
  publicada: boolean;
  autor_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Calificacion {
  id: string;
  estudiante_id: string;
  estudiante_nombre: string;
  materia: string;
  calificacion: number;
  periodo: string;
  observaciones?: string;
  maestro_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Estudiante {
  id: string;
  nombre: string;
  email?: string;
  grado: string;
  grupo?: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  lugar: string;
  categoria: 'academico' | 'cultural' | 'deportivo' | 'general';
}

export interface GaleriaItem {
  id: string;
  titulo: string;
  imagen: string;
  categoria: 'instalaciones' | 'actividades' | 'eventos' | 'graduaciones';
  fecha: string;
}

export interface CalendarioItem {
  id: string;
  titulo: string;
  fecha: string;
  descripcion: string;
  tipo: 'inicio' | 'fin' | 'examen' | 'evento' | 'vacaciones' | 'reunion';
}

export interface DownloadItem {
  id: string;
  titulo: string;
  descripcion: string;
  archivo: string;
  tipo: 'matricula' | 'reglamento' | 'calendario' | 'horario' | 'otro';
}

export interface Lead {
  id: string;
  nombre?: string;
  telefono?: string;
  email?: string;
  mensaje?: string;
  origen: 'chatbot';
  estado: 'nuevo' | 'contactado' | 'atendido' | 'descartado';
  created_at: string;
  updated_at: string;
}
