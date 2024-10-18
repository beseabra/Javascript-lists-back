const readline = require('readline'); 
function fatorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * fatorial(n - 1);
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite um número para calcular o fatorial: ', (n) => {
  const resultado = fatorial(parseInt(n)); 
  console.log(`O fatorial de ${n} é ${resultado}`);
  rl.close(); 
});
