const express = require("express");
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

// Configurando o motor de templates Mustache
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", "./views");

// Middleware
app.use(express.urlencoded({ extended: true })); // Para lidar com dados de formulários
app.use(cookieParser());
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Rota / - Exibe o formulário
app.get("/", (req, res) => {
  const userName = req.session.userName;
  res.render("index", { userName });
});

// Rota /salvauser - Salva o nome na sessão
app.post("/salvauser", (req, res) => {
  req.session.userName = req.body.userName;
  res.redirect("/");
});

// Rota /random - Gera um número aleatório e armazena no cookie
app.get("/random", (req, res) => {
  let randomNum = req.cookies.randomNum;

  if (!randomNum) {
    randomNum = Math.floor(Math.random() * 100) + 1;
    res.cookie("randomNum", randomNum);
  }

  res.send(`Número aleatório gerado: ${randomNum}`);
});

// Contadores
let totalRequests = 0;

app.use((req, res, next) => {
  totalRequests++;
  next();
});

// Rota /contador - Contagem de acessos
app.get("/contador", (req, res) => {
  const userRequests = req.session.userRequests || 0;
  req.session.userRequests = userRequests + 1;

  res.send(
    `Total de acessos no servidor: ${totalRequests}<br>Seu total de acessos: ${req.session.userRequests}`
  );
});

// Sistema de tarefas
let tasks = [];

function checkAuth(req, res, next) {
  if (!req.session.userName) {
    return res.redirect("/login");
  }
  next();
}

// Rota /tasks - Exibe tarefas
app.get("/tasks", checkAuth, (req, res) => {
  res.send(`
    <h1>Tarefas</h1>
    <ul>
      ${tasks.map((task) => `<li>${task}</li>`).join("")}
    </ul>
    <form action="/tasks" method="post">
      <input type="text" name="task" placeholder="Nova tarefa" required>
      <button type="submit">Adicionar Tarefa</button>
    </form>
  `);
});

// Rota /tasks - Adiciona tarefa (somente se o usuário estiver logado)
app.post("/tasks", checkAuth, (req, res) => {
  const task = req.body.task;
  tasks.push(task);
  res.redirect("/tasks");
});

// Rota /login - Exibe formulário de login
app.get("/login", (req, res) => {
  res.render("login");
});

// Rota /login - Salva login na sessão
app.post("/login", (req, res) => {
  req.session.userName = req.body.userName;
  res.redirect("/tasks");
});

// Rota /logout - Remove o usuário da sessão
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
