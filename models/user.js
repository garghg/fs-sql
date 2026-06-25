const { Model, DataTypes } = require('sequelize')
const { sequelize } = require("../utils/db")

class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "username must be a valid email addresss"
            }
        }
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    underscored: true,
    modelName: 'user'
})

module.exports = User