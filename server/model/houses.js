const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  size: {
    type: Number
  },
  category: {
    type: String,
    enum: ['apartment', 'house', 'office', 'studio', 'penthouse']
  },
  title: {
    type: String
  },
  favourite: {
    type: Boolean,
    default : false
  },
  description: {
    type: String
  },
  images: {
    type: [String]
  },
  operation: {
    type: String,
    enum: ['rent', 'sale'],
    default: 'sale',
    required: true
  },
  location: {
    type: String,
    enum: [
      'Ariana', 'Beja', 'Ben Arous', 'Bizerte', 'Gabes', 'Gafsa', 'Jendouba',
      'Kairouan', 'Kasserine', 'Kebili', 'La Manouba', 'Le Kef', 'Mahdia',
      'Medenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana',
      'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
    ],
    default: 'Ariana'
  },
  subLocation: {
    type: String,
    enum: [
      'Ariana Essoughra', 'Raoued', 'Sokra', 'Ariana Ville', 'Ennasr',
      'Beja Nord', 'Beja Sud', 'Nefza', 'Teboursouk', 'Hammam Lif', 'Radès',
      'Ben Arous Ville', 'Ezzahra', 'Bizerte Nord', 'Bizerte Sud', 'Menzel Jemil',
      'Menzel Bourguiba', 'Gabes Ville', 'Gabes Sud', 'Mareth', 'Metouia',
      'Gafsa Ville', 'El Guettar', 'Moulares', 'Metlaoui', 'Jendouba Ville',
      'Bousalem', 'Tabarka', 'Fernana', 'Kairouan Ville', 'El Oueslatia',
      'Bouhajla', 'Sbikha', 'Kasserine Ville', 'Sbeitla', 'Thala', 'Foussana',
      'Kebili Ville', 'Douz', 'Jemna', 'Souk Lahad', 'Manouba Ville',
      'Oued Ellil', 'Douar Hicher', 'Tebourba', 'Kef Ville', 'Tajerouine',
      'Jerissa', 'Dahmani', 'Mahdia Ville', 'Chebba', 'Ksour Essef',
      'Bou Merdes', 'Medenine Ville', 'Houmt Souk', 'Zarzis', 'Beni Khedache',
      'Monastir Ville', 'Skanes', 'Ksar Hellal', 'Jemmal', 'Nabeul Ville',
      'Hammamet', 'Korba', 'Kelibia', 'Sfax Ville', 'Sakiet Ezzit', 'Thyna',
      'El Ain', 'Sidi Bouzid Ville', 'Regueb', 'Meknassy', 'Bir El Hafey',
      'Siliana Ville', 'Le Krib', 'Makthar', 'Gaafour', 'Sousse Ville',
      'Akouda', 'Hammam Sousse', 'Kalaâ Kebira', 'Tataouine Ville', 'Remada',
      'Dehiba', 'Bir Lahmar', 'Tozeur Ville', 'Nefta', 'Degache', 'Tameghza',
      'Tunis Ville', 'Carthage', 'La Marsa', 'Le Bardo', 'Zaghouan Ville',
      'Nadhour', 'Bir Mcherga', 'Zriba','Sidi bou said' 
    ]
  },
  date_of_creation: {
    type: Date
  },
  rooms: {
    type: Number
  },
  price: {
    type: Number
  },
  bathrooms: {
    type: Number
  },
  visits: {
    type: [Date],
  },
  amenities: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  contact_info: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'declined'],
    default: 'pending'
  },
  notification: {
    type: String
  },
  iduser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  condition: {
    type: String,
    enum: ['new', 'occasion'],
    default: 'new'
  },
  map: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: false,
  collection: 'houses'
});

const House = mongoose.model('House', houseSchema);

module.exports = House;
