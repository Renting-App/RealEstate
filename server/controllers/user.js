// const User=require('../models/user')

// const addUser = async (req, res) => {
//     const { username, email, phone_number, role,firebaseUID} = req.body;
//     try {
//       const user = await User.create({ username,email, role, firebaseUID });
//       res.status(201).json(user);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
  
//   module.exports = {
//     addUser,
//   };