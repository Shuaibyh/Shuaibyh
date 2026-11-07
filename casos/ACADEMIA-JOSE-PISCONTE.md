# Caso de estudio: Academia José Pisconte

**Tipo de trabajo:** prototipo Full Stack de gestión académica  
**Código:** [Shuaibyh/academia-jose-pisconte](https://github.com/Shuaibyh/academia-jose-pisconte)  
**Estado comprobable:** en desarrollo; **no es un sistema listo para producción** ni se declara plataforma oficial de una institución.

## 1. Problema y alcance

El proyecto explora cómo centralizar procesos académicos que habitualmente se encuentran separados: registro de estudiantes, cursos, matrículas, materiales, anuncios, actividades, entregas y asistencia.

La intención técnica es conectar una interfaz de administración y consulta con servicios de negocio y persistencia relacional. Se trata de una **demo funcional en evolución**, no de un producto institucional con seguridad validada.

## 2. Arquitectura inicial

```text
React 18 + Vite 8
  └─ Cliente HTTP / interfaz
        └─ API REST de Spring Boot 3.3 / Java 21
              ├─ Controladores y servicios
              ├─ Spring Data JPA y validaciones
              └─ PostgreSQL 16 + migraciones Flyway
```

El repositorio mantiene frontend y backend en carpetas separadas y utiliza Docker Compose para disponer de PostgreSQL en desarrollo. El almacenamiento de archivos cargados es local y configurable.

## 3. Flujos que la documentación identifica como implementaciones iniciales

| Área | Comportamiento documentado | Precaución |
| --- | --- | --- |
| Identidad | Inicio de sesión demostrativo con roles | Contraseñas en texto plano; no usar con cuentas reales |
| Matrículas | Consulta, registro y edición de estudiantes, cursos y matrículas | Falta autorización robusta por endpoint |
| Aula virtual | Materiales, lecciones, actividades y entregas de archivos | Requiere controles de acceso y retención |
| Comunicación | Creación, edición y eliminación de comunicados | Falta una batería de pruebas propias |
| Seguimiento | Asistencia, progreso y calificaciones básicas | No equivale a analítica académica avanzada |

Estas afirmaciones se limitan a las funciones descritas en el [README del repositorio](https://github.com/Shuaibyh/academia-jose-pisconte/blob/main/README.md). No son una nueva auditoría de código ni una nueva ejecución de pruebas.

## 4. Decisiones y riesgos que importan

**Separación de responsabilidades.** El frontend consume la API y no debería decidir permisos por sí solo. La base relacional conserva entidades académicas y sus relaciones.

**No confundir demo con autenticación real.** El estado actual documenta comparación de contraseñas en texto plano y ausencia de protección robusta de endpoints. La siguiente fase debe introducir almacenamiento seguro de contraseñas, sesiones o tokens adecuados y autorización por rol desde el backend.

**Seguridad de archivos.** La carga local permite probar el recorrido, pero antes de un despliegue necesita validación de contenido y tamaño, almacenamiento privado, políticas de eliminación y protección frente a datos personales.

**Pruebas y cambios controlados.** Actualmente no se declara una suite automatizada propia. El roadmap pide empezar por validaciones, pruebas unitarias, integración con una base aislada y recorridos críticos.

**IA como visión futura.** El reconocimiento de ejercicios fotografiados, la retroalimentación multimodal y el tutor inteligente están planificados; **no se consideran funciones existentes**.

## 5. Cómo inspeccionarlo sin desplegar

Los requisitos y pasos de ejecución están explicados en el README. Para una revisión estática del frontend, el repositorio propone:

```bash
git clone https://github.com/Shuaibyh/academia-jose-pisconte.git
cd academia-jose-pisconte/frontend
npm ci
npm run lint
npm run build
```

Esto no inicia PostgreSQL ni instala datos institucionales. No se afirma que dichos comandos se hayan ejecutado nuevamente al redactar este estudio.

Para inspeccionar la API, revisar `backend/src/main/java/` y las migraciones en `backend/src/main/resources/`; cualquier prueba con base de datos debe realizarse con credenciales de desarrollo y datos sintéticos.

## 6. Qué falta antes de pensar en producción

1. Autenticación y autorización seguras.
2. Pruebas automatizadas y verificación de integración.
3. Controles de archivo, privacidad y almacenamiento.
4. Revisión responsive y accesibilidad.
5. Observabilidad, backups y proceso de despliegue.

El [ROADMAP](https://github.com/Shuaibyh/academia-jose-pisconte/blob/main/ROADMAP.md) clasifica estas tareas por prioridad.

## 7. Aprendizaje técnico

Un proyecto Full Stack no queda listo solo porque pueda mostrar formularios y persistir registros. Para manejar información académica, la protección del servidor, las pruebas y la privacidad son requisitos fundamentales, no detalles posteriores.

[Volver a los estudios de caso](../PORTAFOLIO.md) · [Perfil](../README.md)
