const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    housecode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    posCode: {
      type: Number,
      required: true,
    },
    rtRw: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
