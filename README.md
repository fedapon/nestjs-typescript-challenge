# challenge-nodejs-typescript

This project is a Nest.js challenge for Tandamos. It contains three resources (agents, customers and orders) with their respective CRUD endpoints. It also includes pagination when we need to list orders and three special endpoints of orders when we only need the total amount of money grouped by customer, by agent, or by country.

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

## Installation

Clone the project

```bash
  git clone https://gitlab.com/tandamos/challenge-nodejs-typscript.git
```

Go to the project directory

```bash
  cd challenge-nodejs-typscript
```

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Running Tests

To run tests, run the following command

```bash
  npm run test     // Unit Tests
  npm run test:e2e // Integration Tests
```

## Deployment

To deploy this project run

```bash
  npm run deploy
```
