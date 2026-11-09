# Exportaciones y métricas del portafolio

El catálogo público se mantiene en [`data/projects.json`](../data/projects.json). Los comandos de exportación y análisis permiten reutilizar esos registros en documentos, presentaciones o revisiones de un CV sin copiar manualmente las fichas.

## Requisitos

Node.js 22 o posterior. Las herramientas no requieren dependencias npm ni acceso a internet.

## Exportar el catálogo

Desde la raíz del repositorio:

```bash
node scripts/export-projects.mjs --format csv
node scripts/export-projects.mjs --format md
node scripts/export-projects.mjs --format json
```

El formato predeterminado es `csv`. Las tres opciones imprimen el resultado en la terminal; **no crean ni sobrescriben archivos por sí mismas**. Para guardar una copia local puedes redirigir la salida a un archivo elegido:

```bash
node scripts/export-projects.mjs --format csv > proyectos.csv
```

El CSV contiene nombre, estado, repositorio, demostración, tecnologías y estudio de caso; separa tecnologías con punto y coma. Los campos con comas, comillas o saltos de línea se escapan conforme al formato CSV. Si un campo comienza con caracteres que podrían evaluarse como fórmula en una hoja de cálculo, se antepone una comilla simple como mitigación.

La exportación Markdown ofrece una tabla de cuatro columnas para compartir; la salida JSON conserva los campos públicos esenciales. La herramienta no consulta GitHub ni transforma un prototipo en un proyecto productivo.

## Resumen estadístico

```bash
node scripts/project-stats.mjs
```

El informe cuenta proyectos, demostraciones enlazadas, estados y presencia de tecnologías. Una tecnología repetida en un mismo proyecto se cuenta una sola vez.

**Interpretación:** estas son estadísticas de los **proyectos documentados** en este repositorio, no métricas de experiencia profesional, uso real, reclutamiento ni actividad histórica de GitHub.

## Validación

```bash
npm run test
npm run check:catalog
npm run check:sync
```

Las pruebas usan registros sintéticos y no envían datos a servicios externos.

## Buenas prácticas

1. Verificar nombres y estados en el repositorio de origen antes de actualizar el JSON.
2. No introducir detalles comerciales no confirmados ni información de estudiantes.
3. Revisar los archivos exportados antes de adjuntarlos a un CV o enviarlos a terceros.
4. No abrir archivos CSV de procedencia desconocida con macros habilitadas; el escape implementado es solo una mitigación parcial contra fórmulas.
5. Registrar cambios sustantivos sin modificar retroactivamente el significado de pruebas históricas.

[Catálogo](CATALOGO.md) · [Perfil](../README.md)
