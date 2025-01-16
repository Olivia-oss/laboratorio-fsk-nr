# Laboratorio

## Instrucciones:

1. Haz un clone de este repositorio.
2. Debes subir el repositorio a tu Github.
   - Se tomará en cuanta ir subiendo los cambios a medida que vayas avanzando.
3. Crea un branch con la nomenclatura `lab/apellido` y hacer merge cuando este completo a la rama `main`.
4. Debes crear un backend en Node.js con Express y conexión a BDD mongoDB.
5. Debes crear un frontEnd en react o angular.
6. Debes crear una pequeña aplicación de pacientes.
7. Tienes 2 dias para entregar el laboratorio.
8. Enviar el link del repositorio al correo: `andres.sosa@albatrosservices.com`

## Criterios

1. Debes crear un CRUD de pacientes con express y mongoDB.
2. Debes crear un formulario para agregar/editar/borrar pacientes.m (FrontEnd)
Campos de un paciente:
- id
- Nombre
- Apellido
- Fecha de nacimiento
- Dirección
- Teléfonos (pueden ser varios teléfonos)
- Emails (puedes ser varios emails)

3. Debes crear un CRUD para síntomas.
Campos de un síntoma:
- id
- Nombre
- Descripción

4. Debes crear endpoint(s) para poder relacionar pacientes con síntomas.

5. UI: 
- Crear una página de login.
- Validar si tiene login para poder acceder a la pantalla de pacientes.
- En Backend al momento de hacer login debe validar si el usuario existe (como un usuario admin), generar un token y devolverlo al frontEnd

## Cadena de conexión a la BDD 
Toma en cuenta que el nombre de la base de datos debe ser su apellido
En la cadena de conexión después del /<apellido>

Ejemplo: (si mi apellido es sosa)

`Cadena de conexión a la BDD: mongodb+srv://developer:E79TGSMIcGY81IYV@test-database.2n2x7.mongodb.net/sosa?retryWrites=true&w=majority&appName=test-database`

