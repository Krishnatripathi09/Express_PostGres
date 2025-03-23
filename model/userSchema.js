const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.findUserWithFirstLetter = function (text) {
  return this.find({ firstName: { $regex: `${text}$`, $options: "i" } });
};

module.exports = mongoose.model("User", userSchema);
