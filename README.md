  <!-- Dependency Status -->
<a href="https://david-dm.org/sidhantpanda/docker-express-typescript-boilerplate">
  <img src="https://david-dm.org/flexdinesh/react-redux-boilerplate.svg" alt="Dependency Status" />
</a>
<!-- devDependency Status -->
<a href="https://david-dm.org/sidhantpanda/docker-express-typescript-boilerplate#info=devDependencies">
  <img src="https://david-dm.org/flexdinesh/react-redux-boilerplate/dev-status.svg" alt="devDependency Status" />
</a>
<a href="https://travis-ci.org/sidhantpanda/docker-express-typescript-boilerplate">
  <img src="https://travis-ci.org/sidhantpanda/docker-express-typescript-boilerplate.svg?branch=master" alt="Build Status" />
</a>
<a href="https://snyk.io//test/github/sidhantpanda/docker-express-typescript-boilerplate?targetFile=package.json">
  <img src="https://snyk.io//test/github/sidhantpanda/docker-express-typescript-boilerplate/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io//test/github/sidhantpanda/docker-express-typescript-boilerplate?targetFile=package.json" style="max-width:100%;">
</a>

# Shopping Cart API

## Requirements
- Docker
- Node.js(version > 10)

## Installation

#### 1. Install dependencies
```
$ npm i
```

## Development

### Start dev server
Starting the dev server also starts MongoDB as a service in a docker container using the compose script at `docker-compose.dev.yml`.

```
$ npm run dev
```
Running the above commands results in 
* 🌏 **API Server** running at `http://localhost:3000`
* ⚙️ **Swagger UI** at `http://localhost:3000/dev/api-docs`
* 🛢️ **MongoDB** running at `mongodb://localhost:27017`

## Run Tests 
```
npm test
```
## Logging
The application uses [winston](https://github.com/winstonjs/winston) as the default logger. The configuration file is at `src/logger.ts`.
* All logs are saved in `./logs` directory and at `/logs` in the docker container.
* The `docker-compose` file has a volume attached to container to expose host directory to the container for writing logs.
* Console messages are prettified
* Each line in error log file is a stringified JSON.

