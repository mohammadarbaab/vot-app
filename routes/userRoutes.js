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

// login api
router.post('/login',async(req,res)=>{
    const {aadharCardNumber,password}=req.body;

    // find the user by username
    const user=await User.findOne({username:username});

    // if user does not exist or password does not match,return error
    if(!user || !(await user.comparePassword(password))){
        return res.status(400).json({message:"Invalid username or password"});
    }

    // generate Token 
    const payload={
        id:user._id,
        username:user.username
    }
    const token =generateToken(payload);
    
})
