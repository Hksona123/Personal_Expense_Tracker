const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");  // must match export from db.js
const User = require("./User");

const Transaction = sequelize.define("Transaction", {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


module.exports = Transaction;
