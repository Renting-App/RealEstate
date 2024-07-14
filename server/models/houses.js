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
  location: {
    type: DataTypes.STRING(' Ariana',
      ' Beja',
      ' Ben Arous',
      ' Bizerte',
      ' Gabes',
      ' Gafsa',
      ' Jendouba',
      ' Kairouan',
      ' Kasserine',
      ' Kebili',
      ' La Manouba',
      ' Le Kef',
      ' Mahdia',
      ' Medenine',
      ' Monastir',
      ' Nabeul',
      ' Sfax',
      ' Sidi Bouzid',
      ' Siliana',
      ' Sousse',
      ' Tataouine',
      ' Tozeur',
      ' Tunis',
      ' Zaghouan',),
    defaultValue: 'Ariana'
  },
  subLocation: {
    type: DataTypes.STRING
      ('Ariana Essoughra', 'Raoued', 'Sokra', 'Ariana Ville', 'Ennasr',
        'Beja Nord', 'Beja Sud', 'Nefza', 'Teboursouk',
        'Hammam Lif', 'Radès', 'Ben Arous Ville', 'Ezzahra',
        'Bizerte Nord', 'Bizerte Sud', 'Menzel Jemil', 'Menzel Bourguiba',
        'Gabes Ville', 'Gabes Sud', 'Mareth', 'Metouia',
        'Gafsa Ville', 'El Guettar', 'Moulares', 'Metlaoui',
        'Jendouba Ville', 'Bousalem', 'Tabarka', 'Fernana',
        'Kairouan Ville', 'El Oueslatia', 'Bouhajla', 'Sbikha',
        'Kasserine Ville', 'Sbeitla', 'Thala', 'Foussana',
        'Kebili Ville', 'Douz', 'Jemna', 'Souk Lahad',
        'Manouba Ville', 'Oued Ellil', 'Douar Hicher', 'Tebourba',
        'Kef Ville', 'Tajerouine', 'Jerissa', 'Dahmani',
        'Mahdia Ville', 'Chebba', 'Ksour Essef', 'Bou Merdes',
        'Medenine Ville', 'Houmt Souk', 'Zarzis', 'Beni Khedache',
        'Monastir Ville', 'Skanes', 'Ksar Hellal', 'Jemmal',
        'Nabeul Ville', 'Hammamet', 'Korba', 'Kelibia',
        'Sfax Ville', 'Sakiet Ezzit', 'Thyna', 'El Ain',
        'Sidi Bouzid Ville', 'Regueb', 'Meknassy', 'Bir El Hafey',
        'Siliana Ville', 'Le Krib', 'Makthar', 'Gaafour',
        'Sousse Ville', 'Akouda', 'Hammam Sousse', 'Kalaâ Kebira',
        'Tataouine Ville', 'Remada', 'Dehiba', 'Bir Lahmar',
        'Tozeur Ville', 'Nefta', 'Degache', 'Tameghza',
        'Tunis Ville', 'Carthage', 'La Marsa', 'Le Bardo',
        'Zaghouan Ville', 'Nadhour', 'Bir Mcherga', 'Zriba')
  },
  date_of_creation: {
    type: DataTypes.DATEONLY // Assuming you want to store only the date part
  },
  rooms: {
    type: DataTypes.INTEGER
  },
  price: {
    type: DataTypes.NUMBER
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
  },
  condition: {
    type: DataTypes.ENUM('new', 'occasion'),
    defaultValue: 'new',
  }
}, {
  tableName: 'houses',
  timestamps: false
});

module.exports = House;
