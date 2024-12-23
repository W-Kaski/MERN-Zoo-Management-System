const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
  },
  zooName: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("admin", adminSchema);
