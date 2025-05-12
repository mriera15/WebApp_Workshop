# 📝 WebApp Development Cheat Sheet

---

## ⚙️ 1. Criar projeto com Node.js + Express

```bash
# Cria a pasta e entra nela
mkdir meu-projeto
cd meu-projeto

# Inicializa o projeto
npm init -y

# Instala Express
npm install express

# Cria ficheiro principal
touch server.js
```

### Exemplo simples de server.js:
```js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.listen(PORT, () => console.log(`Servidor a correr em http://localhost:${PORT}`));
```

---

## 🎨 2. Usar Tailwind CSS

### a) CDN (mais simples – frontend puro)
No `<head>` do HTML:
```html
<script src="https://cdn.tailwindcss.com"></script>
```

### b) Com build tool (ex: Node/PostCSS)
Ver: https://tailwindcss.com/docs/installation

---

## 📊 3. Usar Chart.js

### Instalar via CDN (HTML)
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

### Exemplo:
```html
<canvas id="grafico"></canvas>
<script>
  const ctx = document.getElementById('grafico').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev'],
      datasets: [{
        label: 'Exemplo',
        data: [10, 20],
        borderColor: 'blue'
      }]
    }
  });
</script>
```

---

## 🔥 4. Setup Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Escolhe: "Use existing project" ou "Create a new project"
# Define a pasta do frontend (ex: "public")
# Responde "Yes" para single-page app se aplicável
```

---

## 🚀 5. Fazer Deploy no Firebase

```bash
firebase deploy
# Depois acede ao link mostrado no terminal
```

---

## 🌐 6. Fazer Deploy com Render (para Node.js)

1. Vai a [https://render.com](https://render.com)
2. Cria conta e novo Web Service
3. Liga ao teu repositório GitHub
4. Escolhe:
   - **Environment**: Node
   - **Start command**: `node server.js` ou `npm start`
   - **Root directory**: `backend` (se for essa a pasta)
5. Clica “Create Web Service”
6. Espera pelo build e acede ao URL gerado



## 🗂️ 7. Integrar Base de Dados (Firebase Realtime Database)

### a) Adicionar Firebase ao HTML (Frontend)

```html
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "TUA_API_KEY",
    authDomain: "TUA_AUTH_DOMAIN",
    databaseURL: "TUA_DATABASE_URL",
    projectId: "TUA_PROJECT_ID",
    storageBucket: "TUA_BUCKET",
    messagingSenderId: "TUA_SENDER_ID",
    appId: "TUA_APP_ID"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  // Escrever dados
  function escreverEstado(estado) {
    set(ref(db, 'led/'), { estado });
  }

  // Ler dados
  onValue(ref(db, 'led/'), snapshot => {
    const data = snapshot.val();
    console.log("Estado atual:", data.estado);
  });
</script>
```

### b) Onde obter as credenciais?

1. Vai ao [Firebase Console](https://console.firebase.google.com/)
2. Cria um projeto
3. Ativa o Realtime Database
4. Vai a "Project Settings" → "Configurações Web"
