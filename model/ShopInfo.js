const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const shopInfo = sequelize.define(
  "shop_info",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    shop_name: { type: DataTypes.STRING, unique: true },
    owner_name: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING(1000) },
    email_address: { type: DataTypes.STRING },
    contact_no: { type: DataTypes.STRING(15) },
    website: { type: DataTypes.STRING },
    update_by: { type: DataTypes.INTEGER },
  },
  {
    freezeTableName: true,
  }
);

module.exports = shopInfo;
