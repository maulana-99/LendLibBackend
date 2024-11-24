const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    telp: {
      type: String,
      required: true,
      unique: true,
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
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);
