const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { generateToken } = require("../jwt");

// post route
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    const newUser = new User(data);

    const savedPerson = await newUser.save();

    const payload = {
      id: response.id,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(savedPerson.username);
    console.log("token is ", token);
    res.status(200).json({ response: savedPerson, token: token });

    console.log("responnse done", savedPerson);
    res.status(200).json(savedPerson);
    console.log("data saved succesfully", savedPerson);
  } catch (error) {
    res.status(400).send(error);
  }
});
