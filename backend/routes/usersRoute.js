const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/login", async (req, res) => {
  // console.log("login", req.body);
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.send(user);
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    // console.log("test", req.body);
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      // return res.status(666);
      console.log("yes yes");
      res.send("no");
    } else {
      let userobj = req.body;
      if (userobj.isAdmin == null) {
        userobj.isAdmin = false;
      }
      // console.log("user", userobj);
      const newuser = new User(req.body);
      await newuser.save();
      res.send("yes");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/edituser", async (req, res) => {
  try {
    // console.log("update obj", req.body);
    const user = await User.findOne({ _id: req.body._id });
    user.username = req.body.username;
    user.password = req.body.password;
    user.isAdmin = req.body.isAdmin;

    await user.save();

    res.send("User details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deleteuser", async (req, res) => {
  try {
    // console.log("del id", req.body);
    await User.findOneAndDelete({ _id: req.body.id });

    res.send("User deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
