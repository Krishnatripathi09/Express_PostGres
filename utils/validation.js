const validator = require("validator");
const validateSignUpData = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("FirstName and lastName are required");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("First name should be between 4 and 50 fifty Characters");
  } else if (lastName.length < 3 || lastName.length > 30) {
    throw new Error("lastName Should be between 3 to 30 Characters");
  } else if (!validator.isEmail(email)) {
    throw new Error("Please Enter Valid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter Strong Password");
  }
};

module.exports = {
  validateSignUpData,
};
