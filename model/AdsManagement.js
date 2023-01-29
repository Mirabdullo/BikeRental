const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const adsMenegement = sequelize.define(
  "ads_menegement",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    ad_name: { type: DataTypes.STRING(30), allowNull: false},
    shop_id: { type: DataTypes.INTEGER , allowNull: false},
    banner_img: { type: DataTypes.STRING},
    description: { type: DataTypes.TEXT , allowNull: false},
    start_date: { type: DataTypes.DATE , allowNull: false},
    end_date: { type: DataTypes.DATE , allowNull: false},
    ad_location: { type: DataTypes.BOOLEAN, defaultValue: false },
    amount: { type: DataTypes.DECIMAL , allowNull: false},
    user_id: { type: DataTypes.INTEGER , allowNull: false},
  },
  {
    freezeTableName: true,
  }
);

module.exports = adsMenegement;
