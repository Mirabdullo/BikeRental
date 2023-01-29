const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Rental = sequelize.define(
  "penalty",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    rental_id: { type: DataTypes.INTEGER},
    penalty_amount: { type: DataTypes.DECIMAL },
    payment_status: { type: DataTypes.BOOLEAN, defaultValue: false},
    remarks: { type: DataTypes.STRING },
    paid_by: { type: DataTypes.STRING },
    user_id: { type: DataTypes.INTEGER },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Rental;