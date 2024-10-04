const readline = require('readline');

function sequenciaMensagens (n, mensagem) {
  if (n === 0) {
    return '';
  }
  return mensagem + ' ' + sequenciaMensagens(n - 1, mensagem);
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

    rl.question('Digite o número de repetições: ', (n) => {
    rl.question('Digite a mensagem: ', (mensagem) => {
        const resultado = sequenciaMensagens(parseInt(n), mensagem); 
        console.log(resultado);
        rl.close(); 
    });
});