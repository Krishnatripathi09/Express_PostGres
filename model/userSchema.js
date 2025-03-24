const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 40,
    },

    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 40,
    },
    email: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please Enter Valid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please Enter Strong Password");
        }
      },
    },
  },
  { timestamps: true }
);

userSchema.statics.findUserWithFirstLetter = function (text) {
  return this.find({ firstName: { $regex: `${text}$`, $options: "i" } });
};

module.exports = mongoose.model("User", userSchema);
