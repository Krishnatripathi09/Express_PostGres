const express = require("express");
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const { authMiddleWare } = require("../middlewares/authMiddlleWare");
const { validatEditProfileData } = require("../utils/validation");

profileRouter.get("/user", authMiddleWare, async (req, res) => {
  const user = req.user;
  return res.status(200).send("User data Found ==>" + user);
});

profileRouter.patch("/user/edit", authMiddleWare, async (req, res) => {
  try {
    if (!validatEditProfileData(req)) {
      return res.status(400).send("Edit Not Allowed On This Field");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({ message: `${loggedInUser.firstName}`, data: loggedInUser });
  } catch (err) {
    res.status(400).send("Error ==>" + err);
  }
});

module.exports = {
  profileRouter,
};
