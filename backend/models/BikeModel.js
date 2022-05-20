const mongoose = require("mongoose");

const BikeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    // capacity: { type: Number, required: true },
    // fuelType: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    location: { type: String, required: true },
    bookedTimeSlots: [
      {
        from: { type: String, required: true },
        to: { type: String, required: true },
      },
    ],
    isBooked: { type: Boolean, required: false, default: false },
    rentPerHour: { type: Number, required: true },
  },
  { timestamps: true }
);
const BikeModel = mongoose.model("bikes", BikeSchema);
module.exports = BikeModel;
