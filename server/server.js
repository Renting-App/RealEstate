const express = require("express");
const app = express();
const PORT = 5000
const cors=require('cors');
const db=require('./database/db.js')
const house =require('./routes/houses.js')
// const user = require('./routes/user.js');


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));
app.use('/api',house)

// app.use('/api/users', user);



db.testConnection()

app.listen(PORT, function () {
    console.log("listening on port 5000!");
  });