const sequelize = require("../config/db")
const {DataTypes} = require("sequelize")

const Token = sequelize.define(
    "token",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
          },
        user_id: { type: DataTypes.INTEGER},
        user_os: { type: DataTypes.STRING },
        user_device: { type: DataTypes.STRING },
        token: { type: DataTypes.STRING },
        table_name: { type: DataTypes.STRING }
    },
    {
        freezeTableName: true
    }
)

module.exports = Token