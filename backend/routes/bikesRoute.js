const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");
const Booking = require("../models/bookingModel");

router.get("/getallbikes", async (req, res) => {
  try {
    const cars = await Car.find();
    // console.log("cars", cars);
    for (let i = 0; i < cars.length; i++) {
      const { _id } = cars[i];
      let numbersOfRatings = 0;
      let sum = 0;
      let average;
      const bookingsFound = await Booking.find({ car: _id });
      // console.log("bookingsFound", bookingsFound);
      for (let i = 0; i < bookingsFound.length; i++) {
        const { rating } = bookingsFound[i];
        sum = sum + rating;
        numbersOfRatings++;
        if (i == bookingsFound.length - 1) {
          // console.log("sum", sum);
          // console.log("numbersOfRatings", numbersOfRatings);
          average = sum / numbersOfRatings;
          // console.log("average", average);
        }
      }
      cars[i] = cars[i].toObject();
      cars[i].rating = average;
    }
    // console.log("cars", cars);
    res.send(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addbikes", async (req, res) => {
  console.log(req.body);
  try {
    // console.log("bike", req.body);
    const newcar = new Car(req.body);
    await newcar.save();
    res.send("Car added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/editbikes", async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.body._id });
    car.name = req.body.name;
    car.image = req.body.image;
    car.model = req.body.model;
    car.color = req.body.color;
    car.location = req.body.location;
    // car.fuelType = req.body.fuelType;
    car.rentPerHour = req.body.rentPerHour;
    // car.capacity = req.body.capacity;

    await car.save();

    res.send("Car details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletebikes", async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.body.carid });

    res.send("Car deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
