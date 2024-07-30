const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: Number, required: true },
    isPremium: true
  },
  {
    timestamps: true,
    collection: "user",
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
