const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const bikeInfo = sequelize.define(
  "bike_info",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    bike_category_id: { type: DataTypes.INTEGER, allowNull: false},
    shop_id: { type: DataTypes.INTEGER , allowNull: false},
    bike_name: { type: DataTypes.STRING, allowNull: false},
    specs: { type: DataTypes.STRING , allowNull: false},
    rent_price: { type: DataTypes.DECIMAL , allowNull: false},
    availability: { type: DataTypes.BOOLEAN, defaultValue: false },
    user_id: { type: DataTypes.INTEGER , allowNull: false},
  },
  {
    freezeTableName: true,
  }
);

module.exports = bikeInfo;
