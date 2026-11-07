# Matriz de habilidades con evidencia de proyectos

Esta matriz ofrece una lectura verificable de las **tecnologías y prácticas presentes en mis proyectos públicos**. No pretende certificar experiencia profesional, años de dominio ni que todos los elementos hayan sido desarrollados desde cero o estén listos para producción.

## Desarrollo y arquitectura

| Área | Proyecto para revisar | Evidencia técnica | Alcance real |
| --- | --- | --- | --- |
| React y diseño de interfaces | [Don Emilio](https://github.com/Shuaibyh/don-emilio-restobar) | Componentes, secciones, estilos responsive y galería accesible | Landing publicada, sin backend |
| TypeScript y frontend estructurado | [AULIGMA](https://github.com/Shuaibyh/auligma) | React/Vite, componentes y rutas según rol | Prototipo + aplicación real local separada |
| Java y Spring Boot | [Academia José Pisconte](https://github.com/Shuaibyh/academia-jose-pisconte) | API REST, servicios, validaciones y persistencia JPA | Prototipo; seguridad incompleta |
| Node.js y Fastify | [AULIGMA](https://github.com/Shuaibyh/auligma) | Sesiones, contratos de API, autorización y pruebas de servidor | Implementación en desarrollo local |
| PostgreSQL y migraciones | [AULIGMA](https://github.com/Shuaibyh/auligma) / [Academia](https://github.com/Shuaibyh/academia-jose-pisconte) | Modelo relacional, Knex/Flyway, restricciones y documentación | Diferentes grados de madurez por proyecto |
| Gráficos 3D y WebGL | [Ensamble PC UNDC](https://github.com/Shuaibyh/ensamble-pc-undc) | Three.js, React Three Fiber, escenas y reglas de interacción | Simulación educativa, no validación física |
| IA local y matemáticas simbólicas | [AULIGMA](https://github.com/Shuaibyh/auligma) | Ollama/Qwen, propuestas supervisadas y SymPy | Verificación acotada; no tutor universal |
| Publicación de sitios estáticos | [Don Emilio](https://don-emilio-restobar.netlify.app/) / [Ensamble PC](https://ensamble-pc-undc.netlify.app/) | Demos públicas y configuración Netlify | No prueba operación de backend productivo |

## Calidad y colaboración

| Práctica | Ejemplo revisable | Qué se puede comprobar |
| --- | --- | --- |
| Pruebas de frontend | [QA de Don Emilio](https://github.com/Shuaibyh/don-emilio-restobar/blob/main/docs/QA.md) | Resultados históricos de Vitest, build, auditoría visual y distintos anchos |
| Pruebas backend y E2E | [Fase 2.4 de AULIGMA](https://github.com/Shuaibyh/auligma/pull/4) | Historial de implementación, documentación y verificaciones reportadas |
| Git y revisión de cambios | [PR #4 de AULIGMA](https://github.com/Shuaibyh/auligma/pull/4) | Integración de una rama de trabajo conservando los commits originales |
| Diseño accesible | [Don Emilio](https://github.com/Shuaibyh/don-emilio-restobar) | Navegación por teclado, foco, lightbox y movimiento reducido documentados |
| Gestión de recursos 3D | [Guía de modelos](https://github.com/Shuaibyh/ensamble-pc-undc/blob/main/docs/modelos.md) | Licencias, formato GLB, anclajes, fallbacks y criterios para exportación |
| Documentación técnica | [Estudios de caso](PORTAFOLIO.md) | Decisiones, restricciones y límites explicados junto al código |

## Diferenciar los niveles de evidencia

- **Código visible:** permite inspeccionar una implementación concreta, pero no demuestra por sí solo que funcione en cualquier entorno.
- **Pruebas registradas:** son evidencia de los casos y condiciones descritos al ejecutarlas; no una garantía global de ausencia de fallos.
- **Demo pública:** demuestra que hay una experiencia accesible, sin inferir características inexistentes.
- **Roadmap:** explica intención y prioridades; **no** constituye evidencia de una función terminada.
- **Experiencia profesional:** no se deduce automáticamente de tener un repositorio público.

## Cómo usar esta matriz al postular

La forma más precisa de presentar habilidades es conectar cada afirmación con un enlace concreto, una decisión explicable y los límites del proyecto.

Ejemplos de formulación responsable:

> "He trabajado con React y TypeScript en interfaces interactivas y con Fastify/PostgreSQL en un proyecto académico."

> "He desarrollado prácticas de visualización 3D con Three.js y React Three Fiber en un simulador educativo."

> "Estoy profundizando en seguridad de aplicaciones Java/Spring; un proyecto de práctica documenta lo que aún falta mejorar."

Evitar afirmar dominio experto, certificados no obtenidos, trabajo para clientes no confirmado o capacidades que todavía están en el roadmap.

[Portafolio](PORTAFOLIO.md) · [Decisiones técnicas](DECISIONES_TECNICAS.md) · [Guía de revisión](GUIA_DE_REVISION.md)
