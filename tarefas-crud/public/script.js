const API_URL = "http://localhost:3000/tasks"; // URL da API

// Seletores
const taskList = document.getElementById("task-list");
const createTaskBtn = document.getElementById("create-task-btn");
const taskTitleInput = document.getElementById("task-title");
const taskDescInput = document.getElementById("task-desc");

// Função para carregar as tarefas
async function loadTasks() {
  taskList.innerHTML = ""; // Limpa a lista
  const response = await fetch(API_URL);
  const tasks = await response.json();

  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className = `task ${task.completed ? "completed" : ""}`;
    taskElement.innerHTML = `
            <div>
                <strong>${task.title}</strong>
                <p>${task.description}</p>
            </div>
            <div>
                <button onclick="toggleTask(${task.id}, ${task.completed})">
                    ${task.completed ? "Desfazer" : "Completar"}
                </button>
                <button onclick="deleteTask(${task.id})">Excluir</button>
            </div>
        `;
    taskList.appendChild(taskElement);
  });
}

// Função para criar uma nova tarefa
async function createTask() {
  const title = taskTitleInput.value;
  const description = taskDescInput.value;

  if (!title || !description) {
    alert("Título e descrição são obrigatórios!");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });

  taskTitleInput.value = "";
  taskDescInput.value = "";
  loadTasks();
}

// Função para alternar o estado de uma tarefa (completa/incompleta)
async function toggleTask(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !completed }),
  });

  loadTasks();
}

// Função para excluir uma tarefa
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTasks();
}

// Event listener para criar uma tarefa
createTaskBtn.addEventListener("click", createTask);

// Carregar tarefas ao abrir a página
loadTasks();
