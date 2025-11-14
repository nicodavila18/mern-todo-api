// 1. Importaciones
const express = require('express');
const mongoose = require('mongoose'); // Importamos mongoose
require('dotenv').config(); // Importamos y configuramos dotenv
const Tarea = require('./models/tarea'); // Importamos nuestro modelo

// 2. Crear una instancia de Express
const app = express();

// Esto le dice a Express que interprete el cuerpo (body) de las peticiones POST/PUT como JSON
app.use(express.json());

// Servir archivos estáticos
// Esto le dice a Express que use la carpeta 'public' para servir archivos
app.use(express.static('public'));

// 3. Definir el puerto
const PUERTO = process.env.PORT || 5000; // Usamos el puerto de .env o el 5000


// 4. Conexión a la Base de Datos (¡NUEVO!)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Base de datos conectada exitosamente');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });

// RUTA POST: Crear una nueva tarea (CREATE)
app.post('/api/tareas', async (req, res) => {
  try {
    // req.body contiene los datos JSON que envía el cliente (ej. el título)
    const nuevaTarea = new Tarea({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion
    });

    // Guardamos la tarea en la base de datos
    const tareaGuardada = await nuevaTarea.save();

    // Respondemos al cliente con la tarea recién creada (y un código 201: Creado)
    res.status(201).json(tareaGuardada);

  } catch (error) {
    // Si hay un error (ej. el título no se incluyó)
    res.status(400).json({ message: error.message });
  }
});

// RUTA GET: Obtener todas las tareas (READ)
app.get('/api/tareas', async (req, res) => {
  try {
    // Busca TODOS los documentos en la colección "Tarea"
    const tareas = await Tarea.find();
    
    // Responde con la lista de tareas en formato JSON
    res.status(200).json(tareas);

  } catch (error) {
    res.status(500).json({ message: error.message }); // 500 = Error interno del servidor
  }
});

// RUTA PUT: Actualizar una tarea existente (UPDATE)
// Usamos ':id' para capturar un parámetro dinámico de la URL
app.put('/api/tareas/:id', async (req, res) => {
  try {
    // 1. Encontrar la tarea por su ID
    // req.params.id extrae el ID que viene en la URL
    const tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    // 2. Actualizar los campos
    // req.body contendrá los campos que queremos cambiar (ej. "estado")
    if (req.body.titulo != null) {
      tarea.titulo = req.body.titulo;
    }
    if (req.body.descripcion != null) {
      tarea.descripcion = req.body.descripcion;
    }
    if (req.body.estado != null) {
      tarea.estado = req.body.estado;
    }

    // 3. Guardar la tarea actualizada
    const tareaActualizada = await tarea.save();
    res.status(200).json(tareaActualizada);

  } catch (error) {
    res.status(400).json({ message: error.message }); // 400 = Bad Request (ej. ID mal formado)
  }
});

// RUTA DELETE: Eliminar una tarea (DELETE)
app.delete('/api/tareas/:id', async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id);
    
    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    // Usamos el método 'deleteOne' (o 'findByIdAndDelete')
    await tarea.deleteOne();
    
    res.status(200).json({ message: 'Tarea eliminada exitosamente' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 6. Iniciar el servidor
app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});