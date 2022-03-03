const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: Number, 
    required: true,
    maxlength: 12, 
    unique: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  address: String,
  dob: String,
  state: String, 
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
