* Gestor de Tareas Full-Stack (MERN)
Este proyecto es una aplicación web full-stack para la gestión de tareas. Fue desarrollado con el objetivo de dominar la creación de una API RESTful completa y entender el ciclo CRUD (Create, Read, Update, Delete) de principio a fin, conectando un backend de Node.js con un frontend de JavaScript vainilla.

Este es el primer proyecto de mi portafolio personal, enfocado en construir una base sólida en desarrollo backend.

* Características Principales
Crear (Create): Añadir nuevas tareas con título y descripción a través de un formulario.

Leer (Read): Ver la lista completa de tareas pendientes y completadas en tiempo real.

Actualizar (Update): Marcar tareas como "Completadas" o "Pendientes" con un solo clic.

Eliminar (Delete): Borrar tareas de la base de datos de forma permanente.

Interfaz de usuario simple y limpia construida con HTML, JavaScript y Tailwind CSS.

* Tecnologías Utilizadas
Backend: Node.js, Express.js

Base de Datos: MongoDB (con Mongoose y MongoDB Atlas)

Frontend: HTML5, CSS3, JavaScript (Vanilla JS, Fetch API)

Diseño: Tailwind CSS (via CDN)

Herramientas: Postman (para pruebas de API), Git & GitHub

* Endpoints de la API

La API RESTful sigue la siguiente estructura:

POST,/api/tareas,Crea una nueva tarea.
GET,/api/tareas,Obtiene la lista de todas las tareas.
PUT,/api/tareas/:id,Actualiza una tarea existente (ej. marcar como completada).
DELETE,/api/tareas/:id,Elimina una tarea por su ID.

* Instalación y Puesta en Marcha Local
1- Si deseas correr este proyecto en tu máquina local, sigue estos pasos:

Clona este repositorio: git clone https://github.com/nicodavila18/mern-todo-api

2- Instala las dependencias del servidor (Node.js):

npm install

3- Crea un archivo .env en la raíz del proyecto y añade tu cadena de conexión de MongoDB Atlas:

MONGO_URI=mongodb+srv://tu-usuario:tu-contraseña@tu-cluster...

4- Inicia el servidor backend:

node server.js

5- Abre tu navegador y ve a http://localhost:5000.

* Aprendizajes Clave

Configuración de un servidor backend desde cero con Express.

Modelado de datos y conexión a una base de datos NoSQL (MongoDB) con Mongoose.

Creación de una API RESTful completa siguiendo los principios CRUD.

Consumo de una API desde el frontend usando fetch() de JavaScript para crear una aplicación dinámica.

Gestión de dependencias del proyecto (npm) y variables de entorno (.env) para mantener la seguridad de las credenciales.