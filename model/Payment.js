const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    rental_id: { type: DataTypes.INTEGER},
    payment_type: { type: DataTypes.INTEGER },
    paid_by: { type: DataTypes.STRING},
    payment_date: { type: DataTypes.DATE },
    remarks: { type: DataTypes.STRING },
    user_id: { type: DataTypes.INTEGER },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Payment;