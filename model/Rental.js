const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Rental = sequelize.define(
  "rental",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    bike_id: { type: DataTypes.INTEGER},
    client_id: { type: DataTypes.INTEGER },
    rental_start_date: { type: DataTypes.DATE},
    rental_end_date: { type: DataTypes.DATE },
    total_amount: { type: DataTypes.DECIMAL },
    payment_status: { type: DataTypes.BOOLEAN, defaultValue: false },
    rental_status: { type: DataTypes.BOOLEAN, defaultValue: false },
    remarks: { type: DataTypes.STRING },
    user_id: { type: DataTypes.INTEGER },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Rental;
