const express = require("express");
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { authMiddleWare } = require("../middlewares/authMiddlleWare");
const {
  validatEditProfileData,
  validateSignUpData,
} = require("../utils/validation");

profileRouter.get("/user", authMiddleWare, async (req, res) => {
  const user = req.user;
  return res.status(200).send("User data Found ==>" + user);
});

profileRouter.patch("/user/edit", authMiddleWare, async (req, res) => {
  try {
    validateSignUpData(req);
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

profileRouter.patch("/user/password", authMiddleWare, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).send("Old and New Password Both are Required");
  }

  const loggedInUser = req.user;

  const isVaildPWD = await bcrypt.compare(oldPassword, loggedInUser.password);

  if (!isVaildPWD) {
    res.status(400).send("Please Enter Valid Old Password");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  loggedInUser.password = hashedPassword;

  await loggedInUser.save();

  res.status(200).send("Password Updated SuccessFully");
});

module.exports = {
  profileRouter,
};
