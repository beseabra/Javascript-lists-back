const readline = require("readline");

function calcularMediaIdade(lista) {
  const somaIdades = lista.reduce((soma, pessoa) => soma + pessoa.idade, 0);
  const media = somaIdades / lista.length;

  console.log(`A média de idade é ${media}`);
  return media;
}

module.exports = { calcularMediaIdade };
