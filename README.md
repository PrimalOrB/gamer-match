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
  - @passport-next/passport-openid
  - steam-web
  - passport-steam

- `npm install -dev` to install dev dependencies:
  - jest
  - nodemon
  - passport

## Create database

- log in to mysql and run `source db/schema.sql`

## To run

- `npm start` to launch server
- `npm run watch` to launch server using nodemon
- `npm run seed` to seed database with filler data

## Current DB

- GET /api/users
- GET /api/users/:id
- CREATE /api/users - { username, steamid, profileurl, avatarhash }
- DELETE /api/users/:id

- GET /api/games
- GET /api/games/:id
- CREATE /api/games - { appid, name, img_icon_url, img_logo_url }
- DELETE /api/games/:id

- GET /api/usergames
- GET /api/usergames/:id
- CREATE /api/usergames - { user_id, game_id, playtime }
- DELETE /api/usergames/:id
