const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const bikeCategory = sequelize.define(
  "bike_category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    category_name: { type: DataTypes.STRING(30), allowNull: false},
    description: { type: DataTypes.STRING , allowNull: false},
  },
  {
    freezeTableName: true,
  }
);

module.exports = bikeCategory;
