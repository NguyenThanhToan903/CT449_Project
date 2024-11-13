const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deleteAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const ReaderModel = mongoose.model("Reader", userSchema);

module.exports = ReaderModel;
