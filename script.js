const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const exportBtn = document.getElementById('exportBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = taskInput.value.trim();

  if (newTask === '') {
    alert('⚠️ La tarea no puede estar vacía.');
    return;
  }

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = '';

  setTimeout(() => {
    alert('✅ Tarea guardada exitosamente.');
  }, 500);
});

exportBtn.addEventListener('click', () => {
  const json = JSON.stringify(tasks, null, 2);
  console.log(json);
  alert('📤 Datos export')})



//sugerir usuarios
const sugerirBtn = document.getElementById('sugerirBtn');
const sugerenciasContainer = document.getElementById('sugerenciasContainer');

sugerirBtn.addEventListener('click', sugerirUsuarios);

function sugerirUsuarios() {
  sugerenciasContainer.innerHTML = '<p>Cargando usuarios...</p>';

  fetch('https://randomuser.me/api/?results=5')
    .then(res => res.json())
    .then(data => {
      sugerenciasContainer.innerHTML = ''; // Limpiar antes de mostrar

      data.results.forEach(usuario => {
        const nombre = `${usuario.name.first} ${usuario.name.last}`;
        const email = usuario.email;
        const imagen = usuario.picture.medium;

        const card = document.createElement('div');
        card.className = 'usuario-card';
        card.innerHTML = `
          <img src="${imagen}" alt="${nombre}" />
          <h3>${nombre}</h3>
          <p>${email}</p>
        `;
        sugerenciasContainer.appendChild(card);
      });
    })
    .catch(err => {
      sugerenciasContainer.innerHTML = '<p>Error al cargar usuarios.</p>';
      console.error('Error:', err);
    });
}

//frases motivadoras
const frases = [
  "🌟 Cree en ti y todo será posible.",
  "🚀 El éxito es la suma de pequeños esfuerzos repetidos cada día.",
  "🔥 No esperes el momento perfecto, haz que el momento sea perfecto.",
  "💡 La motivación te impulsa, el hábito te mantiene.",
  "🎯 La disciplina es el puente entre metas y logros.",
  "🌈 Cada día es una nueva oportunidad para mejorar."
];

const fraseMotivacional = document.getElementById('fraseMotivacional');

function mostrarFraseAleatoria() {
  const index = Math.floor(Math.random() * frases.length);
  fraseMotivacional.textContent = frases[index];
}

// Mostrar una frase al cargar
mostrarFraseAleatoria();

// Mostrar una nueva frase cada 30 segundos
setInterval(mostrarFraseAleatoria, 30000);
