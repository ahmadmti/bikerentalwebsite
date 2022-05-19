const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/userModel");

const stripe = require("stripe")(process.env.BACK_END_STRIPE_KEY);
router.post("/bookcar", async (req, res) => {
  const { token } = req.body;
  try {
    // console.log("booking", req.body);
    // const customer = await stripe.customers.create({
    //   email: token.email,
    //   source: token.id,
    // });

    // const payment = await stripe.charges.create(
    //   {
    //     amount: req.body.totalAmount * 100,
    //     currency: "inr",
    //     customer: customer.id,
    //     receipt_email: token.email,
    //   },
    //   {
    //     idempotencyKey: uuidv4(),
    //   }
    // );

    // if (payment) {
    // req.body.transactionId = payment.source.id;
    const findUser = await User.findOne({ _id: req.body.user });
    let userName = findUser?.username;
    console.log("user name", userName);
    let bookObj = {
      car: req?.body.car,
      user: req?.body.user,
      username: userName,
      bookedTimeSlots: req.body.bookedTimeSlots,
      totalHours: req.body.totalHours,
      totalAmount: req.body.totalAmount,
      isBooked: true,
    };
    const newbooking = new Booking(bookObj);
    await newbooking.save();
    const car = await Car.findOne({ _id: req.body.car });
    // console.log(req.body.car);
    car.bookedTimeSlots.push(req.body.bookedTimeSlots);
    car.isBooked = true;

    await car.save();
    res.send("Your booking is successfull");
    // } else {
    //   return res.status(400).json(error);
    // }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car");
    let currentBookings = bookings.filter((item) => item.isBooked == true);
    res.send(currentBookings);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/cancelBooking", async (req, res) => {
  try {
    // console.log("cancel obj", req.body);
    const car = await Car.findOne({ _id: req.body._id });
    const booking = await Booking.findOne({ car: req.body._id });
    car.isBooked = false;
    booking.isBooked = false;
    // console.log(booking, "booking");
    // console.log(car, "car");
    await booking.save();
    await car.save();

    res.send("Booking canceled successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/setRating", async (req, res) => {
  try {
    // console.log("test", req.body.stars);
    const { _id } = req.body;
    const booking = await Booking.findOne({ _id: req.body._id });
    // console.log("booking", booking);
    booking.rating = req.body.stars;
    booking.save();
    res.send("Rated");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/getRating", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car");
    let currentBookings = bookings.filter((item) => item.isBooked == true);
    res.send(currentBookings);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/GetusersOfabike", async (req, res) => {
  // console.log("boy", req.body);
  try {
    const { _id } = req.body;
    const booking = await Booking.find({ car: _id });

    // for (let i = 0; i < booking.length; i++) {
    //   const { user } = booking[i];
    //   const userFound = await User.findOne({ _id: user });
    //   const { username } = userFound;
    //   booking[i] = booking[i].toObject();
    //   booking[i].username = username;
    // }
    // console.log("booking", booking);
    res.status(200).json(booking);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/GetBikesOfaUser", async (req, res) => {
  try {
    //received bike id
    const { _id } = req.body;

    const booking = await Booking.find({ user: _id });

    for (let i = 0; i < booking.length; i++) {
      const { car } = booking[i];
      const userFound = await Car.findOne({ _id: car });
      const { name } = userFound;
      booking[i] = booking[i].toObject();
      booking[i].bikename = name;
    }
    // console.log("booking", booking);
    res.status(200).json(booking);
    // res.send("Car details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});
module.exports = router;
