const readline = require("readline");

function tabuada(n, i = 1) {
  if (i > 10) {
    return "";
  }
  return `${n} x ${i} = ${n * i}\n` + tabuada(n, i + 1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Digite um número para calcular a tabuada: ", (n) => {
  const resultado = tabuada(parseInt(n));
  console.log(resultado);
  rl.close();
});
