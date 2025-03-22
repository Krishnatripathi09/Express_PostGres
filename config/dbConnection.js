const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://fiwesok606:sXdgMYncEVnXue1T@cluster0.s89mg.mongodb.net/newDataBase"
  );
};

module.exports = {
  connectDB,
};
