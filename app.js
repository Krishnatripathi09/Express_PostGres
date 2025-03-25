const express = require("express");
const { authRouter } = require("./routes/auth");
const app = express();

app.use(express.json());

const { connectDB } = require("./config/dbConnection");

const PORT = 3000;

connectDB().then(() => {
  console.log("Connected to DataBase Successfully");

  app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
  });
});

app.use("/", authRouter);
