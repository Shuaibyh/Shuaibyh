# Control de calidad del portafolio

Esta guía documenta cómo se comprueba la **consistencia interna** del perfil público de GitHub. No se trata de una auditoría externa ni demuestra seguridad de las aplicaciones enlazadas.

## Alcance automatizado

El proyecto no requiere dependencias de terceros. Con Node.js 22 o posterior se puede ejecutar:

```bash
npm run check
```

El comando ejecuta primero las pruebas de los verificadores y luego las comprobaciones de archivos. Cada verificador también se puede ejecutar por separado.

| Comando | Qué revisa | Qué no comprueba |
| --- | --- | --- |
| `npm run test` | Casos de prueba sintéticos para las herramientas | Pruebas de las aplicaciones enlazadas |
| `npm run check:links` | Existencia de rutas relativas en archivos Markdown y salida del repositorio por symlinks | Disponibilidad de sitios externos |
| `npm run check:anchors` | Fragmentos a títulos e identificadores locales de archivos Markdown | Renderizado Markdown completo |
| `npm run check:catalog` | Campos, estados, unicidad y rutas de estudios en `data/projects.json` | Veracidad editorial de todas las afirmaciones |
| `npm run check:sync` | Concordancia entre filas principales del portafolio, catálogo y enlaces a estudios de caso | Coherencia total de descripciones y tecnologías |
| `npm run check:images` | Presencia de texto alternativo en imágenes Markdown y etiquetas `img` | Calidad semántica del texto alternativo o auditoría WCAG |
| `npm run check:secrets` | Patrones comunes de tokens o encabezados de claves privadas en documentos públicos | Todos los formatos posibles de secretos |

## Manejo de fallos

1. Revisar el mensaje de error; los verificadores señalan archivo, línea o nombre de proyecto cuando corresponde.
2. Corregir el origen, no suprimir la comprobación para pasar CI.
3. Si se mueve un estudio de caso, actualizar `data/projects.json` y las referencias en `PORTAFOLIO.md`.
4. Si se cambia un título, comprobar los enlaces con `#fragmento`.
5. Si se detecta una credencial real, **revocarla inmediatamente**, rotarla y revisar exposición histórica en Git; quitar el texto del archivo actual no revoca la credencial ni elimina el historial.
6. Repetir `npm run check` y comprobar la ejecución del flujo de GitHub Actions.

## Ejemplos de edición responsable

Cuando un proyecto pase de prototipo a demo pública, primero confirmar que su página está publicada y que el repositorio documenta el alcance. Después actualizar `data/projects.json`, el índice visible y el estudio de caso correspondiente.

Cuando se agregue una captura de pantalla, utilizar solo material autorizado o sintético, incluir una descripción alternativa y comprobar que no contenga datos personales en el propio contenido de la imagen. El verificador de imágenes solo inspecciona la marca Markdown y HTML, no el contenido visual.

Cuando se redacte un estudio, enlazar una fuente técnica del propio repositorio y distinguir entre **función implementada**, **resultado histórico de pruebas** y **trabajo planificado**.

## Ejecución continua

El flujo [Portfolio quality checks](../.github/workflows/docs-check.yml) ejecuta `npm run check` en cambios de Markdown, scripts, catálogo y configuración. Usa permisos de lectura sobre el repositorio; no despliega sitios, no genera commits por sí solo ni modifica AULIGMA u otras aplicaciones.

Las pruebas de los verificadores no dependen de las cuentas institucionales, bases de datos o credenciales de los proyectos enlazados.

## Límites explícitos

- Una ejecución verde solo significa que estas comprobaciones concretas terminaron satisfactoriamente en el commit validado.
- No hay comprobación periódica de enlaces externos, uso real de lectores de pantalla, métricas Core Web Vitals ni análisis dinámico de seguridad.
- El control de secretos es heurístico y no sustituye controles humanos de privacidad o revisión del historial de Git.
- Una demo disponible públicamente no implica que su backend, permisos o retención de datos estén preparados para producción.

[Catálogo](CATALOGO.md) · [Guía de mantenimiento](../CONTRIBUTING.md) · [Perfil](../README.md)
