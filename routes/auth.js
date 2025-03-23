const express = require("express");
const authRouter = express.Router();
const User = require("../model/userSchema");

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const data = new User({
    firstName,
    lastName,
    email,
    password,
  });

  await data.save();

  res.status(201).send("User Created Successfully");
});

module.exports = authRouter;

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
  const user = await User.findUserWithFirstLetter(req.body.firstName);

  res.status(200).send("Found User ==>" + user);
});
