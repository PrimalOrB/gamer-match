const { User } = require('../models');

const userData = [
  {
    "username":"Robin",
    "steamid":"76561197960435530",
    "profileurl":"https://steamcommunity.com/id/robinwalker",
    "avatarhash":"f1dd60a188883caf82d0cbfccfe6aba0af1732d4"
  },
  {
    "username":"MrTest",
    "steamid":"15894111659106018",
    "profileurl":"https://steamcommunity.com/id/MrTest",
    "avatarhash":"fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb"
  },
  {
    "username":"Testy Bob",
    "steamid":"95370412861036911",
    "profileurl":"https://steamcommunity.com/id/testybob",
    "avatarhash":"fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb"
  },
  {
    "username":"UltronTest",
    "steamid":"36179435465788410",
    "profileurl":"https://steamcommunity.com/id/UltronTest",
    "avatarhash":"fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb"
  },
  {
    "username":"SuperMan",
    "steamid":"79911790262780714",
    "profileurl":"https://steamcommunity.com/id/superman",
    "avatarhash":"fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb"
  },
];

const seedUser = () => User.bulkCreate( userData );

module.exports = seedUser;
