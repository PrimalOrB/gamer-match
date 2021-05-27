const { Model, DataTypes } = require( 'sequelize' );
const sequelize = require( '../config/connection' );

class UserGame extends Model {
}

UserGame.init(
        {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        game_id: {
            type: DataTypes.STRING,
            references: {
                model: 'game',
                key: 'id'
            }
        },
        playtime: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
            // table config options
        sequelize, // imported sequelize connection
        timestamps: false, // don't automatically create timestamp fields for createdAt / updatedAt
        freezeTableName: true, // don't pluralize table name
        underscored: true, // instead of camelcase
        modelName: 'usergame' // lowercase for db
    }
);

module.exports = UserGame;