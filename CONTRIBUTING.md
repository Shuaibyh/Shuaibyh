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
node --test scripts/check-markdown-links.test.mjs
node scripts/check-markdown-links.mjs
```

La primera orden ejecuta pruebas automáticas sobre casos sintéticos; la segunda recorre los archivos Markdown del repositorio y comprueba que los destinos de los **enlaces relativos** y recursos HTML locales existan.

El control **no verifica** que una URL externa responda, ni que un ancla `#seccion` exista. No debe presentarse como auditoría completa de accesibilidad o seguridad.

Un enlace local como `[Documento](PORTAFOLIO.md)` debe referirse a un archivo presente. Los enlaces a otros repositorios deben conservar su URL real, sin inventar demostraciones ni releases.

## Revisión de un cambio

Antes de fusionarlo:

1. Comprobar que el texto distingue **implementado**, **en desarrollo** y **planeado**.
2. Relacionar afirmaciones técnicas con documentos, commits o código verificables.
3. Asegurar que las rutas relativas sigan funcionando después de mover archivos.
4. Ejecutar las dos comprobaciones anteriores y atender los errores.
5. Revisar cómo se muestra el README en GitHub, tanto en pantalla pequeña como grande.
6. Si una prueba no se ha ejecutado, indicarlo; no afirmar un PASS por haber escrito la prueba.

## Estándares de redacción

- Escribir con claridad, preferentemente en español.
- Nombrar tecnologías solo cuando estén presentes o claramente identificadas como aprendizaje.
- Evitar prometer capacidades de producción a partir de prototipos o demos locales.
- No atribuir contratos comerciales, certificaciones o experiencias laborales no demostradas.
- Conservar derechos, créditos y límites de uso de materiales de terceros.

## Automatización

[GitHub Actions](.github/workflows/docs-check.yml) ejecuta las pruebas del verificador y revisa los enlaces locales cuando cambian documentos o el propio checker. La automatización no hace deploys, no modifica otros repositorios y no envía datos a servicios externos.

## Organización

- [README.md](README.md): presentación corta del perfil.
- [PORTAFOLIO.md](PORTAFOLIO.md): índice de proyectos y casos.
- [MATRIZ_DE_HABILIDADES.md](MATRIZ_DE_HABILIDADES.md): evidencia por tecnología.
- [DECISIONES_TECNICAS.md](DECISIONES_TECNICAS.md): decisiones de arquitectura.
- [GUIA_DE_REVISION.md](GUIA_DE_REVISION.md): pasos de inspección de proyectos.
- [casos/](casos/): análisis por proyecto.
- [scripts/](scripts/): verificador y sus pruebas.

[Volver al perfil](README.md)
