const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { User } = require('../../models/User');
const fetch = require('node-fetch');
const parseString = require('xml2js').parseString;

//get the steam user's owned games and stats
const getOwnedGames = function (steamId) {
  // format the Steam API url with api key and steam username
  var apiUrl = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.API_KEY}&steamid=${steamId}&format=json`;

  //make request to the url
  fetch(apiUrl).then((response) => {
    if (response.ok) {
      //parse the list of games
      response.json().then((data) => {
        let games = data.response.games;
        console.log(games);
      });
    }
  });
};

const getSteamId = function () {
  var steamUsername = 'uuuuggghhhhhhhh';
  var apiUrl = `https://steamcommunity.com/id/${steamUsername}/?xml=1`;

  fetch(apiUrl)
    .then((response) => response.text())
    .then((data) => {
      parseString(data, function (err, result) {
        var steamId = result['profile']['steamID64'];
        getOwnedGames(steamId);
      });
    });
};

getSteamId();
