const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.js");
const houseRoutes = require("./routes/houses.js");
const reqTour = require("./routes/req.js");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use("/", userRoutes);
app.use("/", houseRoutes);
app.use("/", reqTour);

const db = require("./database/db.js");

const PORT = process.env.PORT || 5800;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}!`);
});
