const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db.js');

const House = sequelize.define('houses', {
  idhouses: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  contact_info: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'declined'),
    defaultValue: 'pending'
  },
  notification: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING
  },
  iduser: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
    operation: {
    type: DataTypes.ENUM('rent', 'sale'),
    defaultValue: 'sale',
    allowNull: false
  }
}, {
  tableName: 'houses',
  timestamps: false
});

module.exports = House;
