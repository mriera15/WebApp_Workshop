

/******************************************************** Importações ***************************************************************/
const express = require('express'); //Importar express para criar o servidor
const { SerialPort } = require('serialport');  //Importar serialport para comunicar com o Arduino
//Criar a aplicação Express e determinar a porta do servidor (http://localhost:3000)
const app = express(); 
const PORT = 3000;

/******************************************************** Variáveis globais ***************************************************************/
// Variável para armazenar o estado do Arduino (ligado/desligado). Inicialmente está desligado.
let estado = 'desligado';


const portaSerial = new SerialPort({
    path: 'COM14',  // AJUSTAR COM BASE NA PORTA DO ARDUINO
    baudRate: 9600
  });

  /******************************************************** Configuração do servidor ************************************************************** */
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'
app.use(express.json()); //Permite o servidor receber e atender pedidos JSON

/***************************************************************** API  ***************************************************************/

//Rota para receber um pedido POST com o estado do arduino e atualizar a variável 'estado'
app.post( '/estado', (req, res) => {
    estado = req.body.estado; //lê o estado enviado pelo frontend
    console.log('Estado atualizado:', estado); //imprime o estado no console
    res.sendStatus(200); 
  // Envia comando para o Arduino via Serial: 1 se ligado, 0 se desligado
  portaSerial.write(estado === 'ligado' ? '1' : '0'); 
  res.sendStatus(200); //Envia resposta ao browser a confrimar que o pedido foi recebido (HTTP 200 OK)
});

//Rota para receber um pedido GET e devolver o estado atual do Arduino
app.get('/estado', (req, res) => {
    res.json({ estado }); //devolve para o frontend o estado atual do Arduino
  });

  // Rota para receber um pedido GET e devolver a temperatura atual
app.get('/temp', (req, res) => {
    const temp = (Math.random() * 5 + 20).toFixed(1); // Simula a leitura de temperatura
    res.json({ temp }); //devolve para o frontend a temperatura atual
  });


// Inicia o servidor e imprime uma mensagem de confirmação 
app.listen(PORT, () => console.log(`Servidor a correr na porta ${PORT}`));