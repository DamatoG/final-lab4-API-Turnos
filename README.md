Endpoints API

**1. Obtener todos los turnos de un empleado**

  - **Descripción:** Este endpoint devuelve todos los turnos agendados para un empleado, opcionalmente filtrados por fecha.
  
  - **URL:** GET /api/v1/turnos/:idEmpleado
  
  - **Parámetros de ruta:** idEmpleado (integer) - ID del empleado.
  
  - **Parámetros de consulta opcionales:** fecha (string) - Fecha en formato "YYYY-MM-DD" para filtrar los turnos por día.
  


**2. Obtener los horarios disponibles para un empleado en una fecha específica**
  
  - **Descripción:** Este endpoint devuelve los horarios disponibles para un empleado en una fecha específica, basado en los turnos ya agendados.
  
  - **URL:** GET /api/v1/turnos/libres/:idEmpleado
  
  - **Parámetros de ruta: idEmpleado (integer)** - ID del empleado.
  
  - **Parámetros de consulta requeridos: fecha (string)** - Fecha en formato "YYYY-MM-DD" para la cual se desean obtener los horarios disponibles.

 **3. Obtener todos los empleados**
- **Descripción:** Este endpoint devuelve la lista de todos los empleados registrados.

- **URL:** GET /api/v1/empleados

- Respuesta exitosa (200 OK): Lista de objetos JSON con la información de cada empleado.
