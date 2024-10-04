const readline = require("readline");

function inveterString(str) {
  if (str === "") {
    return "";
  }
  return inveterString(str.substr(1)) + str.charAt(0);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Digite uma string para inverter: ", (str) => {
  const resultado = inveterString(str);
  console.log(resultado);
  rl.close();
});
