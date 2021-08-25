const mongoose = require("mongoose");

const model = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  service: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },
});

module.exports = mongoose.model("Church_Data", model);
