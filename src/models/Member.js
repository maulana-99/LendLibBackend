const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    telp: {
      type: String,
      required: true,
      unique: [true],
    },
    dateBorn: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
