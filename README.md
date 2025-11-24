<p align="center">
<img 
    src="./assets/banner.png"
    width="300"
/>
</p>

## Observações importantes

#### POSTGRES

Nesta configuração, utilizei a imagem `bitnami/postgresql:latest` em vez de `postgres:latest`, 
pois a imagem oficial apresentou erros de inicialização com volumes.  
A imagem da Bitnami funcionou perfeitamente e é recomendada para este setup.


#### N8N
Se for usar credenciais do Google no n8n, não modifique os apontamentos do YML da pasta raiz, pois precisa necessariamente que seja: WEBHOOK_URL: http://localhost:5678 nas configurações do n8n, senão vai gerar um URI redirect que não será aceita pelo Google para ser validada.


