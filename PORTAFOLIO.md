# Portafolio técnico — Brandon Sarmiento

Este índice reúne proyectos públicos con su alcance comprobable. Son trabajos de práctica, aprendizaje y desarrollo; la documentación distingue las funciones terminadas de las experimentales. **No implica que todos sean productos listos para producción ni trabajos contratados por terceros.**

## Proyectos seleccionados

| Proyecto | Qué resuelve | Tecnologías destacadas | Estado / acceso |
| --- | --- | --- | --- |
| [AULIGMA](https://github.com/Shuaibyh/auligma) | Gestión de aulas y actividades matemáticas, con revisión docente y soporte local de IA | React, TypeScript, Fastify, PostgreSQL, Ollama, SymPy | Desarrollo y validación local; no desplegado públicamente |
| [Ensamble PC UNDC](https://github.com/Shuaibyh/ensamble-pc-undc) | Simulador educativo de ensamblaje guiado de computadoras y dispositivos | React, TypeScript, Three.js, React Three Fiber | [Demo publicada](https://ensamble-pc-undc.netlify.app/) |
| [Don Emilio Restobar & Eventos](https://github.com/Shuaibyh/don-emilio-restobar) | Sitio informativo responsive para presentar un establecimiento, su espacio y eventos | React, TypeScript, Vite, Tailwind CSS | [Sitio publicado](https://don-emilio-restobar.netlify.app/) |
| [Academia José Pisconte](https://github.com/Shuaibyh/academia-jose-pisconte) | Prototipo de gestión académica con frontend, API y base de datos | React, Java 21, Spring Boot, PostgreSQL | En desarrollo; autenticación de demostración |

## Qué revisar en cada repositorio

### AULIGMA — arquitectura y reglas académicas

- Separación entre frontend demostrativo e identidad real mediante Google OpenID Connect.
- Matrículas y permisos controlados en backend.
- Borradores, versiones de preguntas y evaluaciones; publicación supervisada.
- IA ejecutada localmente con verificación matemática limitada a expresiones admitidas.
- **Límite:** la integración de fases y sus pruebas no equivale a despliegue productivo.

**Para profundizar:** [README](https://github.com/Shuaibyh/auligma/blob/main/README.md) · [Plan de Fase 2.4](https://github.com/Shuaibyh/auligma/blob/main/docs/FASE_2_4_PLAN.md).

### Ensamble PC UNDC — interacción 3D didáctica

- Escenas WebGL y manipulación de piezas con validaciones de secuencia.
- Modos guiados y de práctica, progreso local y adaptación a diferentes pantallas.
- **Límite:** el simulador no certifica compatibilidad física, térmica o eléctrica real.

**Para profundizar:** [README](https://github.com/Shuaibyh/ensamble-pc-undc/blob/main/README.md) · [Demo](https://ensamble-pc-undc.netlify.app/).

### Don Emilio — sitio público con medios auténticos

- Presentación editorial responsive, galería accesible y navegación móvil.
- Uso de fotografías y logotipo autorizados; manifiesto de activos y comprobaciones de build.
- Formulario local que prepara un mensaje copiable; **no** procesa pagos, reservas ni guarda consultas.
- **Límite:** la carta, precios y otros datos comerciales no se publican sin verificación.

**Para profundizar:** [README](https://github.com/Shuaibyh/don-emilio-restobar/blob/main/README.md) · [Demo](https://don-emilio-restobar.netlify.app/).

### Academia José Pisconte — prototipo Full Stack

- API Spring Boot, modelado y persistencia con PostgreSQL.
- Gestión académica inicial y aula virtual en evolución.
- **Límite:** requiere seguridad de autenticación y autorización, pruebas y mejoras UX antes de producción; las capacidades avanzadas de IA son futuras.

**Para profundizar:** [README](https://github.com/Shuaibyh/academia-jose-pisconte/blob/main/README.md) · [Roadmap](https://github.com/Shuaibyh/academia-jose-pisconte/blob/main/ROADMAP.md).

---

## Criterios de presentación

1. Priorizar enlaces a código y demostraciones reales.
2. Separar **implementado**, **experimental** y **planificado**.
3. Describir verificaciones sin convertirlas en garantías de calidad absoluta.
4. No publicar credenciales, datos institucionales, datos de estudiantes ni materiales privados.
5. Documentar aprendizajes y límites técnicos con la misma claridad que las funcionalidades.

[Volver al perfil](README.md) · [Todos los repositorios](https://github.com/Shuaibyh?tab=repositories)
