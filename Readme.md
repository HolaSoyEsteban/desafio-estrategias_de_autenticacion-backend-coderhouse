## Desafío Estrategias de Autenticación

### Descripción

En este desafío, se busca mejorar el sistema de autenticación del entregable anterior, incorporando nuevas estrategias de autenticación y seguridad.

### Requerimientos

- Implementar el hash de contraseñas utilizando la librería `bcrypt`.
- Utilizar `passport` para implementar la autenticación en las rutas de registro y login.
- Agregar la opción de autenticación con GitHub en la vista de login.

### Testeo

- Al ejecutar el proyecto, este deberá iniciar en la pantalla de login.
- Si el usuario no está registrado, podrá hacer clic en el enlace "Regístrate" para ser redirigido a la pantalla de registro.
- Al registrarse con los datos solicitados, se verificará que la contraseña almacenada en la base de datos esté correctamente hasheada.
- Se realizará el proceso de login utilizando las mismas credenciales utilizadas durante el registro, asegurándose de que el login funcione correctamente y redirija al área principal del sitio.
- Además, la pantalla de login deberá contar con un botón "Entrar con Github", que al hacer clic permita ingresar directamente a la página con los datos obtenidos de GitHub.
- Se verificará en la base de datos que el nuevo usuario "creado con Github" tenga un campo de contraseña vacío.

#### Nota: Se utiliza la librería bcryptjs en lugar de bcrypt debido a cuestiones de compatibilidad con la versión actualizada de Node.js