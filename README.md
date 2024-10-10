DESCRIÇÃO DO PROJETO: 
Back-end
Estrutura do Servidor:

Utiliza Node.js e Express para configurar e rodar um servidor web.
Usa o Socket.io para permitir comunicação em tempo real (chat) entre usuários conectados.
Está conectado a dois bancos de dados: MySQL (para gerenciar usuários e autenticação) e MongoDB (para gerenciar as salas de reunião).
Implementa rotas e autenticação JWT para controlar o acesso aos dados e funcionalidades.
Gerenciamento de Usuários:

O servidor permite que os usuários se registrem e façam login.
Durante o login, um token JWT (JSON Web Token) é gerado e usado para autenticar os usuários em todas as operações subsequentes.
O registro não gera token, apenas confirma o salvamento dos dados no banco.
Autenticação:

As rotas para acessar informações confidenciais (como a listagem de salas) estão protegidas por um middleware de autenticação JWT. O token deve ser fornecido nos cabeçalhos das requisições para que o servidor permita o acesso.
Gerenciamento de Salas:

O código inclui uma rota para listar as salas de reunião armazenadas no MongoDB, que podem ser acessadas apenas por usuários autenticados.
A aplicação está preparada para criar e buscar salas, permitindo que os usuários interajam dentro dessas salas.
Comunicação em Tempo Real:

Através do Socket.io, o servidor permite que os usuários se conectem e enviem mensagens de chat em tempo real.
Cada mensagem enviada é retransmitida para os outros usuários conectados, criando um ambiente de comunicação instantânea.
Segurança:

O acesso ao chat é restrito a usuários autenticados, graças à verificação de tokens JWT tanto nas rotas da API quanto na camada de comunicação do Socket.io.
Isso garante que apenas usuários válidos possam interagir no sistema.
Front-end
Interface de Chat:

O front-end da aplicação carrega uma página HTML que contém o chat. Essa página é servida diretamente pelo servidor quando a rota principal (/) é acessada.
O chat usa Socket.io para se comunicar com o servidor, enviando e recebendo mensagens instantaneamente.
Experiência do Usuário:

Os usuários podem acessar a interface do chat, enviar mensagens e ver mensagens recebidas em tempo real de outros usuários conectados.
As salas de chat são gerenciadas no back-end, e os usuários podem interagir com elas por meio da interface.
