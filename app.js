const express = require("express");
const { authRouter } = require("./routes/auth");
const app = express();
const { connectDB } = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const { profileRouter } = require("./routes/profile");
const { rateLimit } = require("express-rate-limit");
const { fileRouter } = require("./routes/filePath");

app.use(express.json());

const PORT = 3000;

app.use(cookieParser());

connectDB().then(() => {
  console.log("Connected to DataBase Successfully");

  app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
  });
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too Many Requests! Please try After Some-time",
});

app.use("/", limiter);
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", fileRouter);
