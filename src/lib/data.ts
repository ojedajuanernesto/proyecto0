import { Noticia, Evento, GaleriaItem, CalendarioItem, DownloadItem } from './types';

export const noticias: Noticia[] = [
  {
    id: '1',
    titulo: 'Inscripciones abiertas para el año escolar 2026',
    contenido: 'Nos complace anunciar que las inscripciones para el próximo año escolar ya están abiertas. Nuestro equipo está listo para recibir a nuevas familias que deseen ser parte de nuestra comunidad educativa.',
    fecha: '2026-03-15',
    imagen: '/images/frente.webp',
    autor: 'Dirección',
    publicada: true,
  },
  {
    id: '2',
    titulo: 'Feria de Ciencias 2026',
    contenido: 'Los alumnos de todos los niveles展示了 sus proyectos de investigación en nuestra feria anual de ciencias. Felicitamos a todos los participantes por su creatividad y dedication.',
    fecha: '2026-03-10',
    imagen: '/images/1.jpg',
    autor: 'Coordinación Académica',
    publicada: true,
  },
  {
    id: '3',
    titulo: 'Nuevo laboratorio de computación',
    contenido: 'Inauguramos nuestro nuevo laboratorio de computación con equipos de última generación para mejorar el aprendizaje tecnológico de nuestros alumnos.',
    fecha: '2026-03-05',
    autor: 'Dirección',
    publicada: true,
  },
];

export const eventos: Evento[] = [
  {
    id: '1',
    titulo: 'Reunión de padres de familia',
    descripcion: 'Reunión general para informar sobre el avance académico del primer trimestre.',
    fecha: '2026-04-05',
    hora: '10:00',
    lugar: 'Auditorio principal',
    categoria: 'general',
  },
  {
    id: '2',
    titulo: 'Día del alumno',
    descripcion: 'Celebración especial en honor a nuestros queridos alumnos.',
    fecha: '2026-04-21',
    hora: '09:00',
    lugar: 'Patio central',
    categoria: 'cultural',
  },
  {
    id: '3',
    titulo: 'Exámenes parciales - Secundaria',
    descripcion: 'Período de exámenes parciales para estudiantes de secundaria.',
    fecha: '2026-04-15',
    hora: '08:00',
    lugar: 'Salones designados',
    categoria: 'academico',
  },
];

export const galeriaItems: GaleriaItem[] = [
  {
    id: '1',
    titulo: 'Fachada del Instituto Sur',
    imagen: '/images/frente.webp',
    categoria: 'instalaciones',
    fecha: '2026-01-15',
  },
  {
    id: '2',
    titulo: 'Actividades deportivas',
    imagen: '/images/1.jpg',
    categoria: 'actividades',
    fecha: '2026-02-20',
  },
];

export const calendarioAcademico: CalendarioItem[] = [
  {
    id: '1',
    titulo: 'Inicio de clases',
    fecha: '2026-03-01',
    descripcion: 'Comienza el año escolar 2026',
    tipo: 'inicio',
  },
  {
    id: '2',
    titulo: 'Vacaciones de Semana Santa',
    fecha: '2026-04-10',
    descripcion: 'Suspensión de actividades',
    tipo: 'vacaciones',
  },
  {
    id: '3',
    titulo: 'Reanudación de clases',
    fecha: '2026-04-21',
    descripcion: 'Regreso a actividades académicas',
    tipo: 'inicio',
  },
  {
    id: '4',
    titulo: 'Exámenes finales',
    fecha: '2026-06-15',
    descripcion: 'Período de evaluaciones finales',
    tipo: 'examen',
  },
  {
    id: '5',
    titulo: 'Clausura del año escolar',
    fecha: '2026-06-30',
    descripcion: 'Acto de graduation y entrega de certificados',
    tipo: 'evento',
  },
];

export const descargas: DownloadItem[] = [
  {
    id: '1',
    titulo: 'Formulario de Matrícula',
    descripcion: 'Documento necesario para el proceso de inscripción',
    archivo: '/descargas/formulario-matricula.pdf',
    tipo: 'matricula',
  },
  {
    id: '2',
    titulo: 'Reglamento Interno',
    descripcion: 'Normas y reglas del Instituto Sur',
    archivo: '/descargas/reglamento.pdf',
    tipo: 'reglamento',
  },
  {
    id: '3',
    titulo: 'Calendario Académico 2026',
    descripcion: 'Fechas importantes del año escolar',
    archivo: '/descargas/calendario-2026.pdf',
    tipo: 'calendario',
  },
  {
    id: '4',
    titulo: 'Horarios de Clases',
    descripcion: 'Distribución de horarios por nivel',
    archivo: '/descargas/horarios.pdf',
    tipo: 'horario',
  },
];
