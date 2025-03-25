const express = require("express");
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const { authMiddleWare } = require("../middlewares/authMiddlleWare");

profileRouter.get("/user", authMiddleWare, async (req, res) => {
  const user = req.user;
  return res.status(200).send("User data Found ==>" + user);
});

module.exports = {
  profileRouter,
};
