const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { User } = require('../../models/User');
const fetch = require('node-fetch');
const parseString = require('xml2js').parseString;

//get the steam user's owned games and stats
const getOwnedGames = function () {
  // format the Steam API url with api key and steam username
  let steamId = '76561198014930257';
  var apiUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.API_KEY}&steamid=${steamId}&include_appinfo=true&format=json`;

  //make request to the url
  fetch(apiUrl).then((response) => {
    if (response.ok) {
      //parse the list of games
      response.json().then((data) => {
        let playerGameData = data.response.games;
        parseGameData(playerGameData, steamId);
      });
    }
  });
};

const parseGameData = function(playerGameData, steamId) {
    //loop through the playerGameData array and grab only the relevant info + steamId
    playerGameData.forEach(function (games) {
        var gameData = {
            steamId,
            name: games.name, 
            img: games.img_logo_url,
            playtime: games.playtime_forever
        }
        console.log(gameData);
    });
}

getOwnedGames();