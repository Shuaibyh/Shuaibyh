# Arquitectura del portafolio técnico

Este repositorio sirve como **presentación y evidencia** de proyectos públicos. No aloja el backend ni las credenciales de ninguna de las aplicaciones referenciadas.

## Componentes

```text
data/projects.json
   ├── scripts/check-project-catalog.mjs
   ├── scripts/check-portfolio-sync.mjs
   ├── scripts/project-stats.mjs
   ├── scripts/export-projects.mjs
   └── web/app.mjs
           ├── web/project-search.mjs
           ├── web/project-view.mjs
           ├── web/index.html
           └── web/styles.css

PORTAFOLIO.md ── estudios de caso en casos/
README.md     ── entrada desde GitHub
scripts/serve-portfolio.mjs ── vista previa de solo lectura en 127.0.0.1
```

## Decisiones

**Catálogo central.** `data/projects.json` define las fichas. `PORTAFOLIO.md` agrega interpretación editorial y enlaces a fuentes del proyecto. El comprobador de sincronización evita omisiones entre tabla, catálogo y casos.

**Interfaz sin backend.** La vista `web/` consulta el JSON local con `fetch`. La búsqueda, el filtrado y las fichas se generan en el navegador, sin cuentas, formularios ni telemetría. Los valores dinámicos se insertan como texto y los enlaces externos se limitan a HTTPS.

**Vista previa controlada.** El servidor de desarrollo usa exclusivamente `127.0.0.1` y restringe rutas a recursos de documentación y de la interfaz. No está destinado a exponer contenido en una red pública. No es una plataforma de autenticación ni una CDN.

**Pruebas.** Las utilidades `scripts/*.test.mjs` usan Node Test Runner, datos sintéticos y pruebas de loopback para las respuestas HTTP locales. La automatización ejecuta pruebas y comprobaciones estáticas sobre el repositorio.

## Qué está fuera de alcance

- Publicar la vista web en Internet o configurar GitHub Pages.
- Consultar dinámicamente cuentas de estudiantes, servicios de IA o sistemas externos.
- Garantizar accesibilidad WCAG a partir de un verificador basado en patrones.
- Certificar seguridad, rendimiento o estado de producción de los otros repositorios.
- Crear un registro artificial de actividad en GitHub.

## Cómo modificar el catálogo

Se recomienda primero actualizar los proyectos en `data/projects.json`, después sus casos de estudio y el índice `PORTAFOLIO.md`. Ejecutar `npm run check` y revisar el resultado de GitHub Actions antes de usarlo como evidencia de un cambio validado.

[Guía de exportación](EXPORTACIONES.md) · [Calidad](CALIDAD.md) · [Web local](../web/README.md)
