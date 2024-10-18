const readline = require("readline");
const { calcularMediaIdade } = require("./questao9.js");

const { ordenarPorAtributo } = require("./questão10.js");

const nomes = [
  "Paul",
  "Paulo",
  "Maria",
  "José",
  "João",
  "Pedro",
  "Lucas",
  "Mateus",
  "Marcos",
  "Luciana",
];

function gerarIdadeAleatoria() {
  return Math.floor(Math.random() * (90 - 18 + 1)) + 18;
}

function gerarObjetos(n) {
  let listaObjetos = [];

  for (let i = 0; i < n; i++) {
    const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
    const idadeAleatoria = gerarIdadeAleatoria();

    listaObjetos.push({
      id: i + 1,
      nome: nomeAleatorio,
      idade: idadeAleatoria,
    });
  }

  //chamando questao 9
  calcularMediaIdade(listaObjetos);

  //chamando questao 10
  ordenarPorAtributo(listaObjetos, "nome");
  ordenarPorAtributo(listaObjetos, "idade");
  ordenarPorAtributo(listaObjetos, "id");
  return listaObjetos;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Digite um número para gerar a lista de objetos: ", (n) => {
  const resultado = gerarObjetos(parseInt(n));
  console.log(resultado);
  rl.close();
});
