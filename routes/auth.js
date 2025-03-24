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

authRouter.get("/user", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 1;
  limit = limit > 50 ? 50 : limit;
  const skip = (page - 1) * 10;

  const user = await User.find({})
    .select("firstName lastName email")
    .skip(skip)
    .limit(limit);

  res.status(200).send("found User =>" + user);
});

authRouter.get("/user/data", async (req, res) => {
  const user = await User.find({
    $and: [{ firstName: req.body.firstName }, { lastName: req.body.lastName }],
  });

  res.status(200).send("Found User ==>" + user);
});

module.exports = authRouter;
