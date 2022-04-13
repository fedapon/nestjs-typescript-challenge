# challenge-nodejs-typescript

This project is a challenge that uses Nest.js as its framework. It contains three resources (agents, customers and orders) with their respective CRUD endpoints. It also includes pagination when we need to list orders and three special endpoints of orders when we only need the total amount of money grouped by customers, by agents, or by countries.

The endpoints of the resources are:

- [ ] /api/agents
- [ ] /api/customers
- [ ] /api/orders

The documentation (swagger) can be found at:

- [ ] /api/docs

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Deployment](#deployment)

## Prerequisites

- [nodejs versión 14](https://nodejs.org/en/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`DB_HOST`
`DB_PORT`
`DB_USER`
`DB_PASS`
`DB_DATABASE`

And if we want to use docker-compose we have to add:

`MYSQL_ROOT_PASSWORD`
`MYSQL_USER`
`MYSQL_PASSWORD`
`MYSQL_DATABASE`

## Installation

Clone the project

```bash
  git clone https://github.com/fedapon/challenge-nodejs-typescript
```

Go to the project directory

```bash
  cd challenge-nodejs-typescript
```

Checkout to my challenge branch:

```bash
  npm install
```

To start the server

```bash
  npm run start
```

And if we use docker-compose, instead of the last command, we use

```bash
  docker-compose up
```

## Running Tests

To run tests, run the following command

```bash
  npm run test     		// Unit Tests
  npm run test:e2e 		// Integration Tests
```
