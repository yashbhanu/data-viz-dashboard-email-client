import express from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const userRouter = express.Router();

userRouter.route("/signup").post(async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if(!email || !password || !name) {
      throw new Error('Enter Email & Password & Name');
    }
    let user = await User.findOne({email: email});
    if(user){
      throw new Error("Sorry a user with this email exists");
    }

    const salt = await bcrypt.genSalt(10);
    const encryptPass = await bcrypt.hash(password,salt);
    user = await User.create({
      name: name,
      email: email,
      password: encryptPass,
    });
    user = user.toObject()
    delete user.password;
    const authToken = jwt.sign({user}, process.env.JWT_SECRET);
    res.status(201).json({authToken})

  } catch (error) {
    res.status(500).json({
      message: error.message || "Bad Request. Please Try Again",
    });
  }
});

userRouter.route("/signin").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      throw new Error('Enter Email & Password & Name');
    }
    let user = await User.findOne({email: email}).lean();
    if(!user){
      throw new Error("Incorrect Email or Password");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
      throw new Error("Incorrect Email or Password");
    }
    delete user.password;
    const authToken = jwt.sign({user}, process.env.JWT_SECRET);
    res.status(200).json({authToken})
  } catch (error) {
    res.status(500).json({
      message: error.message || "Bad Request. Please Try Again",
    });
  }
});

export default userRouter;
