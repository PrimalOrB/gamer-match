const { Model, DataTypes } = require( 'sequelize' );
const sequelize = require( '../config/connection' );

class Game extends Model {
}

Game.init(
        {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        appid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        playtime: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        img_icon_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img_logo_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
            // table config options
        sequelize, // imported sequelize connection
        timestamps: false, // don't automatically create timestamp fields for createdAt / updatedAt
        freezeTableName: true, // don't pluralize table name
        underscored: true, // instead of camelcase
        modelName: 'game' // lowercase for db
    }
);

module.exports = Game;