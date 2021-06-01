const seedUser = require('./user-seeds');
const seedGame = require('./game-seeds');
const seedUserGame = require('./user-game-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync( { force: true } );
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUser();
  console.log('\n----- USERS SEEDED -----\n');

  await seedGame();
  console.log('\n----- GAMES SEEDED -----\n');

  await seedUserGame();
  console.log('\n----- USER GAMES SEEDED -----\n');

  process.exit(0);
};

seedAll();
