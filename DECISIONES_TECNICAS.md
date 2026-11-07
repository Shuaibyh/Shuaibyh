# Decisiones de ingeniería — notas del portafolio

Estas notas explican decisiones observables en mis repositorios públicos. No son una certificación de calidad ni una lista de funciones futuras presentadas como terminadas.

## 1. Separar prototipos de sistemas con identidad real

**Contexto:** una interfaz de demostración es útil para comprobar navegación, formularios y experiencias; no proporciona por sí misma seguridad.

**Aplicación en AULIGMA:**
- La demo conserva cuentas y datos sintéticos separados del entorno real.
- El entorno real usa Google OpenID Connect y sesiones administradas en backend.
- Los permisos se consultan con identidad, rol, propiedad del aula y matrícula, no solo con rutas del frontend.

**Aprendizaje:** una pantalla que oculta un botón no sustituye a la autorización en servidor. Un demo debe identificarse claramente para no utilizarlo con datos institucionales.

**Referencia:** [AULIGMA — arquitectura y autenticación](https://github.com/Shuaibyh/auligma/blob/main/docs/ARQUITECTURA.md).

## 2. Conservar la historia académica de una evaluación

**Contexto:** editar una pregunta después de que un estudiante responde no debe modificar retroactivamente aquello que vio.

**Aplicación en AULIGMA:**
- Se distingue el borrador editable de una revisión aprobada.
- La publicación utiliza versiones y composición inmutables.
- Los intentos y las calificaciones se vinculan a versiones para conservar trazabilidad.
- La IA propone contenido; la revisión docente sigue siendo necesaria.

**Aprendizaje:** la inmutabilidad y los registros de auditoría simplifican la explicación de resultados y evitan modificaciones silenciosas.

**Referencia:** [AULIGMA — plan Fase 2.4](https://github.com/Shuaibyh/auligma/blob/main/docs/FASE_2_4_PLAN.md).

## 3. Diseñar una experiencia 3D educativa como simulación, no como certificación

**Contexto:** un entorno 3D permite practicar secuencias de ensamblaje sin manipular componentes físicos.

**Aplicación en Ensamble PC UNDC:**
- React administra vistas y estado de interacción.
- Three.js y React Three Fiber representan escenas y piezas.
- Las acciones de ensamblaje se validan mediante reglas de dominio.
- El progreso local permite continuar en el mismo navegador.

**Límite deliberado:** la simulación no acredita que las piezas sean eléctricamente compatibles ni sustituye las medidas físicas y de seguridad.

**Referencia:** [Ensamble PC UNDC — README](https://github.com/Shuaibyh/ensamble-pc-undc/blob/main/README.md).

## 4. Publicar una landing útil sin inventar servicios comerciales

**Contexto:** el contenido de un sitio comercial necesita estar respaldado por información y medios autorizados.

**Aplicación en Don Emilio Restobar & Eventos:**
- Contenido y recursos visuales centralizados y revisables.
- Sitio estático con imágenes reales y galería accesible.
- Formulario que genera una consulta para copiar: no afirma enviar ni almacenar información.
- Verificaciones de build y exclusión de medios privados.

**Aprendizaje:** es preferible omitir precios, horarios o funcionalidades no confirmadas que convertir suposiciones en promesas públicas.

**Referencia:** [Don Emilio — README](https://github.com/Shuaibyh/don-emilio-restobar/blob/main/README.md).

## 5. Reconocer explícitamente la deuda técnica

**Contexto:** un prototipo académico puede ser útil sin estar preparado para uso institucional.

**Aplicación en Academia José Pisconte:**
- El repositorio separa funciones iniciales de la hoja de ruta.
- Documenta limitaciones de autenticación, autorización y pruebas.
- La IA multimodal se presenta como visión futura, no como capacidad ya entregada.

**Aprendizaje:** un portafolio técnico es más confiable cuando incluye límites, riesgos y trabajo por validar.

**Referencia:** [Academia José Pisconte — README](https://github.com/Shuaibyh/academia-jose-pisconte/blob/main/README.md).

---

Estas notas reúnen trabajo ya documentado. No implican cambios de implementación, migraciones ni despliegues.

[Portafolio](PORTAFOLIO.md) · [Volver al perfil](README.md)
