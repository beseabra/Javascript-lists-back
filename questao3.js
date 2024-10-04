const readline = require("readline");

function calcula(n, m, operacao) {
  if (operacao === "+") {
    return n + m;
  }
  if (operacao === "-") {
    return n - m;
  }
  if (operacao === "*") {
    return n * m;
  }
  if (operacao === "/" && m !== 0) {
    return n / m;
  }
  return "Operação inválida";
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Digite o primeiro número: ", (n) => {
  rl.question("Digite o segundo número: ", (m) => {
    rl.question("Digite a operação (+, -, *, /): ", (operacao) => {
      const resultado = calcula(parseInt(n), parseInt(m), operacao);
      console.log(resultado);
      rl.close();
    });
  });
});
