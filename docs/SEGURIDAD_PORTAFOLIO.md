# Seguridad y privacidad de este portafolio

Este repositorio es público. Todos sus archivos versionados deben considerarse visibles para terceros y pueden permanecer en el historial incluso después de editar o borrar el contenido actual.

## Datos que no deben publicarse

- Contraseñas, tokens, cookies de sesión, claves privadas, archivos `.env` ni datos de acceso.
- Identificadores personales, registros de estudiantes, calificaciones o materiales académicos privados.
- Direcciones de domicilios particulares, teléfonos de terceros o documentación sin consentimiento.
- Fotografías, logos o recursos multimedia que no se tenga derecho a compartir.

Los problemas de seguridad de **AULIGMA** y otras aplicaciones enlazadas deben reportarse en sus repositorios respectivos. No copies aquí información sensible para ilustrarlos.

## Si se expone un secreto accidentalmente

1. No reproducir el valor completo en un issue o captura pública.
2. Revocar o desactivar inmediatamente la credencial en el proveedor correspondiente.
3. Generar credenciales nuevas y revisar dónde se utilizó la anterior.
4. Investigar si hubo acceso no autorizado y aplicar las medidas necesarias.
5. Corregir archivos y flujos de trabajo; tener en cuenta que un commit anterior puede seguir conteniendo la credencial.

El script `check-public-secrets.mjs` detecta algunos patrones típicos sin imprimir el valor capturado. **No ofrece cobertura universal**; las revisiones humanas siguen siendo necesarias.

## Servidor de vista previa

`npm run preview` crea un servidor HTTP de solo lectura en `127.0.0.1:4173`. Sirve un conjunto limitado de archivos públicos para examinar la vista web. No se debe exponer su puerto en Internet o usarlo como servidor de producción.

El navegador solo consulta `data/projects.json` para mostrar proyectos. No se recopilan formularios, contraseñas, ubicaciones ni estadísticas de visitantes.

## Reportar un problema

Los errores corrientes de documentación pueden registrarse en los templates de issues. Si detectas una vulnerabilidad con impacto real o una credencial expuesta, **no adjuntes el secreto ni instrucciones sensibles a un issue público**. Utiliza un canal privado de contacto con el mantenedor o el mecanismo de reporte privado de GitHub cuando esté habilitado.

## Alcance de los controles

Las comprobaciones de URLs, imágenes, HTML y patrones de secretos sirven como prevención, no como auditoría independiente de seguridad. Una ejecución de GitHub Actions en verde acredita únicamente los controles ejecutados en ese commit.

[Guía de calidad](CALIDAD.md) · [Contribuir](../CONTRIBUTING.md) · [Perfil](../README.md)
