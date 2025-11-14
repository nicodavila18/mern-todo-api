// Esperamos a que todo el contenido del HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

  // --- REFERENCIAS A LOS ELEMENTOS DEL DOM ---
  const formulario = document.getElementById('formulario-tarea');
  const inputTitulo = document.getElementById('titulo-tarea');
  const inputDescripcion = document.getElementById('descripcion-tarea');
  const listaTareas = document.getElementById('lista-tareas');

  // Definimos la URL de nuestra API
  const API_URL = '/api/tareas';

  // --- FUNCIÓN PARA OBTENER Y MOSTRAR LAS TAREAS (READ) ---
  async function obtenerTareas() {
    try {
      // 1. Hacemos una petición GET a nuestra API
      const respuesta = await fetch(API_URL);
      const tareas = await respuesta.json();

      // 2. Limpiamos la lista actual
      listaTareas.innerHTML = '';

      // 3. Si no hay tareas, mostramos un mensaje
      if (tareas.length === 0) {
        listaTareas.innerHTML = '<p class="text-gray-500">No hay tareas pendientes.</p>';
        return;
      }

      // 4. Creamos y añadimos cada tarea al HTML
      tareas.forEach(tarea => {
        const elementoTarea = document.createElement('div');
        elementoTarea.className = `p-4 border rounded-md flex justify-between items-center ${tarea.estado ? 'bg-gray-200 line-through' : 'bg-white'}`;
        
        elementoTarea.innerHTML = `
          <div>
            <h3 class="font-semibold">${tarea.titulo}</h3>
            <p class="text-sm text-gray-600">${tarea.descripcion || ''}</p>
          </div>
          <div>
            <button class="text-green-500 hover:text-green-700 mr-2" onclick="marcarCompletada('${tarea._id}', ${!tarea.estado})">
              ${tarea.estado ? 'Desmarcar' : 'Completar'}
            </button>
            <button class="text-red-500 hover:text-red-700" onclick="eliminarTarea('${tarea._id}')">
              Eliminar
            </button>
          </div>
        `;
        listaTareas.appendChild(elementoTarea);
      });

    } catch (error) {
      console.error('Error al obtener tareas:', error);
      listaTareas.innerHTML = '<p class="text-red-500">Error al cargar las tareas.</p>';
    }
  }

  // --- FUNCIÓN PARA CREAR UNA NUEVA TAREA (CREATE) ---
  formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitamos que el formulario recargue la página

    const titulo = inputTitulo.value;
    const descripcion = inputDescripcion.value;

    if (!titulo) {
      alert('El título es obligatorio');
      return;
    }

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, descripcion }),
      });

      // Limpiamos el formulario y recargamos la lista
      inputTitulo.value = '';
      inputDescripcion.value = '';
      obtenerTareas(); // Volvemos a cargar las tareas

    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  });

  // --- FUNCIONES PARA ACTUALIZAR Y BORRAR (Necesitan ser globales) ---
  
  // (UPDATE)
  window.marcarCompletada = async (id, estado) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: estado })
      });
      obtenerTareas(); // Recargamos la lista
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  // (DELETE)
  window.eliminarTarea = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      return; // Si el usuario cancela, no hacemos nada
    }
    
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      obtenerTareas(); // Recargamos la lista
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };


  // --- CARGA INICIAL ---
  // Llamamos a la función por primera vez para cargar todo
  obtenerTareas();
});