const Jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const authMiddleWare = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Please Log-In Again");
    }

    const decodedMsg = await Jwt.verify(token, "MySecretToken%6789");

    const { id } = decodedMsg;

    const user = await User.findById(id).select(
      "firstName lastName email createdAt"
    );

    if (!user) {
      return res.status(404).send("User Not Found 😑");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error :" + err);
  }
};

module.exports = {
  authMiddleWare,
};
