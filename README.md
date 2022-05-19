# nestjs-typescript-challenge

This challenge-project uses Nest.js to implement three resources (agents, customers and orders) with their respective CRUD endpoints. It also includes pagination when we need to list orders and three special endpoints of orders when we only need the total amount of money grouped by customers, agents, or by countries. This endpoints are protected, so, to consume them, you need to register yourself to get a valid JWT.

The endpoints of the resources are:

- [ ] /api/agents
- [ ] /api/customers
- [ ] /api/orders

To register or to login:

- [ ] /api/auth/register
- [ ] /api/auth/login

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
`JWT_SECRET`

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
git clone https://github.com/fedapon/nestjs-typescript-challenge
```

Go to the project directory

```bash
cd nestjs-typescript-challenge
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

## Serverless

To deploy, run the following commands:

```bash
npm run build
```

```bash
npm run deploy:offline  // To deploy localy
npm run deploy			// To deploy on AWS (configured on serverless.yaml)
```
