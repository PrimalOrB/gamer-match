const { Model, DataTypes } = require( 'sequelize' );
const sequelize = require( '../config/connection' );

class User extends Model {
}

User.init(
        {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
            // table config options
        sequelize, // imported sequelize connection
        timestamps: false, // don't automatically create timestamp fields for createdAt / updatedAt
        freezeTableName: true, // don't pluralize table name
        underscored: true, // instead of camelcase
        modelName: 'user' // lowercase for db
    }
);

module.exports = User;