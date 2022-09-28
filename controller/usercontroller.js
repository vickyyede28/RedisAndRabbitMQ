const express = require("express");

const router = express.Router();

const User = require("../model/userModel");

router.get("/", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    // console.log(user);
    return res.status(200).send(user);
  } catch (error) {
    // console.log(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(user);
    return res.status(201).send("Succesfully Registered!!!");
  } catch (error) {
    console.log(error);
  }
});

router.patch("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedata = req.body;
    const user = await User.findByIdAndDelete(id, updatedata);
    res.send("Updated Data Sucessfully");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.send("Deleted Data Sucessfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router
