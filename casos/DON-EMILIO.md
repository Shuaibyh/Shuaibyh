# Caso de estudio: Don Emilio Restobar & Eventos

**Categoría:** sitio comercial responsive y frontend  
**Repositorio:** [Shuaibyh/don-emilio-restobar](https://github.com/Shuaibyh/don-emilio-restobar)  
**Sitio publicado:** [don-emilio-restobar.netlify.app](https://don-emilio-restobar.netlify.app/)

## 1. Contexto

El objetivo fue crear una presentación visual para un establecimiento real en Chincha, utilizando **medios auténticos** y evitando inventar información comercial. El sitio debía mostrar el espacio, bebidas y eventos, con navegación simple en móvil y escritorio.

No se diseñó una plataforma de reservas ni una tienda: el alcance es una landing informativa. Esta distinción condiciona el contenido, la interacción y las pruebas.

## 2. Enfoque técnico

| Área | Decisión |
| --- | --- |
| Aplicación | React 19 y TypeScript estricto |
| Estilos | Tailwind CSS 4, Fraunces y Manrope locales |
| Compilación | Vite 7 |
| Imágenes | Manifiesto explícito de medios y variantes responsive |
| Calidad | ESLint, TypeScript, Vitest y auditoría Chrome |
| Publicación | Netlify desde `main` |

El sitio separa contenido, componentes y secciones para poder corregir un dato sin reescribir toda la interfaz. El manifiesto de medios controla qué imágenes se permiten en el artefacto publicado.

## 3. Experiencia de usuario

- Hero con fotografía auténtica del jardín.
- Navegación sticky y menú móvil con control por teclado.
- Galería de siete escenas con lightbox, Escape, flechas y restauración de foco.
- Formulario de consulta que valida campos y prepara un **mensaje copiable**.
- Animaciones progresivas con respeto a `prefers-reduced-motion`.

**Aclaración funcional:** el formulario no envía mensajes, no ejecuta reservas y no almacena datos. Presentarlo como si hiciera esas acciones sería incorrecto.

## 4. Calidad y evidencia

En `docs/QA.md` quedaron registrados los siguientes resultados históricos de la versión V8:

| Comprobación | Resultado documentado |
| --- | --- |
| Lint, typecheck y build | PASS |
| Vitest | 5 pruebas en 2 archivos |
| Control de recursos compilados | 10 activos verificados |
| Auditoría Chrome | 360, 390, 768, 1024, 1280 y 1440 px |
| Navegación y galería | Menú, foco, Escape, flechas y anclas comprobados |
| Formulario | Campos obligatorios, copia y comportamiento de edición |
| Preferencias de movimiento | Variantes normal y reducida revisadas |

La documentación registra también una auditoría sobre el sitio público del 31 de octubre de 2026. **Estos datos proceden de pruebas históricas del repositorio; no representan una nueva medición ni un certificado de accesibilidad WCAG.**

[Reporte de QA](https://github.com/Shuaibyh/don-emilio-restobar/blob/main/docs/QA.md)

## 5. Control del contenido y privacidad

Una decisión central fue no publicar dirección exacta, horarios, precios, carta, aforo ni WhatsApp sin confirmación de la responsable del establecimiento.

Las fotografías y el logo conservan sus propias condiciones de uso. El control de build busca evitar referencias a archivos privados y coteja recursos contra el manifiesto autorizado. No convierte automáticamente la aprobación técnica en permiso publicitario.

## 6. Qué aprendí

En un sitio de negocio real, la calidad no termina cuando la interfaz funciona: la procedencia de las fotografías, la precisión del texto, las interacciones accesibles y la ausencia de promesas falsas son parte del producto.

La solución eligió un alcance estático y comprobable, en lugar de simular reservas o formularios que aparentemente envían información.

[README del proyecto](https://github.com/Shuaibyh/don-emilio-restobar/blob/main/README.md) · [Cierre V8](https://github.com/Shuaibyh/don-emilio-restobar/blob/main/docs/V8_FINAL.md) · [Portafolio](../PORTAFOLIO.md)
