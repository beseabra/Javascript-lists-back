const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 3000;
const SECRET_KEY = "your_secret_key";

app.use(cors());
app.use(bodyParser.json());

// Função para gerar uma mensagem aleatória
function generateRandomMessage() {
  const messages = [
    "Hello, world!",
    "Welcome to the API!",
    "Node.js is awesome!",
    "JWTs are great for auth!",
    "Enjoy coding!",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

// Rota 1: Gera um token JWT com uma mensagem aleatória
app.get("/generate-token", (req, res) => {
  const message = generateRandomMessage();
  const token = jwt.sign({ message }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

// Rota 2: Recebe um token por body e retorna a mensagem decodificada
app.post("/decode-token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: decoded.message });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
