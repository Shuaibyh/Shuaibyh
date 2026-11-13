# Laboratorio de algoritmos en JavaScript

Ejemplos originales de algoritmos y estructuras de datos para aprender ingeniería de software. Cada archivo exporta una función o clase reutilizable, no requiere paquetes externos y evita mutar la entrada salvo que su API indique lo contrario.

## Empezar

Requiere Node.js 22 o superior.

```bash
node --input-type=module -e "import { fibonacci } from './algoritmos/fibonacci.mjs'; console.log(fibonacci(10).toString())"
npm test
```

Los resultados enteros de factorial, Fibonacci, MCD y MCM utilizan `BigInt`, para evitar pérdida silenciosa de precisión. Los métodos de búsqueda binaria presuponen datos ordenados; los algoritmos de grafos requieren vértices y adyacencias según su documentación.

## Contenido

| Familia | Ejercicios |
| --- | --- |
| Matemática discreta | Factorial, Fibonacci, MCD, MCM, primalidad y criba |
| Búsqueda y ordenamiento | Búsquedas lineal/binaria; inserción, mezcla, rápida, heap, burbuja y selección |
| Estructuras de datos | Pila, cola, lista enlazada y conjuntos disjuntos |
| Grafos | BFS, DFS, Dijkstra y ordenamiento topológico |
| Programación dinámica | Mochila 0/1, subsecuencia común y distancia de edición |
| Álgebra computacional | Producto de matrices y derivada de polinomios |

Estos archivos son ejercicios educativos, no implementaciones optimizadas para todos los casos de producción. Las pruebas de regresión viven en `scripts/algorithms.test.mjs`, ejecutadas por `npm test`.

## Principios

- Contratos explícitos y entradas validadas.
- Pruebas de casos límite y de ejemplos representativos.
- Sin dependencias de terceros, red ni acceso a credenciales.
- Código pequeño y fácil de estudiar, con complejidades indicadas en los comentarios.
