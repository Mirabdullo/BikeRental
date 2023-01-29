const sequelize = require("../config/db");
const { DataTypes, UUIDV4 } = require("sequelize");

const Rental = sequelize.define(
  "otp",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: UUIDV4
    },
    otp: { type: DataTypes.STRING},
    expiration_time: { type: DataTypes.DATE },
    verified: { type: DataTypes.BOOLEAN,defaultValue: false},
  },
  {
    freezeTableName: true,
  }
);

module.exports = Rental;