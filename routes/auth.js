const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/userSchema");
const { validateSignUpData } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const data = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await data.save();

    res.status(201).send("User Created Successfully");
  } catch (err) {
    res.status(500).send("Error Occured :" + err);
  }
});

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    res.status(404).send("Please Verify your Credentials : User Not Found");
  }

  const passwordHashed = foundUser.password;

  const verifyUser = await bcrypt.compare(password, passwordHashed);

  if (!verifyUser) {
    res.status(400).send("Please verify your credentials");
  }

  res.status(200).send("Logged-In Successfullly");
});

module.exports = {
  authRouter,
};
