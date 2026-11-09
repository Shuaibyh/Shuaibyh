# Cómo mantener este portafolio

Este repositorio contiene la presentación pública de mis proyectos, sus estudios de caso y documentación asociada. Las contribuciones deben mejorar la exactitud, legibilidad o verificabilidad; **no se aceptan commits vacíos ni afirmaciones inventadas para aumentar el contador de actividad**.

## Alcance

- Corregir información obsoleta, enlaces, errores de redacción y accesibilidad del README.
- Documentar decisiones de proyectos **solo cuando exista evidencia** en el código o su documentación.
- Mejorar la navegación entre el perfil, la matriz de habilidades y los estudios de caso.
- Mantener el verificador de enlaces locales y sus pruebas.
- No incorporar secretos, archivos privados, listas de estudiantes, fotografías sin permiso ni datos personales de terceros.

## Validación local

Se requiere Node.js 22 o superior para ejecutar las herramientas del repositorio. No hay dependencias npm.

```bash
npm run test
npm run check:links
npm run check:anchors
npm run check:catalog
```

La primera orden ejecuta pruebas automáticas sobre casos sintéticos; la segunda recorre los archivos Markdown del repositorio y comprueba que los destinos de los **enlaces relativos** y recursos HTML locales existan.

Además de comprobar que existan los archivos enlazados, `npm run check:anchors` revisa que los fragmentos `#seccion` de enlaces Markdown locales correspondan a encabezados o identificadores HTML. Considera encabezados repetidos, títulos con tildes y fragmentos codificados. Es una comprobación estática aproximada del formato de anclas de GitHub, no un renderizador Markdown completo. **No comprueba** disponibilidad de URLs externas, anclas externas ni enlaces de referencia indirectos; tampoco sustituye una auditoría de accesibilidad o seguridad.

Un enlace local como `[Documento](PORTAFOLIO.md)` debe referirse a un archivo presente. Los enlaces a otros repositorios deben conservar su URL real, sin inventar demostraciones ni releases.

## Catálogo de proyectos y validación unificada

El índice de proyectos tiene una representación estructurada en [`data/projects.json`](data/projects.json). Si se incorpora o cambia un proyecto, revisar simultáneamente el catálogo, [`PORTAFOLIO.md`](PORTAFOLIO.md) y su estudio de caso. No marcar una aplicación como pública o productiva a partir de una intención de desarrollo.

Para ejecutar todas las pruebas y validaciones, desde la raíz con Node.js 22+:

```bash
npm run check
```

También están disponibles los controles individuales `npm run test`, `npm run check:links`, `npm run check:anchors`, `npm run check:catalog`, `npm run check:sync`, `npm run check:images` y `npm run check:secrets`. No requieren instalar dependencias externas. El validador comprueba formato de URLs, campos y estudios locales; **no comprueba que los enlaces remotos estén disponibles**. Véase la [guía del catálogo](docs/CATALOGO.md) para las reglas de estados y evidencia.

## Revisión de un cambio

Antes de fusionarlo:

1. Comprobar que el texto distingue **implementado**, **en desarrollo** y **planeado**.
2. Relacionar afirmaciones técnicas con documentos, commits o código verificables.
3. Asegurar que las rutas relativas sigan funcionando después de mover archivos.
4. Ejecutar `npm run check` y atender los errores de pruebas, enlaces, catálogo, imágenes y documentación.
5. Comprobar que las anclas Markdown continúan funcionando si se renombra algún título.
6. Revisar cómo se muestra el README en GitHub, tanto en pantalla pequeña como grande.
7. Si una prueba no se ha ejecutado, indicarlo; no afirmar un PASS por haber escrito la prueba.

## Estándares de redacción

- Escribir con claridad, preferentemente en español.
- Nombrar tecnologías solo cuando estén presentes o claramente identificadas como aprendizaje.
- Evitar prometer capacidades de producción a partir de prototipos o demos locales.
- No atribuir contratos comerciales, certificaciones o experiencias laborales no demostradas.
- Conservar derechos, créditos y límites de uso de materiales de terceros.

## Revisión de calidad ampliada

Antes de publicar cambios en el portafolio, ejecutar `npm run check`. Además de las comprobaciones anteriores, ahora hay tres controles nuevos:

- **Sincronización:** `npm run check:sync` compara el catálogo con las tablas de proyectos y casos del portafolio.
- **Accesibilidad editorial:** `npm run check:images` detecta imágenes sin descripción alternativa básica.
- **Exposición accidental:** `npm run check:secrets` identifica ciertos patrones de credenciales sin imprimir su valor.

La [guía de calidad](docs/CALIDAD.md) explica resultados, límites y acciones ante problemas. Los controles son estáticos: no evalúan la seguridad de los otros repositorios ni sustituyen el criterio humano. Si un token verdadero aparece en el historial de Git, debe revocarse y rotarse; corregir únicamente el archivo actual no elimina su exposición anterior.

## Automatización

[GitHub Actions](.github/workflows/docs-check.yml) ejecuta las pruebas de los verificadores y comprueba enlaces y datos del catálogo cuando cambian archivos pertinentes. La automatización no hace deploys, no modifica otros repositorios y no envía datos a servicios externos.

## Organización

- [README.md](README.md): presentación corta del perfil.
- [PORTAFOLIO.md](PORTAFOLIO.md): índice de proyectos y casos.
- [MATRIZ_DE_HABILIDADES.md](MATRIZ_DE_HABILIDADES.md): evidencia por tecnología.
- [DECISIONES_TECNICAS.md](DECISIONES_TECNICAS.md): decisiones de arquitectura.
- [GUIA_DE_REVISION.md](GUIA_DE_REVISION.md): pasos de inspección de proyectos.
- [casos/](casos/): análisis por proyecto.
- [data/projects.json](data/projects.json): catálogo de proyectos verificables.
- [docs/CATALOGO.md](docs/CATALOGO.md): definiciones de estado y mantenimiento del catálogo.
- [docs/CALIDAD.md](docs/CALIDAD.md): alcance y límites de las comprobaciones automáticas.
- [scripts/](scripts/): verificador y sus pruebas.

[Volver al perfil](README.md)
