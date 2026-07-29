# YouthDev 2026 - Plataforma de Desarrollo Personal

## 🚀 Descripción
Plataforma web dinámica para jóvenes universitarios que quieren conocer sus capacidades y competencias personales, basada en la Matriz 2.2 del reporte técnico.

## ✨ Características

- **Base de datos propia** (localStorage para demo, fácilmente migrable a SQLite/MySQL)
- **Multi-rol**: Administrador, Instructor y Participante
- **Flujo completo para participantes**:
  1. Página de metas y sueños (lenguaje joven)
  2. Test de 45 preguntas sobre 9 competencias
  3. Resultados comparativos vs Matriz 2.2/2.3
  4. Recomendaciones personalizadas (webs, apps, videos, trabajos)
- **Dashboard de Instructor**: Ve resultados de sus participantes
- **Dashboard de Admin**: Gestiona usuarios y base de datos

## 📁 Estructura

```
/workspace
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos personalizados
├── js/
│   └── app.js          # Lógica de la aplicación
└── data/               # (Opcional para exportaciones)
```

## 🔐 Credenciales Demo

| Rol | Usuario | Contraseña |
|-----|---------|------------|
| Admin | admin | admin123 |
| Instructor | instructor1 | inst123 |
| Participante | participa1 | part123 |

## 🌐 Cómo Usar en GitHub Pages

1. Sube estos archivos a tu repositorio GitHub
2. Ve a Settings > Pages
3. Activa GitHub Pages en la rama main
4. Tu sitio estará disponible en `https://tu-usuario.github.io/tu-repo/`

## 🎯 Funcionalidades Clave

### Para Participantes:
- **Metas**: Ingresa tus sueños, pasiones y metas de desarrollo
- **Selección de Rol**: Elige entre 8 roles de la Matriz 2.2
- **Selección de Instructor**: Asigna un instructor mentor
- **Test**: 45 preguntas (5 por cada competencia)
- **Resultados**: Gráfico radar comparativo + fortalezas + áreas a mejorar
- **Recomendaciones**: Plan de acción con recursos específicos

### Para Instructores:
- Ver lista de participantes asignados
- Consultar metas, fortalezas y áreas de mejora
- Acceder a recomendaciones generadas

### Para Administradores:
- Estadísticas de usuarios
- Agregar/eliminar usuarios
- Limpiar base de datos

## 🛠️ Tecnologías

- HTML5, CSS3, JavaScript (Vanilla)
- Bootstrap 5.3 (UI responsive)
- Chart.js (Gráficos radar)
- localStorage (Base de datos local)

## 📊 Competencias Evaluadas

1. Competencias Cognitivas
2. Competencias Sociales
3. Competencias Éticas
4. Liderazgo
5. Manejo de Crisis
6. Negociación
7. Resiliencia
8. Equilibrio Emocional
9. Análisis Estratégico

## 🎨 Diseño

- Interfaz moderna y dinámica
- Optimizada para jóvenes universitarios
- Totalmente responsive (móvil, tablet, desktop)
- Animaciones suaves y emojis para engagement
