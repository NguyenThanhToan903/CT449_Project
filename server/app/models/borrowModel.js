const mongoose = require("mongoose");
const borrowSchema = mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  borrowedAt: {
    type: Date,
  },
  returnBy: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
});
const BorrowModel = mongoose.model("borrow", borrowSchema);

module.exports = BorrowModel;
