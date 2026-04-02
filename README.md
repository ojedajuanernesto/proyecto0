# Instituto Sur - Website

Sitio web institucional del Instituto Sur, desarrollado con Next.js, TypeScript, Tailwind CSS y Supabase.

## 🚀 Características

- **Sitio Público**: 11 páginas informativas para padres y alumnos
- **Panel CMS**: Administración para gestionar noticias, eventos y galería
- **Base de Datos**: Supabase para almacenamiento persistente
- **Autenticación**: Login seguro para administradores
- **Diseño Responsive**: Adaptado para todos los dispositivos
- **Colores Institucionales**: Azul (#1B3A6B), Blanco, Rojo (#D92027)

## 📄 Páginas

**Sitio Público:**
1. **Inicio** - Página principal con hero animado
2. **Nosotros** - Historia, misión, visión y equipo
3. **Niveles** - Educación Primaria y Secundaria
4. **Admisión** - Proceso de inscripción y requisitos
5. **Uniforme** - Guía del uniforme escolar
6. **Calendario** - Calendario académico 2026
7. **Descargas** - Documentos importantes
8. **Galería** - Fotos del instituto (con filtros)
9. **Noticias** - Últimas noticias
10. **Eventos** - Calendario de eventos
11. **Contacto** - Formulario e información

**Panel de Administración:**
- **URL**: `/admin`
- **Usuario**: El que configures en Supabase Auth
- **Funcionalidades**: CRUD de Noticias, Eventos y Galería

## 🛠️ Instalación

### 1. Clonar el proyecto

```bash
git clone <tu-repositorio>
cd instituto-sur
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Copia las credenciales del proyecto
3. Edita `.env.local` con tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
```

4. Ejecuta el SQL de configuración (ver `SUPABASE_SETUP.md`)

### 4. Iniciar servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 🚀 Despliegue

### Vercel (Recomendado)

1. Sube el proyecto a GitHub
2. Conecta con Vercel
3. Configura las variables de entorno
4. Despliega

```bash
# Variables necesarias en Vercel:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Otros Hostings

Ver `SUPABASE_SETUP.md` para instrucciones detalladas de despliegue.

## 📁 Estructura del Proyecto

```
instituto-sur/
├── public/images/           # Imágenes del instituto
├── src/
│   ├── app/                # Páginas (App Router)
│   │   ├── admin/          # Panel CMS
│   │   ├── noticias/
│   │   ├── eventos/
│   │   └── ...
│   ├── components/
│   │   ├── layout/         # Header, Footer
│   │   ├── ui/             # Componentes reutilizables
│   │   └── sections/       # Secciones de páginas
│   ├── hooks/              # Custom hooks (useAuth)
│   └── lib/                # Supabase client y tipos
├── .env.local              # Variables de entorno
├── SUPABASE_SETUP.md       # Guía de configuración
└── package.json
```

## 🎨 Tecnologías

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos**: Supabase
- **Autenticación**: Supabase Auth
- **Iconos**: Lucide React

## 🔐 Seguridad

- Row Level Security (RLS) en todas las tablas
- Políticas de acceso basadas en autenticación
- Variables de entorno para credenciales

## 📝 Licencia

Este proyecto es para uso del Instituto Sur.

---

Para más detalles, consulta `SUPABASE_SETUP.md`.
