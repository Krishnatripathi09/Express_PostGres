const express = require("express");
const authRouter = require("./routes/auth");
const {User} = require("./model/userSchema")
const app = express();

app.use(express.json());

const { connectDB } = require("./config/dbConnection");
const { where } = require("./model/userSchema");
const userSchema = require("./model/userSchema");

const PORT = 3000;

app.use("/", authRouter);
connectDB().then(() => {
  console.log("Connected to DataBase Successfully");

  app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
  });
});


