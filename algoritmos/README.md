# Laboratorio de algoritmos en JavaScript

Ejemplos originales de algoritmos y estructuras de datos para aprender ingeniería de software. Cada archivo exporta una función o clase reutilizable, no requiere paquetes externos y evita mutar la entrada salvo que su API indique lo contrario.

## Empezar

Requiere Node.js 22 o superior.

```bash
node --input-type=module -e "import { fibonacci } from './algoritmos/fibonacci.mjs'; console.log(fibonacci(10).toString())"
npm test
```

Los resultados enteros de factorial, Fibonacci, MCD y MCM utilizan `BigInt`, para evitar pérdida silenciosa de precisión. Los métodos de búsqueda binaria presuponen datos ordenados; los algoritmos de grafos requieren vértices y adyacencias según su documentación.

## Nuevos módulos de estudio

La segunda serie amplía el laboratorio con 18 implementaciones nuevas, cubiertas por cinco archivos adicionales de pruebas y comprobaciones de propiedades.

### Matemática discreta y polinomios

- `power-bigint.mjs`: exponenciación entera por cuadrados.
- `modular-power.mjs`: potencia modular para números grandes.
- `extended-gcd.mjs`: coeficientes de la identidad de Bézout.
- `prime-factors.mjs`: factorización prima por división.
- `binomial.mjs`: coeficientes binomiales exactos.
- `horner.mjs`: evaluación eficiente de polinomios.

### Arrays y búsquedas

- `prefix-sums.mjs`: sumas prefijas y consultas por rangos.
- `two-sum.mjs`: búsqueda de pares mediante mapa hash.
- `lower-bound.mjs` y `upper-bound.mjs`: límites sobre arreglos ordenados.
- `rotate-array.mjs`: rotación no destructiva.
- `unique-sorted.mjs`: reducción de duplicados consecutivos.

### Grafos y expresiones

- `connected-components.mjs`: componentes en grafo no dirigido.
- `shortest-unweighted-path.mjs`: reconstrucción de rutas BFS.
- `directed-cycle.mjs`: detección iterativa de ciclos dirigidos.
- `bellman-ford.mjs`: rutas con pesos negativos y detección de ciclos negativos alcanzables.
- `kruskal.mjs`: bosque de expansión mínima.
- `balanced-brackets.mjs`: validación de delimitadores anidados.

`npm test` ejecuta tanto la batería anterior como los archivos `scripts/algorithms-number-theory.test.mjs`, `scripts/algorithms-arrays.test.mjs`, `scripts/algorithms-graphs.test.mjs`, `scripts/algorithms-expressions.test.mjs` y `scripts/algorithms-properties.test.mjs`.

**Limitaciones:** los grafos usan `Map` y estructuras de adyacencia concretas; las entradas se consideran pertenecientes a los dominios especificados por sus funciones. Los resultados matemáticos enteros pueden usar `BigInt`, que no se mezcla implícitamente con `Number`. Las variantes de camino mínimo se eligen según los pesos permitidos.

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
