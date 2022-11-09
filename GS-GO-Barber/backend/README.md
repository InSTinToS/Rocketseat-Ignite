# Recuperação de senha

**RF: Requisitos Funcionais (Funcionalidades em si)**

1. O usuário deve poder recuperar sua senha informando seu e-mail

2. o usuário deve receber um e-mail com instruções de recuperção de senha

3. O usuário deve poder resetar sua senha

**RNF: Requisitos Não Funcionais (Requisitos técnicos)**

- Utilizar Mailtrap para testar envios em ambiente de dev

- Utilizar Amazon SES para envios em produção

- O envio de e-mails deve acontecer em segundo plano

**RN: Regras de negócio**

2. O link enviado por email para resetar a senha, deve expirar em 2h

3. O usuário deve confirmar a senha após reseta-la

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu perfil: nome, email e senha

**RNF**

**RN**

- O usuário não pode alterar seu e-mail apra um email já utilizado

- Para atualizar sua senha, o usuário deve informar sua senha antiga

- Para atualizar sua senha, o usuário deve confirmar sua senha

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviços cadastrados.

- O usário deve poder listar os dias disponiveis do prestador

- O usuário deve poder listar os horários disponiveis do prestador

- O usuário deve poder realizar um novo agendamento com um prestador

  **RNF**

  - A listagem de prestadores devem ser armazenadas em cache

  **RN**

  - Cada agendamento deve durar exatamente 1h

  - Os agendamentos devem estar disponiveis entre 8h até 18h (primeiro as 8h ultimo as 17h)

  - O usuário não pode agendar em um horário ja ocupado;

  - O usuário não pode agendar em um horário q ja passou;

  - O usuário não pode agendar serviços consigo;

# Painel do prestador

**RF**

- O usupario deve poder listar seus agendamentos de um dia específico

- O prestador deve receber uma notificação sempre que houver um novo agendamento

- O prestador deve poder visualizar as notificações não lidas

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache

- As notificações do prestador devem ser armazenadas no MongoDB

- As notificações do prestador devem ser enviadas em tempo-real utilizando socket.io

**RN**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar

# Estrutura de pastas

## modules

- modules

  - <-module->
  - dtos
  - repositories
  - services
  - infra
    - http
    - controllers
    - routes
  - <-lib->
    - entities | schemas
    - repositories

module: Uma abstração da aplicação

dtos: Data Transfer Objects apenas uma interface

repositories: somente a interface do repositório sem a utilização de libs
afim de obter uma base para o repositories dentro de infra (ai sim utilizando lib).

infra: camada que depende de libs.

## shared

- shared

  - errors

  - infra

  - container (injeções de dependencias)

  - providers (dependencias)

    - <-provider->

      - dtos
      - fakes (falsa funcionalidade para teste)
      - implementations (implementações deste provider)
      - models (interface com funcionalidades do provider)
      - index (importação de todas as implementações e injeção da implementação )

    - index (importação do index de todos os providers)
