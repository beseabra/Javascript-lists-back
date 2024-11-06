var express = require("express");
var Task = require("../model/Tasks");
var TaskSchema = require("../validators/TaskValidator");
const Joi = require("joi");
var router = express.Router();

// Rota para exibir a lista de tarefas em ordem alfabética
router.get("/tarefas", function (req, res) {
  const tasks = Task.list().sort((a, b) => a.name.localeCompare(b.name));
  res.render("tasks", { tasks });
});

// Rota para finalizar uma tarefa ao clicar no nome
router.get("/tarefas/complete/:id", function (req, res) {
  const { id } = req.params;
  Task.toggleComplete(parseInt(id));
  res.redirect("/tarefas");
});

// Rota para exibir o número de tarefas cadastradas
router.get("/tarefas/count", function (req, res) {
  const count = Task.list().length;
  res.render("taskCount", { count });
});

// Rota para adicionar ou atualizar uma tarefa com prioridade
router.post("/tarefas", function (req, res) {
  const { error, value } = TaskSchema.validate(req.body);
  if (error) {
    res.render("index", { tasks: Task.list(), erro: "Dados incompletos" });
    return;
  }

  const { id, name, priority } = value;
  if (id === undefined) {
    Task.new(name, priority);
  } else {
    Task.update(id, name, priority);
  }

  res.redirect("/tarefas");
});

module.exports = router;
