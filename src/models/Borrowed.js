const mongoose = require("mongoose");

const borrowedSchema = new mongoose.Schema(
  {
    dateBorrow: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    dateReturn: {
      type: Date,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Borrowed", borrowedSchema);
