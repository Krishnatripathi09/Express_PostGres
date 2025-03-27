const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://NewUser12345:NewUser12345@cluster0.dmnbvon.mongodb.net/newDataBaseCreated"
  );
};

module.exports = {
  connectDB,
};
