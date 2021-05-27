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
    "avatarhash":"j3xp8vj0hl7b3n11223736l1fegftcu3osfc440630"
  },
  {
    "username":"Testy Bob",
    "steamid":"95370412861036911",
    "profileurl":"https://steamcommunity.com/id/testybob",
    "avatarhash":"szfrt5x4e772e51x40p6qsptg10x5x3333o61b8tz2"
  },
  {
    "username":"UltronTest",
    "steamid":"36179435465788410",
    "profileurl":"https://steamcommunity.com/id/UltronTest",
    "avatarhash":"w3febr2ohmym0728394g13hd81lm52a326hvkt2i22"
  },
  {
    "username":"SuperMan",
    "steamid":"79911790262780714",
    "profileurl":"https://steamcommunity.com/id/superman",
    "avatarhash":"9hx5h051jv62q1t26wyl0350hed3thog559t0vtb71"
  },
];

const seedUser = () => User.bulkCreate( userData );

module.exports = seedUser;
