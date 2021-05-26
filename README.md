# Gamer Match

## Installation

- `git clone`
- `cd` into directory locally
- `npm install` to install:
  - bcrypt
  - connect-session-sequelize
  - dotenv
  - express
  - express-handlebars
  - express-session
  - mysql2
  - sequelize
- `npm install -dev` to install dev dependencies:
  - jest
  - nodemon

## To run

- `npm start` to launch server
- `npm run watch` to launch server using nodemon

## Current DB

- GET /api/users
- GET /api/users/:id
- CREATE /api/users - { username, email, password }
- DELETE /api/users/:id
