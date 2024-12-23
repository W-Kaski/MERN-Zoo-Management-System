const mongoose = require("mongoose");

const animalSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  AnimalSpecies: {
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
  zookeeperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "zookeeper",
    required: true,
  },
  diet: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "animal",
  },
});

module.exports = mongoose.model("animal", animalSchema);
