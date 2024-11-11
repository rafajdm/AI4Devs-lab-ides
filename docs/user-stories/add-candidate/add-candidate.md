# Añadir Candidato al Sistema

## Descripción
Como reclutador,
Quiero tener la capacidad de añadir candidatos al sistema ATS,
Para que pueda gestionar sus datos y procesos de selección de manera eficiente.

## Criterios de Aceptación

1. **Accesibilidad de la función**: Debe haber un botón o enlace claramente visible para añadir un nuevo candidato desde la página principal del dashboard del reclutador.
2. **Formulario de ingreso de datos**: Al seleccionar la opción de añadir candidato, se debe presentar un formulario que incluya los campos necesarios para capturar la información del candidato como nombre, apellido, correo electrónico, teléfono, dirección, educación y experiencia laboral.
3. **Validación de datos**: El formulario debe validar los datos ingresados para asegurar que son completos y correctos. Por ejemplo, el correo electrónico debe tener un formato válido y los campos obligatorios no deben estar vacíos.
4. **Carga de documentos**: El reclutador debe tener la opción de cargar el CV del candidato en formato PDF o DOCX.
5. **Confirmación de añadido**: Una vez completado el formulario y enviada la información, debe aparecer un mensaje de confirmación indicando que el candidato ha sido añadido exitosamente al sistema.
6. **Errores y manejo de excepciones**: En caso de error (por ejemplo, fallo en la conexión con el servidor), el sistema debe mostrar un mensaje adecuado al usuario para informarle del problema.
7. **Accesibilidad y compatibilidad**: La funcionalidad debe ser accesible y compatible con diferentes dispositivos y navegadores web.

## Notas

- La interfaz debe ser intuitiva y fácil de usar para minimizar el tiempo de entrenamiento necesario para los nuevos reclutadores.
- Considerar la posibilidad de integrar funcionalidades de autocompletado para los campos de educación y experiencia laboral, basados en datos preexistentes en el sistema.

## Tareas Técnicas

1. **Implementar la interfaz de usuario para el formulario de añadir candidato**:
   - Crear un nuevo componente `AddCandidateForm.tsx` en `frontend/src`.
   - Añadir un botón o enlace en el dashboard del reclutador (`Dashboard.tsx`) para abrir el formulario.
   - Diseñar el formulario con los campos necesarios: nombre, apellido, correo electrónico, teléfono, dirección, educación y experiencia laboral.
   - Implementar validaciones en el frontend para asegurar que los datos ingresados son correctos y completos.
   - Añadir funcionalidad para cargar documentos (CV en formato PDF o DOCX).
   - Mostrar un mensaje de confirmación una vez que el candidato ha sido añadido exitosamente.
   - Manejar y mostrar mensajes de error en caso de fallos.

2. **Desarrollar el backend necesario para procesar la información ingresada en el formulario**:
   - Crear un nuevo endpoint en el backend para recibir y procesar la información del formulario (`POST /api/candidates`).
   - Validar los datos recibidos en el backend para asegurar que son correctos y completos.
   - Guardar la información del candidato en la base de datos utilizando Prisma (`backend/prisma/schema.prisma`).
   - Implementar la lógica para manejar la carga de documentos y almacenarlos de manera segura.
   - Devolver una respuesta adecuada al frontend indicando el éxito o fallo de la operación.

3. **Asegurar la seguridad y privacidad de los datos del candidato**:
   - Implementar autenticación y autorización para asegurar que solo los usuarios autorizados pueden añadir candidatos.
   - Validar y sanitizar todos los datos recibidos para prevenir ataques de inyección.
   - Asegurar que los documentos cargados son almacenados de manera segura y accesibles solo para usuarios autorizados.
   - Implementar cifrado para datos sensibles como direcciones de correo electrónico y números de teléfono.
   - Asegurar que las conexiones entre el frontend y el backend utilizan HTTPS para proteger los datos en tránsito.