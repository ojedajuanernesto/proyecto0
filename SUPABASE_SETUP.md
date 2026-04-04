# Instituto Sur - Guía de Configuración

## 1. Configuración de Supabase

### 1.1 Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Copia las credenciales:
   - **Project URL**: `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 1.2 Actualizar Variables de Entorno

Edita el archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 1.3 Crear Tablas en Supabase

Ejecuta el siguiente SQL en el SQL Editor de Supabase para crear las tablas necesarias:

```sql
-- ============================================
-- TABLA: perfiles_usuario (maestros y administrativos)
-- ============================================
CREATE TABLE perfiles_usuario (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email TEXT NOT NULL,
  nombre TEXT NOT NULL,
  rol TEXT NOT NULL CHECK (rol IN ('maestro', 'administrativo')),
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Habilitar Row Level Security
ALTER TABLE perfiles_usuario ENABLE ROW LEVEL SECURITY;

-- Política: Solo lectura para usuarios autenticados
CREATE POLICY "Authenticated users can view perfiles"
  ON perfiles_usuario FOR SELECT
  USING (auth.role() = 'authenticated');

-- Política: Solo permite insertar (creado por trigger)
CREATE POLICY "Users can insert their own profile"
  ON perfiles_usuario FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ============================================
-- TABLA: noticias_generales (para administrativos)
-- ============================================
CREATE TABLE noticias_generales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  imagen TEXT,
  publicada BOOLEAN DEFAULT false,
  autor_id UUID REFERENCES perfiles_usuario(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Habilitar Row Level Security
ALTER TABLE noticias_generales ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede leer noticias publicadas
CREATE POLICY "Anyone can view published noticias_generales"
  ON noticias_generales FOR SELECT
  USING (publicada = true);

-- Política: Solo administrativos pueden insertar
CREATE POLICY "Administrativos can insert noticias_generales"
  ON noticias_generales FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM perfiles_usuario
      WHERE user_id = auth.uid() AND rol = 'administrativo'
    )
  );

-- Política: Solo el autor puede actualizar
CREATE POLICY "Autor can update noticias_generales"
  ON noticias_generales FOR UPDATE
  USING (
    autor_id IN (
      SELECT id FROM perfiles_usuario WHERE user_id = auth.uid()
    )
  );

-- Política: Solo el autor puede eliminar
CREATE POLICY "Autor can delete noticias_generales"
  ON noticias_generales FOR DELETE
  USING (
    autor_id IN (
      SELECT id FROM perfiles_usuario WHERE user_id = auth.uid()
    )
  );

-- ============================================
-- TABLA: noticias_maestros (para maestros)
-- ============================================
CREATE TABLE noticias_maestros (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  imagen TEXT,
  publicada BOOLEAN DEFAULT false,
  autor_id UUID REFERENCES perfiles_usuario(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Habilitar Row Level Security
ALTER TABLE noticias_maestros ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede leer noticias publicadas
CREATE POLICY "Anyone can view published noticias_maestros"
  ON noticias_maestros FOR SELECT
  USING (publicada = true);

-- Política: Solo maestros pueden insertar
CREATE POLICY "Maestros can insert noticias_maestros"
  ON noticias_maestros FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM perfiles_usuario
      WHERE user_id = auth.uid() AND rol = 'maestro'
    )
  );

-- Política: Solo el autor puede actualizar
CREATE POLICY "Autor can update noticias_maestros"
  ON noticias_maestros FOR UPDATE
  USING (
    autor_id IN (
      SELECT id FROM perfiles_usuario WHERE user_id = auth.uid()
    )
  );

-- Política: Solo el autor puede eliminar
CREATE POLICY "Autor can delete noticias_maestros"
  ON noticias_maestros FOR DELETE
  USING (
    autor_id IN (
      SELECT id FROM perfiles_usuario WHERE user_id = auth.uid()
    )
  );

-- ============================================
-- TABLA: calificaciones
-- ============================================
CREATE TABLE calificaciones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  estudiante_id UUID NOT NULL,
  estudiante_nombre TEXT NOT NULL,
  materia TEXT NOT NULL,
  calificacion DECIMAL(4,2) NOT NULL CHECK (calificacion >= 0 AND calificacion <= 100),
  periodo TEXT NOT NULL,
  observaciones TEXT,
  maestro_id UUID REFERENCES perfiles_usuario(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Habilitar Row Level Security
ALTER TABLE calificaciones ENABLE ROW LEVEL SECURITY;

-- Política: Lectura - todos los usuarios autenticados
CREATE POLICY "Authenticated users can view calificaciones"
  ON calificaciones FOR SELECT
  USING (auth.role() = 'authenticated');

-- Política: Solo maestros pueden insertar
CREATE POLICY "Maestros can insert calificaciones"
  ON calificaciones FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM perfiles_usuario
      WHERE user_id = auth.uid() AND rol = 'maestro'
    )
  );

-- Política: Solo el maestro autor puede actualizar
CREATE POLICY "Maestro autor can update calificaciones"
  ON calificaciones FOR UPDATE
  USING (
    maestro_id IN (
      SELECT id FROM perfiles_usuario WHERE user_id = auth.uid()
    )
  );

-- Política: Solo el maestro autor puede eliminar
CREATE POLICY "Maestro autor can delete calificaciones"
  ON calificaciones FOR DELETE
  USING (
    maestro_id IN (
      SELECT id FROM perfiles_usuario WHERE user_id = auth.uid()
    )
  );

-- ============================================
-- TABLA: estudiantes (catálogo de estudiantes)
-- ============================================
CREATE TABLE estudiantes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT,
  grado TEXT NOT NULL,
  grupo TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Habilitar Row Level Security
ALTER TABLE estudiantes ENABLE ROW LEVEL SECURITY;

-- Política: Solo usuarios autenticados pueden leer
CREATE POLICY "Authenticated users can view estudiantes"
  ON estudiantes FOR SELECT
  USING (auth.role() = 'authenticated');

-- Política: Solo administrativos pueden insertar
CREATE POLICY "Administrativos can insert estudiantes"
  ON estudiantes FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM perfiles_usuario
      WHERE user_id = auth.uid() AND rol = 'administrativo'
    )
  );

-- ============================================
-- TRIGGER: Crear perfil automáticamente al crear usuario
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.perfiles_usuario (user_id, email, nombre, rol)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nombre', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'rol', 'maestro')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- INDEX para mejor rendimiento
-- ============================================
CREATE INDEX idx_noticias_generales_fecha ON noticias_generales(fecha DESC);
CREATE INDEX idx_noticias_maestros_fecha ON noticias_maestros(fecha DESC);
CREATE INDEX idx_calificaciones_maestro ON calificaciones(maestro_id);
CREATE INDEX idx_calificaciones_estudiante ON calificaciones(estudiante_id);

-- ============================================
-- TABLA: eventos
-- ============================================
CREATE TABLE eventos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  fecha DATE NOT NULL,
  hora TEXT NOT NULL,
  lugar TEXT NOT NULL,
  categoria TEXT DEFAULT 'general' CHECK (categoria IN ('general', 'academico', 'cultural', 'deportivo')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Habilitar Row Level Security
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede leer eventos
CREATE POLICY "Anyone can view eventos"
  ON eventos FOR SELECT
  USING (true);

-- Política: Solo usuarios autenticados pueden insertar
CREATE POLICY "Authenticated users can insert eventos"
  ON eventos FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Política: Solo usuarios autenticados pueden actualizar
CREATE POLICY "Authenticated users can update eventos"
  ON eventos FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Política: Solo usuarios autenticados pueden eliminar
CREATE POLICY "Authenticated users can delete eventos"
  ON eventos FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- TABLA: galeria
-- ============================================
CREATE TABLE galeria (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  imagen TEXT NOT NULL,
  categoria TEXT DEFAULT 'actividades' CHECK (categoria IN ('instalaciones', 'actividades', 'eventos', 'graduaciones')),
  fecha DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Habilitar Row Level Security
ALTER TABLE galeria ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede leer galería
CREATE POLICY "Anyone can view galeria"
  ON galeria FOR SELECT
  USING (true);

-- Política: Solo usuarios autenticados pueden insertar
CREATE POLICY "Authenticated users can insert galeria"
  ON galeria FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Política: Solo usuarios autenticados pueden actualizar
CREATE POLICY "Authenticated users can update galeria"
  ON galeria FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Política: Solo usuarios autenticados pueden eliminar
CREATE POLICY "Authenticated users can delete galeria"
  ON galeria FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- TABLA: leads (contactos del chatbot)
-- ============================================
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT,
  telefono TEXT,
  email TEXT,
  motivo TEXT,
  mensaje TEXT,
  origen TEXT DEFAULT 'chatbot',
  estado TEXT DEFAULT 'nuevo' CHECK (estado IN ('nuevo', 'contactado', 'atendido', 'descartado')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Habilitar Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede leer leads (público para el chatbot)
CREATE POLICY "Anyone can view leads"
  ON leads FOR SELECT
  USING (true);

-- Política: Cualquiera puede insertar leads (público para el chatbot)
CREATE POLICY "Anyone can insert leads"
  ON leads FOR INSERT
  WITH CHECK (true);

-- Política: Solo usuarios autenticados pueden actualizar
CREATE POLICY "Authenticated users can update leads"
  ON leads FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Política: Solo usuarios autenticados pueden eliminar
CREATE POLICY "Authenticated users can delete leads"
  ON leads FOR DELETE
  USING (auth.role() = 'authenticated');
```

### 1.4 Configurar Autenticación

1. En Supabase Dashboard, ve a **Authentication** > **Settings**
2. Configura los ajustes de email:
   - **Site URL**: La URL de tu sitio (ej: `http://localhost:3000`)
   - **Redirect URLs**: Añade las URLs de producción
3. Ve a **Users** y crea un usuario administrador

---

## 2. Datos de Prueba (Opcional)

Ejecuta este SQL para agregar datos de prueba:

```sql
-- Insertar noticias de prueba
INSERT INTO noticias (titulo, contenido, fecha, imagen, publicada, autor) VALUES
('Inscripciones abiertas para el año escolar 2026', 'Nos complace anunciar que las inscripciones para el próximo año escolar ya están abiertas. Nuestro equipo está listo para recibir a nuevas familias.', '2026-03-15', '/images/frente.webp', true, 'Dirección'),
('Feria de Ciencias 2026', 'Los alumnos de todos los niveles展示arán sus proyectos de investigación en nuestra feria anual de ciencias.', '2026-03-10', '/images/1.jpg', true, 'Coordinación Académica'),
('Nuevo laboratorio de computación', 'Inauguramos nuestro nuevo laboratorio de computación con equipos de última generación.', '2026-03-05', '/images/frente.webp', true, 'Dirección');

-- Insertar eventos de prueba
INSERT INTO eventos (titulo, descripcion, fecha, hora, lugar, categoria) VALUES
('Reunión de padres de familia', 'Reunión general para informar sobre el avance académico del primer trimestre.', '2026-04-05', '10:00', 'Auditorio principal', 'general'),
('Día del alumno', 'Celebración especial en honor a nuestros queridos alumnos.', '2026-04-21', '09:00', 'Patio central', 'cultural'),
('Exámenes parciales - Secundaria', 'Período de exámenes parciales para estudiantes de secundaria.', '2026-04-15', '08:00', 'Salones designados', 'academico');

-- Insertar imágenes de galería
INSERT INTO galeria (titulo, imagen, categoria, fecha) VALUES
('Fachada del Instituto Sur', '/images/frente.webp', 'instalaciones', '2026-01-15'),
('Actividades deportivas', '/images/1.jpg', 'actividades', '2026-02-20');
```

---

## 3. Despliegue en Vercel (Recomendado)

### 3.1 Preparar el Proyecto

1. Sube el proyecto a GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
gh repo create instituto-sur --public --push
```

### 3.2 Desplegar en Vercel

1. Ve a [https://vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Click en **Add New Project**
4. Selecciona el repositorio `instituto-sur`
5. Configura las variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL` = tu URL de Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = tu anon key
6. Click en **Deploy**

### 3.3 Configurar Dominio Personalizado (Opcional)

1. En Vercel Dashboard, ve a **Settings** > **Domains**
2. Añade tu dominio (ej: `institutosur.edu`)
3. Configura los registros DNS según las instrucciones de Vercel

---

## 4. Alternativas de Hosting

### 4.1 Netlify

1. Conecta tu repositorio GitHub
2. Configura:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
3. Añade las variables de entorno en **Environment Variables**

### 4.2 Railway

1. Crea nuevo proyecto
2. Selecciona **Deploy from GitHub repo**
3. Configura las variables de entorno

### 4.3 Docker + VPS

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 5. Checklist Post-Despliegue

- [ ] Variables de entorno configuradas en el hosting
- [ ] Tablas creadas en Supabase
- [ ] Usuario admin creado en Authentication
- [ ] Políticas RLS configuradas
- [ ] Datos de prueba insertados
- [ ] SSL habilitado (automático en Vercel/Netlify)
- [ ] Prueba de login en `/admin`
- [ ] Prueba de CRUD en noticias, eventos y galería
- [ ] Verificar que las imágenes se muestran correctamente

---

## 6. Seguridad

- **Nunca** expongas la `service_role` key en el frontend
- Usa **RLS (Row Level Security)** en todas las tablas
- Configura **CORS** en Supabase si es necesario
- Mantén las dependencias actualizadas
- Usa HTTPS siempre

---

## 7. Soporte

Si tienes problemas:

1. Revisa la consola del navegador (F12)
2. Verifica las variables de entorno en Vercel/hosting
3. Revisa los logs de Supabase en el dashboard
4. Verifica que las políticas RLS están correctamente configuradas
