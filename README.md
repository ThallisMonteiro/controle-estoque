# 📦 Sistema de Controle de Estoque

Projeto de um sistema de controle de estoque desenvolvido para prática de desenvolvimento web full stack.

Inicialmente criado com **HTML, CSS e JavaScript**, o projeto evoluiu para uma arquitetura com **API REST em Node.js e Express**, integrada a um banco de dados MySQL, utilizando ORM Prisma para relação com o banco.

---

## 🚀 Tecnologias utilizadas

### 🔹 Frontend
- HTML5
- CSS3
- JavaScript

### 🔹 Backend
- Node.js
- Express

### 🔹 Banco de Dados
- MySQL

---

## 📌 Funcionalidades

✔ Cadastro de produtos  
✔ Listagem de produtos via API  
✔ Atualização e exclusão de produtos (CRUD)  
✔ Controle de estoque  
✔ Registro de movimentações (entrada e saída)  
✔ Integração entre frontend e backend via requisições HTTP  

---

## 🔗 API REST

A aplicação conta com uma API REST com os seguintes endpoints:

- `GET /api/produtos` → listar produtos  
- `POST /api/produtos` → criar produto  
- `PUT /api/produtos/:id` → atualizar produto  
- `DELETE /api/produtos/:id` → remover produto  
- `POST /api/movimentacoes` → registrar entrada/saída de estoque  

---

## 🚧 Status do Projeto

⚠️ Em desenvolvimento

O sistema continua em evolução, com melhorias constantes tanto no backend quanto no frontend.

---

## 🎯 Objetivo do Projeto

Este projeto tem como objetivo:

- praticar desenvolvimento backend com Node.js
- entender a construção de APIs REST
- integrar frontend com backend
- trabalhar com banco de dados relacional
- aplicar boas práticas de organização de código

---

## Como rodar o projeto? 

- Primeiro baixe a versão mais atualizada do repositório utilizando `git pull`
- Após, utilize o console(aspas ' + ctrl) e navegue até o backend utilizando `cd backend`
- Deverá ver no console algo como `controle-estoque-main\backend>`
- Utilize o comando `npm install` para instalar todas as dependencias do projeto