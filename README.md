## Mananger
Este é um projeto criado com Next.js, React, Chakra UI e Mongoose.

Pré-requisitos
Antes de começar, certifique-se de ter o seguinte instalado:

 - Node.js versão 14.0.0 ou superior
 - npm versão 6.0.0 ou superior
   
#### Instalação
Siga os passos abaixo para instalar e executar o projeto localmente.

Instale o banco de dados mongo db e o node nos sites oficiais

Clone o repositório:
```
git clone https://github.com/seu-usuario/clientes-mananger.git
```
Navegue até o diretório do projeto:
```
cd mananger
```
Instale as dependências do projeto:
```
npm install
```
Transpilando para typescript:
```
tsc
```
Executando o Frontend 
Este comando inicia o servidor de desenvolvimento Next.js e você pode abrir o aplicativo acessando http://localhost:3000 no seu navegador.
```
npm run dev
```
Executando o Frontend 
Em outro terminal rode o seguinte comando.
```
npm run api
```

Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.


# API de Dispositivos
As melhorias nas rotas da api foram citadas abaixo

## Rotas

### PUT /api/device/:id

Atualiza um dispositivo existente.

**requisição:**

- `configuration`: Configuração do dispositivo.
- `device_list_id`: ID da lista de dispositivos.
- `device_name`: Nome do dispositivo.

### DELETE /api/device/:id

Exclui um dispositivo.

### GET /api/devicesInfo

Obtém informações de todos os dispositivos.

### GET /api/deviceId/:id

Obtém um dispositivo específico.

### GET /api/devices/:id

Obtém todos os dispositivos de um usuário.

### POST /api/device

Cria um novo dispositivo.

**requisição:**

- `user_id`: ID do usuário.
- `configuration`: Configuração do dispositivo.
- `device_list_id`: ID da lista de dispositivos.
- `device_name`: Nome do dispositivo.

### GET /api/session/:user/:password

Valida a sessão de um usuário.

**Parâmetros da URL:**

- `user`: Nome do usuário.
- `password`: Senha do usuário.