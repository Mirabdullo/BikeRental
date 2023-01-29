const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    username: { type: DataTypes.STRING(30)},
    password: { type: DataTypes.STRING },
    avatar: { type: DataTypes.STRING},
    fullname: { type: DataTypes.STRING },
    contact: { type: DataTypes.STRING(15) },
    email: { type: DataTypes.STRING },
    user_category_id: { type: DataTypes.INTEGER},
    status: { type: DataTypes.BOOLEAN, defaultValue: false },
    user_token: {type: DataTypes.STRING}
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;
