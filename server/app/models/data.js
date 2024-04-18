const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dataSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  timeBorrow: {
    type: Number,
    required: true,
    default: 7 * 24 * 60 * 60 * 1000,
  },
});

const Data = mongoose.model("Data", dataSchema, "data");
module;

module.exports = Data;
