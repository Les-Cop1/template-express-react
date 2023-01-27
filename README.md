
# Template React Express

[![CI](https://github.com/Les-Cop1/template-express-react/actions/workflows/ci.yml/badge.svg)](https://github.com/Les-Cop1/template-express-react/actions/workflows/ci.yml)
[![CodeQL](https://github.com/Les-Cop1/template-express-react/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Les-Cop1/template-express-react/actions/workflows/codeql-analysis.yml)

Quick description

![Logo](https://github.com/Les-Cop1/template-express-react/blob/main/front/public/repository-open-graph-template.png?raw=true)

## Run Locally

Clone the project

```bash
  git clone [Project url]
```

Go to the project directory

```bash
  cd [Project Name]
```

Install backend dependencies and build the front-end

```bash
  yarn build
```

Start the back-end

```bash
  yarn back:start
```

Start the front-end

```bash
  yarn front:start
```

### URLs :

Server URL : [http://localhost:2000/api](http://localhost:2000/api)

Built version of front-end : [http://localhost:2000](http://localhost:2000)

Live version of front-end : [http://localhost:3000](http://localhost:3000)

## Deployment

To deploy this project run

```bash
  pm2 deploy ecosystem.json production
```

Check  if you can access to the server before trying to deploy.

## API Reference

API Documentation : [Postman]([Postman documentation url])

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file and your ecosystem.json file (It's recommended to use the example files provided in the repo : `.env.example`)

Environment variables : [Github env](https://github.com/Les-Cop1/download-manager/settings/secrets/actions)

```dotenv
NODE_ENV=""
PORT=""
TZ=""
JWT_SECRET=""

MONGO_URI_ENCODED=""
```

## Tech Stack

**Client:** React, typescript, tailwindcss

**Server:** Node, typescript, express, bcryptjs, jsonwebtoken

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

