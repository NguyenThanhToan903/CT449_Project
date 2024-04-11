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
  borrowDate: {
    type: Date,
  },
  returnDate: {
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
