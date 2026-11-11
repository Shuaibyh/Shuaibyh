# Vista web del portafolio (demostración local)

Esta carpeta contiene una experiencia de consulta estática para los proyectos de [Shuaibyh](https://github.com/Shuaibyh). **No está desplegada públicamente** y no modifica las aplicaciones enlazadas.

## Ejecutar localmente

Se requiere Node.js 22 o posterior. Desde la raíz de este repositorio:

```bash
npm run preview
```

Abrir `http://127.0.0.1:4173/` en el navegador. El servidor se vincula únicamente a `127.0.0.1`, ofrece recursos concretos del portafolio y no envía datos ni realiza peticiones a aplicaciones externas para construir la lista.

El navegador carga `data/projects.json` mediante `fetch`. Por este motivo, abrir `index.html` directamente con una URL `file://` puede fallar debido a las restricciones del navegador.

## Interacciones disponibles

- Buscar proyectos por nombre, resumen o tecnología, sin distinguir tildes o mayúsculas.
- Filtrar por estado (desarrollo, prototipo o demostración pública).
- Filtrar por tecnología con recuentos por proyecto, evitando etiquetas duplicadas.
- Ordenar por nombre, por estado o conservar la selección editorial original.
- Reiniciar filtros y consultar enlaces a código, demostraciones y estudios de caso.
- Compartir búsquedas mediante los parámetros de URL `q`, `estado`, `tec` y `orden`.
- Navegar con teclado; los resultados usan estructura semántica y ofrecen mensajes de vacío y error.

## Arquitectura

```text
web/index.html        Estructura y controles accesibles
web/styles.css        Diseño adaptable, temas claro y oscuro
web/app.mjs           Carga de JSON y presentación con nodos DOM
web/project-search.mjs Búsqueda y filtros sin efectos secundarios
web/project-sort.mjs  Orden alfabético y por estado
web/technology-filters.mjs Opciones y recuentos de tecnologías
web/filter-url.mjs     Serialización y lectura de filtros de URL
web/project-view.mjs  Modelo de tarjeta y validación de URLs HTTPS
data/projects.json    Fuente de datos única para las tarjetas
scripts/serve-portfolio.mjs Servidor local de vista previa
```

Los contenidos dinámicos se insertan con `textContent`, no con `innerHTML`. Los estudios de caso locales usan rutas predecibles y el servidor impide servir enlaces simbólicos que salen del repositorio. Las URLs no HTTPS se descartan del modelo de tarjetas y los enlaces externos utilizan `noopener noreferrer`.

## Validaciones

```bash
npm run test
npm run check:web
npm run check
```

La auditoría estática comprueba identificadores esenciales, etiquetas y recursos básicos; **no** equivale a probar la experiencia en navegadores reales, lectores de pantalla ni dispositivos físicos.

## Límites

El sitio usa datos públicos ya documentados. No tiene autenticación, análisis de usuarios, formularios de contacto ni backend de negocio. Una demo pública no implica que su sistema de origen esté listo para producción.

[Catálogo](../docs/CATALOGO.md) · [Portafolio](../PORTAFOLIO.md) · [Perfil](../README.md)


## Ejemplo de consulta compartible

Una búsqueda por tecnología puede expresarse mediante una URL local como:

```text
http://127.0.0.1:4173/?tec=react&orden=name-asc#proyectos
```

La interfaz restaura filtros válidos al abrir el enlace. Las direcciones compartibles solo tienen sentido cuando cada persona puede iniciar su propia copia del servidor local; **no se ha publicado una web con dominio propio**.
