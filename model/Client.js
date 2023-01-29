const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Client = sequelize.define(
  "client",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    client_code: { type: DataTypes.STRING},
    avatar: { type: DataTypes.STRING },
    client_name: { type: DataTypes.STRING},
    email_address: { type: DataTypes.STRING, unique:true },
    contact_number: { type: DataTypes.STRING(15) },
    complete_address: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    status: { type: DataTypes.BOOLEAN, defaultValue: false },
    otp_id: {type: DataTypes.UUID}
  },
  {
    freezeTableName: true,
  }
);

module.exports = Client;
