const User = require( './User' );
const Game = require( './Game' );
const UserGame = require( './UserGame' );
const Comment = require( './Comment' );

User.hasMany( UserGame, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE' // when user is deleted, their UserGame records are deleted also
} );

Game.hasMany( UserGame, {
    foreignKey: 'game_id'
} );

User.belongsToMany( Game, {
    through: UserGame,
    as: 'games_played',
    foreignKey: 'user_id',
} );
    
Game.belongsToMany( User, {
    through: UserGame,
    as: 'played_by',
    foreignKey: 'game_id',
} );

UserGame.belongsTo( User, {
    foreignKey: 'user_id',
    as: 'played_by'
} );

UserGame.belongsTo( Game, {
    foreignKey: 'game_id',
    as: 'playing'
} );

Comment.belongsTo( User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
} );

Comment.belongsTo( Game, {
    foreignKey: 'game_id',
    onDelete: 'CASCADE'
} );

User.hasMany( Comment, {
    foreignKey: 'user_id',
} );

Game.hasMany( Comment, {
    foreignKey: 'game_id'
} );

module.exports = { User, Game, UserGame, Comment };