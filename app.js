const express = require("express");
const { authRouter } = require("./routes/auth");
const app = express();
const { connectDB } = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const { profileRouter } = require("./routes/profile");

app.use(express.json());

const PORT = 3000;

app.use(cookieParser());

connectDB().then(() => {
  console.log("Connected to DataBase Successfully");

  app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
  });
});
app.use("/", authRouter);
app.use("/", profileRouter);
