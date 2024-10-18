const readline = require("readline");

function verificaFechamento(expressao) {
  let pilha = [];

  const aberturas = {
    "(": ")",
    "[": "]",
    "{": "}"
  };

  for (let i = 0; i < expressao.length; i++) {
    const caractere = expressao[i];

    if (aberturas[caractere]) {
      pilha.push(caractere);
    } 
    else if (caractere === ")" || caractere === "]" || caractere === "}") {
      if (pilha.length === 0 || aberturas[pilha.pop()] !== caractere) {
        return false;
      }
    }
  }

  return pilha.length === 0;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Digite uma expressão com parênteses, colchetes e chaves: ", (expressao) => {
  const resultado = verificaFechamento(expressao);
  console.log(resultado);  
  rl.close();
});
