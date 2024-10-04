const readline = require("readline");

function contarVogais(str) {
  if (str === "") {
    return 0;
  }
  const primeiraLetra = str.charAt(0);
  const vogais = "aeiouAEIOU";
  if (vogais.includes(primeiraLetra)) {
    return 1 + contarVogais(str.substr(1));
  }
  return contarVogais(str.substr(1));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Digite uma string para contar as vogais: ", (str) => {
  const resultado = contarVogais(str);
  console.log(resultado);
  rl.close();
});
