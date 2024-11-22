const mongoose = require("mongoose");

const returnedSchema = new mongoose.Schema(
  {
    dateReturned: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    fine: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    borrowed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Borrowed",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Returned", returnedSchema);
