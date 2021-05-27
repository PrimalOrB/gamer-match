const User = require( './User' );
const Game = require( './Game' );
const UserGame = require( './UserGame' );

User.hasMany( UserGame, {
    foreignKey: 'user_id'
} );

Game.hasMany( UserGame, {
    foreignKey: 'game_id'
} );

User.belongsToMany( Game, {
    through: UserGame,
    as: 'games_played',
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
} );
    
Game.belongsToMany( User, {
    through: UserGame,
    as: 'played_by',
    foreignKey: 'game_id',
    onDelete: 'SET NULL'
} );

UserGame.belongsTo( User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
    as: 'played_by'
} );

UserGame.belongsTo( Game, {
    foreignKey: 'game_id',
    onDelete: 'SET NULL',
    as: 'playing'
} );

module.exports = { User, Game, UserGame };