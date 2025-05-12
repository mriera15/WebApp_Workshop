# 💻 WebApp Workshop – Técnico

Este repositório contém os ficheiros utilizados no **Workshop de Desenvolvimento de WebApps**, promovido no Técnico.

🎯 **Objetivo**: Capacitar os participantes para criarem a sua própria WebApp, com integração entre frontend, backend e (opcionalmente) hardware como Arduino ou ESP32.

---

## 🧠 Conteúdos abordados

- Estrutura de uma WebApp (Frontend vs Backend)
- HTML, CSS e JS para o Frontend
- Node.js + Express no Backend
- Comunicação entre Frontend e Backend (via `fetch`)
- Simulação de sensores e controlo de hardware
- Criação de gráfico com Chart.js
- Integração com Arduino via porta serial
- Deploy da WebApp (Firebase, Render, GitHub Pages)

---

## 📁 Estrutura do Projeto

```bash
.
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── backend/
│   ├── server.js
│   ├── package.json
│   └── public/
│       ├── index.html
│       ├── script.js
│       └── style.css
├── .gitignore
└── README.md
```

---

## 🚀 Como correr o projeto localmente

1. Clona este repositório:
   ```bash
   git clone https://github.com/mriera15/WebApp_Workshop.git
   cd WebApp_Workshop/backend
   ```

2. Instala as dependências:
   ```bash
   npm install
   ```

3. Inicia o servidor:
   ```bash
   node server.js
   ```

4. Abre o browser e visita:  
   👉 http://localhost:3000

---

## 🔌 Integração com Hardware (opcional)

Este projeto pode ser integrado com Arduino através de comunicação serial.

- Requisitos:
  - Arduino UNO ou Nano
  - Biblioteca `serialport` instalada no Node.js
  - Código carregado no Arduino

---

## 📚 Licença

Distribuído com fins educacionais. Uso livre com referência ao autor original.

---


