# Limit orders graphql server

## Requirements

[Node.js](https://nodejs.org/en/)

> Recommended `>v14.18.1`

## Getting started

### Start production version

1. Create and fill `.env` file, template you can find in `.env.example`
2. Run `npm install`
3. Run `npm run build`
4. Start with `npm run start`

🚀 Server should start on `<HOST>:<PORT>/graphql`
📃 To checkout schema go to `<HOST>:<PORT>/graphiql`

### Start development

1. Create and fill `.env` file, template you can find in `.env.example`
2. Run `npm install`
3. Start with `npm run dev`

🚀 Server should start on `<HOST>:<PORT>/graphql`
📃 To checkout schema go to `<HOST>:<PORT>/graphiql`

## Stack

- [TypeORM](https://typeorm.io/#/) as an [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping)
- [SQLite](https://www.sqlite.org/index.html) DB of choice
- [Fastify](https://www.fastify.io/) web framework for Node.js
- [TypeGraphQL](https://typegraphql.com/) framework for GraphQL API
- [Mercurius](https://mercurius.dev/#/) GraphQL server
- [Graphql-subscriptions](https://github.com/apollographql/graphql-subscriptions) GraphQL pubsub system
- [Class-validator](https://github.com/typestack/class-validator) decorator based validation
- [Typedi](https://github.com/typestack/typedi) dependency injection tool
- [Typescript](https://www.typescriptlang.org/) strongly typed programming language that builds on JavaScrip
- [Free TON Javascript SDK](https://github.com/tonlabs/ton-client-js) interaction with blockchain
