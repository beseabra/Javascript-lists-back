const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.engine("mustache", mustacheExpress());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

app.get("/other/", (req, res) => {
  res.render("other", { title: "Other" });
});

app.get("/invert", (req, res) => {
  const text = req.query.text;
  const invertedText = text.split("").reverse().join("");
  res.send(`Texto invertido: ${invertedText}`);
});

app.post("/validate", (req, res) => {
  const { username, password } = req.body;

  if (password === username + username) {
    res.send(`Usuário ${username} possui permissão de acesso.`);
  } else {
    res.send(`Usuário ${username} não possui permissão de acesso.`);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
