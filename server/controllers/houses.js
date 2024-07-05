const House = require('../models/houses');

const addHouse = async (req, res) => {
  try {
    const { address, price, description, contact_info,category,images,iduser} = req.body;
    const newHouse = await House.create({
      address,
      price,
      description,
      contact_info,
      category,
      images,
      iduser
    });
    res.status(201).json(newHouse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add house' });
  }
};

const getAllHouses = async (req, res) => {
  try {
    const houses = await House.findAll();
    res.json(houses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
//search
const getHouses = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8
    const startIndex=parseInt(req.query.startIndex) || 0
   if (offer===undefined || offer==='false') {
    offer= {$in: [false,true]}
   }
    
   if (furnished===undefined || furnished==='false') {
    furnished= {$in: [false,true]}
   }
   if (parking===undefined || parking==='false') {
    parking= {$in: [false,true]}
   }

   let type = req.query.type
   if (type===undefined || type==='all') {
    type= {$in: ['sale','rent']}
   }

   const searchTerm = req.query.searchTerm || '';
   const sort = req.query.sort || 'createdAt';
   const order = req.query.order || 'desc';


   const Listings = await House.find({
    name: {$regex:searchTerm, $options:'i'},
     offer,
      furnished,
      parking,
      type
   }).sort(
    {[sort]: order}
   ).limit(limit).skip(startIndex);
   
   return res.status(200).json(Listings)
  } 
  
  catch (err) {
    
    res.status(500).json({ message: 'Server Error' });
  }
};


const getHouseById = async (req, res) => {
  const { id } = req.params;
  try {
    const house = await House.findByPk(id);
    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }
    res.json(house);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteHouseById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCount = await House.destroy({
      where: {
        idhouses: id
      }
    });
    if (deletedCount === 0) {
      return res.status(404).json({ message: 'House not found' });
    }
    res.json({ message: 'House deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete house' });
  }
};

const updateHouseById = async (req, res) => {
  const { id } = req.params;
  const { address, price, description, contact_info, status, notification, category,images} = req.body;
  
  try {
    let house = await House.findByPk(id);

    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }

    house.address = address;
    house.price = price;
    house.description = description;
    house.contact_info = contact_info;
    house.status = status;
    house.notification = notification;
    house.category = category;
    house.images = images;

    await house.save();

    res.json(house);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update house' });
  }
};

module.exports = {
  addHouse,
  getAllHouses,
  getHouseById,
  deleteHouseById,
  updateHouseById,
  getHouses
};
