const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { generateToken, jwtAuthMiddleware } = require("../jwt");

// post route
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    const newUser = new User(data);

    const response = await newUser.save();

    const payload = {
      id: response.id,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("token is ", token);
    res.status(200).json({ response: response, token: token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// login api
router.post("/login", async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;

    // find the user by username
    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

    // if user does not exist or password does not match,return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // generate Token
    const payload = {
      id: user._id,
    };
    const token = generateToken(payload);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get method for person data
router.get("/profile", async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const user = await Person.findById(userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// put method for update any user data
router.put("/profile/password", async (req, res) => {
  try {
    const userId = req.user;
    const { currentPassword, newPassword } = req.body;

    // find  the user by UserId
    const user = await User.findById(userId);

    // if user does not exist or password does not match return error
    if (!user || (await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // update the users password
    user.password = newPassword;
    await user.save();

    console.log("password updated");
    res.status(200).json({ message: "password updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;
