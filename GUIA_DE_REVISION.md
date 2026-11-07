# Guía para revisar mis proyectos

Esta guía está pensada para una persona que evalúa mi portafolio. Permite inspeccionar proyectos públicos sin confundir una demostración, una compilación o un test local con un sistema apto para producción.

> **Alcance:** instrucciones de lectura y verificación. Este documento no ejecuta pruebas, no modifica aplicaciones ni acredita validaciones recientes.

## Recorrido rápido (sin instalar nada)

| Proyecto | Primer paso | Qué observar | Advertencia |
| --- | --- | --- | --- |
| [Ensamble PC UNDC](https://ensamble-pc-undc.netlify.app/) | Abrir la demo | Recorrido guiado, interacción 3D y adaptación al tamaño de pantalla | Es un simulador didáctico; requiere WebGL |
| [Don Emilio](https://don-emilio-restobar.netlify.app/) | Abrir la web | Diseño responsive, galería, controles de teclado y formulario local | El formulario prepara un mensaje para copiar, no lo envía |
| [AULIGMA](https://github.com/Shuaibyh/auligma) | Leer README y docs | Arquitectura, roles, versiones de evaluaciones y pruebas documentadas | Sin despliegue público; pruebas reales requieren configuración privada |
| [Academia José Pisconte](https://github.com/Shuaibyh/academia-jose-pisconte) | Leer README y roadmap | Organización Full Stack y límites documentados | Prototipo con controles de seguridad pendientes |

## Revisión de código: pasos reproducibles

Trabaja con una copia local. Revisa primero los archivos README y package.json (o pom.xml) para confirmar versiones de herramientas. Los comandos siguientes están documentados en los repositorios correspondientes.

### Don Emilio Restobar & Eventos

Requisito indicado: Node.js 22 o posterior.

```bash
git clone https://github.com/Shuaibyh/don-emilio-restobar.git
cd don-emilio-restobar
npm ci
npm run lint
npm run typecheck
npm run test
npm run build
```

**Qué demuestra:** validación estática, pruebas existentes y capacidad de compilar el frontend. No valida por sí mismo los contenidos comerciales ni acredita aceptación de producción.

### Ensamble PC UNDC

Requisito indicado: Node.js 24 y navegador con WebGL 2 para uso interactivo.

```bash
git clone https://github.com/Shuaibyh/ensamble-pc-undc.git
cd ensamble-pc-undc
npm ci
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```

**Qué observar:** separación entre catálogo, reglas de dominio, estado y representación visual. Algunas escenas requieren descargar recursos 3D de tamaño considerable.

### AULIGMA

Requisito indicado: Node.js 24 LTS. Para usar los flujos reales hacen falta PostgreSQL y configuración de OAuth; el entorno demostrativo está separado.

```bash
git clone https://github.com/Shuaibyh/auligma.git
cd auligma
npm ci
npm run typecheck
npm run lint
npm run build
```

Los comandos anteriores revisan el código sin iniciar migraciones. **No ejecutar** `db:migrate` ni conectar identidades reales solo para inspeccionar el portafolio. Las pruebas de servidor y E2E requieren preparar sus entornos de forma independiente según la documentación del proyecto.

### Academia José Pisconte

Requisitos indicados: Java 21, Maven y Node.js para el frontend; PostgreSQL se configura aparte para ejecución completa.

```bash
git clone https://github.com/Shuaibyh/academia-jose-pisconte.git
cd academia-jose-pisconte/frontend
npm ci
npm run lint
npm run build
```

El backend usa Maven y Spring Boot, pero este repositorio sigue documentado como prototipo. No cargar datos personales o académicos reales y no interpretarlo como una aplicación institucional asegurada.

## Qué significan los resultados

- **Build correcto:** indica que el proceso de compilación terminó; no demuestra ausencia de errores funcionales.
- **Pruebas aprobadas:** acredita únicamente los casos automatizados que se ejecutaron y su entorno.
- **Demo publicada:** permite revisar la experiencia visible; no implica backend, almacenamiento o servicios comerciales.
- **Diseño responsive:** conviene revisarlo en escritorio y móvil, también con teclado y movimiento reducido.
- **Documentación de límites:** informa sobre funciones fuera de alcance y decisiones pendientes.

## Privacidad y uso responsable

No publicar secretos, tokens, archivos .env, nóminas estudiantiles, información privada ni material multimedia sin autorización. Para revisar los repositorios, utilizar datos sintéticos y las instrucciones de configuración contenidas en cada README.

[Portafolio](PORTAFOLIO.md) · [Decisiones técnicas](DECISIONES_TECNICAS.md) · [Volver al perfil](README.md)
