const Joi = require("joi");

const TaskSchema = Joi.object({
  id: Joi.number().integer().greater(0).optional(),
  nome: Joi.string().min(3).max(30).required(),
  priority: Joi.string().valid("Baixa", "Média", "Alta").required(),
}).with("nome", "priority");

module.exports = TaskSchema;
