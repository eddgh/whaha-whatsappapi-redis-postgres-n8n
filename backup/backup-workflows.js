// backup-n8n.js
const fs = require('fs');
const axios = require('axios');

const N8N_URL = 'http://localhost:5678'; // ajuste para o endereço do seu n8n
const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMWVhZWUxNy0yMjJhLTQ3YWItYWQ1My02MTU5NWY3ZDYyMjciLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzYzODM5ODg5fQ.-w81sSjMAbqI2GTAuWK85Zz3XnUro4HdMgTwMPimvcc';       // gere em Settings > API

const client = axios.create({
  baseURL: `${N8N_URL}/rest`,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

async function exportWorkflows() {
  const { data: workflows } = await client.get('/workflows');
  console.log(`Encontrados ${workflows.length} workflows.`);

  for (const wf of workflows) {
    const { data: workflowData } = await client.get(`/workflows/${wf.id}`);
    const fileName = `workflow-${wf.id}-${wf.name.replace(/\s+/g, '_')}.json`;
    fs.writeFileSync(fileName, JSON.stringify(workflowData, null, 2));
    console.log(`Exportado workflow: ${fileName}`);
  }
}

async function exportCredentials() {
  const { data: credentials } = await client.get('/credentials');
  console.log(`Encontradas ${credentials.length} credenciais.`);

  for (const cred of credentials) {
    const { data: credData } = await client.get(`/credentials/${cred.id}`);
    const fileName = `credential-${cred.id}-${cred.name.replace(/\s+/g, '_')}.json`;
    fs.writeFileSync(fileName, JSON.stringify(credData, null, 2));
    console.log(`Exportada credencial: ${fileName}`);
  }
}

async function runBackup() {
  try {
    await exportWorkflows();
    await exportCredentials();
    console.log('✅ Backup completo de workflows e credenciais!');
  } catch (err) {
    console.error('Erro no backup:', err.message);
  }
}

runBackup();