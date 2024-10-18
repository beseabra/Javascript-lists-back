function ordenarPorAtributo(lista, atributo) {
  return lista.sort((a, b) => {
    if (a[atributo] < b[atributo]) {
      return -1;
    }
    if (a[atributo] > b[atributo]) {
      return 1;
    }
    return 0;
  });
}

const listaExemplo = [
  { id: 1, nome: "Paul", idade: 24 },
  { id: 2, nome: "Pedro", idade: 56 },
  { id: 3, nome: "Lucas", idade: 35 },
  { id: 4, nome: "Maria", idade: 48 },
  { id: 5, nome: "José", idade: 60 },
];

const listaOrdenadaPorNome = ordenarPorAtributo(listaExemplo, "nome");
console.log("Lista ordenada por nome:", listaOrdenadaPorNome);

const listaOrdenadaPorIdade = ordenarPorAtributo(listaExemplo, "idade");
console.log("Lista ordenada por idade:", listaOrdenadaPorIdade);

const listaOrdenadaPorId = ordenarPorAtributo(listaExemplo, "id");
console.log("Lista ordenada por id:", listaOrdenadaPorId);

module.exports = { ordenarPorAtributo };
