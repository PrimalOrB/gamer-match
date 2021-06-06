# Gamer Match
https://damp-tor-80298.herokuapp.com/

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

## Screenshot 
![Screenshot 2021-06-06 125152](https://user-images.githubusercontent.com/78888642/120933984-8317ca80-c6ca-11eb-8897-0cc01c4aaa30.png)

## Current DB

- GET /api/users
- GET /api/users/:id
- CREATE /api/users - { username, steamid, profileurl, avatarhash }
- UPDATE /api/users/:id - { avatarhast }
- POST /api/users/check - (send authorization information to endpoint to see if user exists in db. Return id of existing or created user)
- DELETE /api/users/:id

- GET /api/games
- GET /api/games/:id
- CREATE /api/games - { appid, name, img_icon_url, img_logo_url }
- UPDATE /api/usergames - { user_id: #, gameIds: [ { game: #, playtime: # }, { game: #, playtime: # } ] ) (send current recent games list to updated the current user records)
- DELETE /api/games/:id

- GET /api/usergames
- GET /api/usergames/:id
- CREATE /api/usergames - { user_id, game_id, playtime }
- UPDATE /api/games/check - [ { appid, name, img_icon_url, img_logo_url }, { appid, name, img_icon_url, img_logo_url } ] (send an array for games to check. Either return index/id of existing games, or return index/id of newly created games)
- DELETE /api/usergames/:id

## Built By
[Fanxi Liao](https://github.com/liaof)
[Andrew Ogilvie](https://github.com/PrimalOrB)
[Andrew Power](https://github.com/powerar)
