const mongoose = require("mongoose")

const mongoURI = "mongodb+srv://chaima:chaimabahi123456@realestate.fkwvart.mongodb.net/RealEstate?retryWrites=true&w=majority&appName=RealEstate";

mongoose.connect(mongoURI)
.then(() => {
  console.log("db connected");
}).catch((error) => {
  console.error("db connection error:", error);
}); 

const db = mongoose.connection;

module.exports = db; 