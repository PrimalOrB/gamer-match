const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const User  = require('../../models/User');
const fetch = require('node-fetch');

//get the steam user's owned games and stats
const getOwnedGames = function () {
  // format the Steam API url with api key and steam username
  let steamID = '76561198014930257';
  var apiUrl = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.API_KEY}&steamid=${steamID}&count=5&format=json`;

  //make request to the url
  fetch(apiUrl).then((response) => {
    if (response.ok) {
      //parse the list of games
      response.json().then((data) => {
        let playerGameData = data.response.games;
        console.log(playerGameData, steamID);
      });
    }
  });
};

const createUser = function () {
  let User = 
}


const postGameData = async function (playerGameData, steamID) {
  //loop through the playerGameData array and grab only the relevant info
  playerGameData.forEach(function (games) {
    var game = {
      appid: games.appid,
      name: games.name,
      img_icon_url: games.img_icon_url,
      img_logo_url: games.img_logo_url,
    };

    var playedGames = {
      user_id: steamID,
      game_id: games.appid,
      playtime: games.playtime_forever,
    }
    fetch('http://localhost:3001/api/games', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game)
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json();
    });

    fetch('http://localhost:3001/api/usergames', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playedGames)
    }).then(response => {
      if (response.ok) {
        return response.json();
      }

      return response.json();
    })
  });
};

getOwnedGames();
