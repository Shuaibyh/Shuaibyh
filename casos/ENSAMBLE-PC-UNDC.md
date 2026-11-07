# Caso de estudio: Ensamble PC UNDC

**Categoría:** simulación educativa 3D en navegador  
**Repositorio:** [Shuaibyh/ensamble-pc-undc](https://github.com/Shuaibyh/ensamble-pc-undc)  
**Demostración pública:** [ensamble-pc-undc.netlify.app](https://ensamble-pc-undc.netlify.app/)

## 1. Problema

El ensamblaje físico de computadoras requiere acceso a piezas, herramientas y un entorno adecuado. Un recurso interactivo puede ayudar a practicar la identificación de componentes, su secuencia y la navegación espacial antes de trabajar con hardware real.

El reto no es solo cargar un modelo 3D: es coordinar **reglas de ensamblaje, estado de usuario, cámara, recursos gráficos y retroalimentación** sin que una escena bonita oculte el aprendizaje.

## 2. Arquitectura del proyecto

| Capa | Responsabilidad |
| --- | --- |
| React y TypeScript | Vistas, paneles y controles de navegación |
| Three.js, React Three Fiber y Drei | Escenas 3D, cámara e interacción |
| Catálogos de datos | Definición de piezas, rutas y configuración |
| Lógica de dominio | Reglas y validación de acciones |
| Estado local | Progreso didáctico en el navegador |
| Recursos GLB e imágenes | Modelos y apoyo visual, con atribuciones |

El repositorio separa `src/data`, `src/domain`, `src/features`, `src/scene` y `src/state`. Así, la escena representa el estado mientras que las reglas definen qué acciones son válidas.

## 3. Decisiones de implementación

### Recursos 3D y degradación visual

La documentación describe la integración de geometrías propias y modelos GLB. Ante un recurso que no carga, el sistema puede mostrar geometría provisional y advertencia en lugar de dejar una vista vacía. Esta estrategia hace más robusta la experiencia cuando hay archivos pesados, rutas rotas o modelos inválidos.

Un modelo que se ve bien tampoco es automáticamente apto para ensamblaje: hay que inspeccionar objetos separables, anclajes, orientación, escala, materiales y licencias.

### Progreso y ejercicios

El README registra recorridos guiados y de práctica, validaciones de orden y progreso local. El usuario puede explorar el modelo en tres dimensiones mientras el dominio determina la secuencia didáctica de colocación y conexiones.

### Tamaño de los recursos

El proyecto advierte sobre escenas con archivos GLB de aproximadamente 10–31 MiB. Por ello, un navegador compatible con WebGL 2 y una conexión adecuada mejoran la experiencia, aunque no eliminan la necesidad de probar cargas fallidas.

## 4. Cómo revisar

1. Abrir la [demo](https://ensamble-pc-undc.netlify.app/) en un navegador compatible.
2. Explorar las vistas y comprobar control orbital, zoom y enfoque.
3. Revisar el recorrido guiado y el modo práctica, incluyendo retroalimentación.
4. Inspeccionar el código de reglas en `src/domain/` y la representación en `src/scene/`.
5. Consultar licencias y atribuciones antes de reutilizar modelos.

En una copia local se pueden ejecutar los comandos documentados en el README:

```powershell
npm.cmd ci
npm.cmd run format:check
npm.cmd run lint
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
```

Estos comandos **no se ejecutaron nuevamente** para elaborar este caso; se incluyen como recorrido reproducible.

## 5. Limitaciones honestas

- No es un configurador que certifique compatibilidad eléctrica, térmica o dimensional de una PC real.
- Los recursos de terceros tienen licencias independientes que deben respetarse.
- El estado es local; no se afirma la existencia de backend ni recolección de datos personales.
- Las pruebas manuales de interacción y rendimiento en equipos reales son relevantes incluso si el build compila.

## 6. Lección que me llevo

Un simulador educativo funciona mejor cuando la lógica de dominio no depende del renderizado y cuando existen respuestas claras para fallos de recursos. La experiencia 3D debe apoyar el aprendizaje, no reemplazar la comprobación física.

[Guía de recursos 3D](https://github.com/Shuaibyh/ensamble-pc-undc/blob/main/docs/modelos.md) · [Créditos](https://github.com/Shuaibyh/ensamble-pc-undc/blob/main/docs/asset-credits.md) · [Portafolio](../PORTAFOLIO.md)
