const { Game } = require('../models');

const gameData = [
  {
    appid: 20920,
    name: "The Witcher 2: Assassins Of Kings Enhanced Edition",
    img_icon_url: "62dd5c627664df1bcabc47727c7dcd7ccab353e9",
    img_logo_url: "f0274a91931ed39f7c69dca9f907ceae6450785c"
  }	,
  {
    appid: 578650,
    name: "The Outer Worlds",
    img_icon_url: "6de56b3e6ff07177a97cf2373145afc6d3a9a926",
    img_logo_url: "6ad5a46dc41d45b133cc2e9b2c5e856003c7c8eb"
  }	,
  {
    appid: 1091500,
    name: "Cyberpunk 207",
    img_icon_url: "5d4fea110b0e85bd80410c090ba7fe28c20d7b02",
    img_logo_url: "6d5bb4dfbf02724b46235e22e7718a52b2c58149"
  }	,
  {
    appid: 130,
    name: "Half-Life: Blue Shift",
    img_icon_url: "b06fdee488b3220362c11704be4edad82abeed08",
    img_logo_url: "927d38e83e3e4ca218a0fc7b32515eeb99aa8ff7"
  }	,
  {
    appid: 1172380,
    name: "STAR WARS Jedi: Fallen Order",
    img_icon_url: "0ea1d285a8ee6fbeef0e8f7f3b2d7fa4cbcb423b",
    img_logo_url: "c089970f23d5da32796420c7d83224435393413e"
  }	,
];

const seedGame = () => Game.bulkCreate( gameData );

module.exports = seedGame;
