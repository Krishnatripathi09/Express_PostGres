const express = require("express");
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

profileRouter.get("/user", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).send("User Un-Authorized Please Log-In Again");
  }

  const verifyUser = await jwt.verify(token, "MySecretToken%6789");
  const { id } = verifyUser;

  const user = await User.findById(id).select(
    "firstName lastName email createdAt"
  );

  return res.status(200).send("User data Found ==>" + user);
});

module.exports = {
  profileRouter,
};
