const mongoose = require("mongoose");

const zookeeperSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  zooId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "venue",
    required: true,
  },
  animals: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "animal",
    required: true,
  },
  role: {
    type: String,
    default: "zookeeper",
  },
});

module.exports = mongoose.model("zookeeper", zookeeperSchema);