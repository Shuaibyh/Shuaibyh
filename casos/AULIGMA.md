# Caso de estudio: AULIGMA

**Categoría:** plataforma educativa Full Stack y experimentación con IA local  
**Repositorio:** [Shuaibyh/auligma](https://github.com/Shuaibyh/auligma)  
**Situación:** desarrollo y validación local; no se presenta como sistema productivo desplegado.

## 1. Problema

Un docente universitario necesita administrar aulas, planificar contenidos, crear preguntas relacionadas con una materia y evaluar a estudiantes autorizados. Un prototipo visual resuelve la exploración del flujo, pero no es suficiente para proteger identidad, respuestas y notas académicas.

El proyecto comenzó como interfaz demostrativa y evolucionó hacia una arquitectura que distingue claramente datos simulados, identidad institucional y operaciones persistentes.

## 2. Restricciones de diseño

- Existen dos perfiles funcionales: **Docente** y **Estudiante**; no se añade un rol de grupos.
- Un aula, sus matrículas y sus evaluaciones no pueden quedar accesibles a otro docente por conocer una URL.
- El estudiante no debe recibir claves correctas ni explicaciones privadas antes de la política de liberación.
- La IA puede *proponer* ejercicios, pero no aprobarlos ni calificarlos de forma autónoma.
- Editar una pregunta publicada no debe cambiar retroactivamente lo que respondió un estudiante.

## 3. Solución técnica observada

| Decisión | Enfoque | Beneficio esperado |
| --- | --- | --- |
| Frontend y backend separados | React/TypeScript/Vite + Fastify | Separar presentación y reglas de negocio |
| Persistencia | PostgreSQL y migraciones Knex | Relaciones, transacciones e integridad histórica |
| Identidad | Google OIDC, sesiones del servidor y CSRF | Evitar que el cliente determine por sí mismo los permisos |
| Versionado | Revisiones inmutables de preguntas y evaluaciones | Conservar el contenido exacto de cada publicación |
| Intentos | Inicio, guardado y entrega idempotente | Reducir duplicados ante reconexión |
| Calificación | Backend y snapshots privados | No aceptar notas ni soluciones enviadas desde el navegador |
| IA local | Ollama (Qwen) y SymPy | Generación asistida con comprobación simbólica acotada |

### Flujo de una evaluación

1. El docente prepara o revisa preguntas en el aula autorizada.
2. Una revisión aprobada puede incorporarse a una práctica en borrador.
3. Al publicar se conserva una versión inmutable y su configuración.
4. El estudiante matriculado inicia un intento elegible; el servidor controla condiciones y tiempo.
5. Las respuestas se guardan con controles de versión y se entregan de forma idempotente.
6. La corrección oficial utiliza las versiones privadas publicadas.
7. El docente puede revisar casos indeterminados; se conserva historial de calificaciones.
8. El estudiante recibe únicamente la información permitida por las políticas de liberación.

El recorrido corresponde a los **Hitos 1–5 de la Fase 2.4**, integrados en el [PR #4](https://github.com/Shuaibyh/auligma/pull/4). No implica que se haya ejecutado un despliegue ni aplicado toda migración en un entorno productivo.

## 4. Un caso matemático que cambió el diseño

La documentación de IA local registra una derivada racional en la que dos alternativas aparentemente diferentes resultaron algebraicamente equivalentes. SymPy identificó ambas como correctas; esto invalida un ejercicio de **opción única** hasta corregirlo y volver a revisarlo.

El caso ilustra por qué un generador de preguntas no debe marcar automáticamente como válida una evaluación solo porque produce una respuesta plausible. SymPy verifica un conjunto delimitado de expresiones; funciones fuera de esa gramática o resultados no concluyentes exigen revisión docente.

[Detalle y mediciones de Fase 2.3.2](https://github.com/Shuaibyh/auligma/blob/main/docs/FASE_2_3_2.md)

## 5. Evidencia técnica y límites

- El cierre del PR #4 reporta **46/46 pruebas backend** y **55/55 E2E**, además de typecheck, lint y build aprobados. Son resultados registrados durante la preparación del cambio, no una nueva ejecución realizada al escribir este caso.
- La solución implementada de la Fase 2.4 llega hasta el Hito 5; **Hito 6 de QA y endurecimiento** sigue pendiente.
- Las notas de migración indican controles y autorizaciones por entorno. La fusión de un PR no aplica automáticamente migraciones locales.
- No se atribuye a Ollama la calificación de estudiantes, ni se afirma una capacidad universal de resolución matemática.

[Documentación del Hito 5](https://github.com/Shuaibyh/auligma/blob/main/docs/FASE_2_4_HITO_5.md) · [Arquitectura](https://github.com/Shuaibyh/auligma/blob/main/docs/ARQUITECTURA.md)

## 6. Lección que me llevo

En una plataforma educativa, la trazabilidad de las preguntas, la autorización real en backend y el tratamiento explícito de resultados matemáticos indeterminados son tan importantes como la experiencia visual. El alcance debe permanecer visible: implementación local validada no equivale a servicio listo para instituciones.

[Índice del portafolio](../PORTAFOLIO.md) · [Perfil](../README.md)
