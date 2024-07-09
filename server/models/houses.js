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
  size: {
    type: DataTypes.INTEGER 
  },
  category: {
    type: DataTypes.ENUM('apartment', 'house', 'office', 'studio', 'penthouse')
  },
  title: {
    type: DataTypes.STRING
  },
  favourite: {
    type: DataTypes.BOOLEAN
  },
  description: {
    type: DataTypes.STRING
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  operation: {
    type: DataTypes.ENUM('rent', 'sale'),
    defaultValue: 'sale',
    allowNull: false
  },
  date_of_creation: {
    type: DataTypes.DATEONLY // Assuming you want to store only the date part
  },
  rooms: {
    type: DataTypes.INTEGER
  }, 
  price: {
    type: DataTypes.INTEGER
  },
  bathrooms: {
    type: DataTypes.INTEGER
  }, 
  visits: {
    type: DataTypes.JSONB // Using JSONB for flexibility
  },
  amenities: {
    type: DataTypes.JSONB // Using JSONB for flexibility
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
  iduser: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'houses',
  timestamps: false
});

module.exports = House;
