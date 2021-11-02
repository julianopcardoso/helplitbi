# Helplit BI

Projeto desenvolvido para disciplina de Projeto Integrador I/2021-02 do curso Análise e Desenvolvimento de Sistema da instituição UNILASALLE.

 - Questionário de Avaliação de Perfil Comportamental

## Pré-requisitos

 - [Nodejs](https://nodejs.org/en/); 
 - [Visual Code](https://code.visualstudio.com/download) (opcional); 
 - Conta Gmail; 
 - Planilha Google Sheets; 
 - Arquivo de credenciais API Google;

## Instalação e configuração

Instale os pacotes necessários via npm:

    $ npm install googleapis dotenv express express-handlebars body-parser vercel
    $ npm install -D nodemon

Crie um clone do repositório   

    $ git clone https://github.com/julianopcardoso/helplitbi.git

Configure as variáveis de ambiente do arquivo *.env*:

    GOOGLE_CREDENTIALS_FILE=conteúdo do arquivo de credenciais do Google API convertido para base64
    GOOGLE_SPREADSHEET_RANGE=página e colunas do projeto
    GOOGLE_SPREADSHEET=id da planilha Google Sheets   

Execute o *nodemon ./index.js*:

    $ nodemon ./index.js

A aplicação estará rodando em http://localhost:8080/. 
A porta pode ser alterada no arquivo *index.js*:

    app.listen(8080); # Altere a porta de escuta caso necessário.
