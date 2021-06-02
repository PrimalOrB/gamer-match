const { UserGame } = require('../models');

const userGameData = [
  {
    "user_id": "1",
    "game_id": "1",
    "playtime": "12345"
  },
  {
    "user_id": "1",
    "game_id": "2",
    "playtime": "5345"
  },
  {
    "user_id": "1",
    "game_id": "3",
    "playtime": "15"
  },
  {
    "user_id": "2",
    "game_id": "4",
    "playtime": "126585"
  },
  {
    "user_id": "2",
    "game_id": "1",
    "playtime": "5"
  },
  {
    "user_id": "3",
    "game_id": "1",
    "playtime": "5845"
  },
  {
    "user_id": "4",
    "game_id": "2",
    "playtime": "358345"
  },
  {
    "user_id": "4",
    "game_id": "3",
    "playtime": "15"
  },
  {
    "user_id": "4",
    "game_id": "5",
    "playtime": "12345"
  },
  {
    "user_id": "5",
    "game_id": "1",
    "playtime": "45"
  },
  {
    "user_id": "5",
    "game_id": "2",
    "playtime": "5"
  },
  {
    "user_id": "5",
    "game_id": "3",
    "playtime": "9145"
  },
  {
    "user_id": "5",
    "game_id": "4",
    "playtime": "22245"
  },
  {
    "user_id": "5",
    "game_id": "5",
    "playtime": "345"
  },
  {
    "user_id": "1",
    "game_id": "6",
    "playtime": "500"
  },
  {
    "user_id": "3",
    "game_id": "6",
    "playtime": "689"
  }
];

const seedUserGame = () => UserGame.bulkCreate( userGameData );

module.exports = seedUserGame;
