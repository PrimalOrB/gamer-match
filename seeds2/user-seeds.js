const { User } = require('../models');

const userData = [
  {
    username:"Robin",
    steamid: 76561197960435530,
    profileurl:"https://steamcommunity.com/id/robinwalker",
    avatarhash:"f1dd60a188883caf82d0cbfccfe6aba0af1732d4"
  },
  {
    username:"MrTest",
    steamid: 76561198014930257,
    profileurl:"https://steamcommunity.com/id/MrTest",
    avatarhash:"58e93b7ba61372d9e9e4348b0628a93f81dbfcee"
  },
  {
    username:"Testy Bob",
    steamid: 95370412861036911,
    profileurl:"https://steamcommunity.com/id/testybob",
    avatarhash:"f1dd60a188883caf82d0cbfccfe6aba0af1732d4"
  },
  {
    username:"UltronTest",
    steamid: 36179435465788410,
    profileurl:"https://steamcommunity.com/id/UltronTest",
    avatarhash:"58e93b7ba61372d9e9e4348b0628a93f81dbfcee"
  },
  {
    username:"SuperMan",
    steamid: 79911790262780714,
    profileurl:"https://steamcommunity.com/id/superman",
    avatarhash:"f1dd60a188883caf82d0cbfccfe6aba0af1732d4"
  },
];

const seedUser = () => User.bulkCreate( userData );

module.exports = seedUser;
