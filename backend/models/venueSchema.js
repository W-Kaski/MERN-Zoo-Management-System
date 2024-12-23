const mongoose = require("mongoose");

const venueSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    animals: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "animal",
      required: true,
    },
    zookeeper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "zookeeper",
      required: true,
    },
    zooName: {
      type: String,
      required: true,
    },
    zooId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("venue", venueSchema);