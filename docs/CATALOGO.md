# Catálogo verificable del portafolio

El archivo [`data/projects.json`](../data/projects.json) mantiene un inventario estructurado de los proyectos públicos que se describen en [PORTAFOLIO.md](../PORTAFOLIO.md). Su propósito es facilitar la revisión y detectar inconsistencias de forma temprana; **no es un API pública ni una fuente automática de datos de GitHub**.

## Estados

| Valor | Significado | No significa |
| --- | --- | --- |
| `developing` | Desarrollo en progreso sin demostración pública confirmada | Que sea productivo o estable |
| `prototype` | Prototipo funcional con limitaciones explícitas | Que sea apto para datos reales |
| `public-demo` | Existe una demostración o sitio público enlazado | Que tenga backend, pagos, seguridad institucional o certificación |

Un proyecto puede tener una web publicada sin convertirse por eso en una aplicación lista para producción. El campo `demo` identifica una URL visible; no afirma que todos los flujos estén operativos.

## Campos requeridos

| Campo | Uso |
| --- | --- |
| `id` | Identificador corto, minúsculas y guiones |
| `name` | Nombre mostrado en el portafolio |
| `repository` | URL HTTPS pública del repositorio de Shuaibyh |
| `status` | Uno de los tres estados anteriores |
| `summary` | Descripción breve, sin funciones inventadas |
| `technologies` | Herramientas constatadas en el proyecto; sin duplicados |
| `demo` | URL HTTPS cuando corresponde o `null` |
| `case_study` | Documento existente dentro de `casos/` |
| `evidence` | Uno o más enlaces públicos a evidencia de GitHub |

El campo de versión `schema_version` permite detectar cambios incompatibles; la versión soportada actualmente es `1`.

## Validación

Desde la raíz del repositorio, con Node.js 22 o posterior:

```bash
npm run check:catalog
npm run check:links
npm run test
npm run check
```

No se necesita `npm install`: las herramientas utilizan exclusivamente módulos estándar de Node.js.

El validador [`scripts/check-project-catalog.mjs`](../scripts/check-project-catalog.mjs):

- Verifica estructura básica, campos obligatorios, estados permitidos y enlaces HTTPS con formato válido.
- Detecta identificadores o repositorios duplicados.
- Comprueba que el estudio de caso local existe.
- Rechaza referencias ascendentes fuera de `casos/`.
- Exige evidencia con URL HTTPS de GitHub.

**Límites:** no visita ni confirma la existencia en tiempo real de las URLs externas, no evalúa la validez de una tecnología declarada ni certifica la preparación para producción. Los casos deben revisarse editorialmente frente al repositorio original. La herramienta no debe presentarse como un auditor de seguridad.

Las pruebas [`check-project-catalog.test.mjs`](../scripts/check-project-catalog.test.mjs) emplean registros sintéticos y una carpeta temporal; no modifican los repositorios de los proyectos.

## Cómo actualizar un proyecto

1. Verificar la información nueva en README, código, pruebas o documentación del repositorio.
2. Modificar el registro pertinente de `data/projects.json` sin inventar estados o tecnologías.
3. Mantener consistente la descripción en `PORTAFOLIO.md` y su estudio de caso.
4. Ejecutar `npm run check`.
5. Revisar manualmente los enlaces externos y la redacción.
6. Crear un commit que describa la actualización real.

GitHub Actions vuelve a ejecutar las comprobaciones cuando cambian el catálogo, la documentación, las pruebas, el validador o la configuración pertinente.

[Guía de mantenimiento](../CONTRIBUTING.md) · [Regresar al perfil](../README.md)
