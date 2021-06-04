const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { User, Game, UserGame } = require('../../models/User');
const fetch = require('node-fetch');

//get the steam user's owned games and stats
const getOwnedGames = function (steamID, user_id) {
  // format the Steam API url with api key and steam username
  var apiUrl = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.API_KEY}&steamid=${steamID}&count=5&format=json`;

  //make request to the url
  fetch(apiUrl).then((response) => {
    if (response.ok) {
      //parse the list of games
      response.json().then((data) => {
        let playerGameData = data.response.games;
        postGameData(playerGameData, user_id);
        //  postUserGameData(steamID);
      });
    }
  });
};

const postGameData = function (playerGameData, user_id) {
  //loop through the playerGameData array and grab only the relevant info
  var counter = 1;
  var gameArray = [];
  playerGameData.forEach(function (games) {
    var game = {
      appid: games.appid,
      name: games.name,
      img_icon_url: games.img_icon_url,
      img_logo_url: games.img_logo_url,
    };
    // add data from the steam db to our local db
    fetch('https://obscure-harbor-51207.herokuapp.com/api/games/check', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([game]),
    })
      .then((response) => response.json())//
      .then(function (json) {
        json[0].input_index = counter;//replaced fetched index which may be random and nonsequential with our own sequential index
        counter++;
        gameArray.push(json[0].game_id);
        return gameArray;
      })
      .then(gameArray => postUserGameData(gameArray, user_id.user_id, playerGameData)
      );
  });
};

const postUserGameData = function (gameArray, user_id, playerGameData) {
  let gameInfo = [];
  let games = {};
  for (i = 0; i < gameArray.length; i++) {
    gameInfo.push({ 
      user_id, 
      gameIds: [
        {
          user_id,
          game: gameArray[i],
          playtime: Math.floor(playerGameData[i].playtime_forever / 60)  
        } 
      ]
      }
    )
    games = gameInfo[i];
  }
  // add data from the steam db to our local db
  fetch('https://obscure-harbor-51207.herokuapp.com/api/usergames', {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(games)
    }).then(response => {
      if (response.ok) {
        return response.json();
      }

      return response.json();
    })
};

getOwnedGames();

module.exports = getOwnedGames;
