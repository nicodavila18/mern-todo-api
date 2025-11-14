const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definimos el esquema para nuestras tareas
const TareaSchema = new Schema({
  titulo: {
    type: String,
    required: true // El título será obligatorio
  },
  descripcion: {
    type: String,
    required: false // La descripción será opcional
  },
  estado: {
    type: Boolean,
    default: false // Por defecto, una tarea nueva estará "pendiente" (false)
  },
  fechaCreacion: {
    type: Date,
    default: Date.now // Guarda la fecha exacta de creación
  }
});

// Creamos el modelo a partir del esquema y lo exportamos
// Mongoose, por detrás, creará una colección llamada "tareas" (plural minúscula)
module.exports = mongoose.model('Tarea', TareaSchema);