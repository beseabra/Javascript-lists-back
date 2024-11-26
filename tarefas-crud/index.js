const express = require("express");
const app = express();
const port = 3000;

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json()); // Middleware para interpretar JSON no corpo das requisições

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

let tasks = []; // Armazena as tarefas em memória
let currentId = 1; // Controle de IDs únicos

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Título e descrição são obrigatórios." });
  }

  const newTask = {
    id: currentId++,
    title,
    description,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) {
    return res.status(404).json({ error: "Tarefa não encontrada." });
  }

  if (title) task.title = title;
  if (description) task.description = description;
  if (typeof completed === "boolean") task.completed = completed;

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarefa não encontrada." });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send(); // Responde sem conteúdo
});
