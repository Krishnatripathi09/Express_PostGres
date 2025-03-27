const mongoose = require("mongoose");
const validator = require("validator");
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      //  required: true,
      minLength: 5,
      maxLength: 40,
    },

    lastName: {
      type: String,
      //required: true,
      minLength: 3,
      maxLength: 40,
    },
    email: {
      type: String,
      //required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please Enter Valid Email");
        }
      },
    },
    password: {
      type: String,
      //required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please Enter Strong Password");
        }
      },
    },
    name: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.verifyPWD = async function (passwordInputByUser) {
  const user = this;

  const passwordHash = user.password;

  const isValidPassword = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isValidPassword;
};

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await Jwt.sign({ id: user._id }, "MySecretToken%6789", {
    expiresIn: "7d",
  });

  return token;
};

module.exports = mongoose.model("User", userSchema);
