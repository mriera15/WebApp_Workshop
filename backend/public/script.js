/************************************************************************************************
  Script principal da WebApp                                                                   **
  ---------------------------------------------------------------------------------------------**                
  Este ficheiro define as funções que permitem comunicar com o backend (Node.js),              **
  controlar o estado de um LED (via Arduino) e mostrar dados de temperatura em tempo real      **
  através de um gráfico gerado com Chart.js.                                                   **
                                                                                               **
  Funções:                                                                                     **
  - ligar(): envia comando para ligar o LED                                                    **
  - desligar(): envia comando para desligar o LED                                              **
  - atualizarEstado(): mostra o estado atual na interface                                      **
  - gráfico: atualiza a temperatura no ecrã e no gráfico a cada 5 segundos                     **
************************************************************************************************/


//Definição da função ligar
function ligar() {
  fetch('/estado', { //fetch para obter o estado atual do Arduino (integração frotend-backend)
    method: 'POST', //Envia um pedido POST para o servidor
    headers: { 'Content-Type': 'application/json' }, //Enviar os dados em formato JSON
    body: JSON.stringify({ estado: 'ligado' }) //Envia o estado 'ligado' para o servidor
  }).then(atualizarEstado); //Atualiza o estado no frontend
}

//Definição da função desligar
function desligar() {
  fetch('/estado', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, 
    body: JSON.stringify({ estado: 'desligado' })//Envia o estado 'ligado' para o servidor
  }).then(atualizarEstado);//Atualiza o estado no frontend
}

// Atualiza o texto que indica se o LED está ligado ou desligado
function atualizarEstado() {
  fetch('/estado')//Pede o estado atual ao servidor
    .then(res => res.json()) //Converte a resposta em JSON
    .then(data => {
      // Atualiza o estado atual na interface
      document.getElementById('estado').innerText = `Estado: ${data.estado}`;
    });
}

// Torna as funções acessíveis pelo HTML  (deste modo podem ser chamadas diretamente no HTML no "onclick")
window.ligar = ligar;
window.desligar = desligar;

// Guarda o elemento onde a temperatura será mostrada (texto)
const sensorTexto = document.getElementById('sensor');

// Setup do gráfico com Charts.js
const ctx = document.getElementById('graficoTemperatura').getContext('2d');
const dadosTemperatura = {
  labels: [], // tempo
  datasets: [{
    label: 'Temperatura (°C)', //título da linha
    data: [],
    borderColor: 'rgba(59, 130, 246, 1)', // azul
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    tension: 0.2 //suaviza a linha da curva
  }]
};

const config = {
  type: 'line', //tipo de gráfico (linha)
  data: dadosTemperatura,
  options: {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Tempo (s)' } },
      y: { beginAtZero: false, title: { display: true, text: '°C' } }
    }
  }
};

//Cria o gráfico no canvas
const grafico = new Chart(ctx, config);

// Atualiza a temperatura a cada 5 segundos
let tempo = 0;
const tempTexto = document.getElementById('temp');

setInterval(() => {
  fetch('/temp') // Pede a temperatura simulada ao servidor
    .then(res => res.json())  // Converte a resposta para JSON
    .then(data => {
      const temp = parseFloat(data.temp); // Converte para número
      tempTexto.innerText = `Temperatura: ${temp} ºC`;

      dadosTemperatura.labels.push(`${tempo}s`); // Adiciona tempo ao eixo X
      dadosTemperatura.datasets[0].data.push(temp); // Adiciona temp ao eixo Y
      grafico.update(); // Atualiza o gráfico
      tempo += 5; //Adiciona 5 segundos ao tempo
    });
}, 5000);