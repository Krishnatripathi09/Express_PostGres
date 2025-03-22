const express = require("express");

const app = express();
const { pool } = require("./dbConnection");
const PORT = 3000;

pool
  .connect()
  .then(() => {
    console.log("Connected to the database SuccessFully");
    app.listen(PORT, () => {
      console.log(`Server is Running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/signup", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const query = `Insert INTO USERS (firstName,lastName,email,password) VALUES {$1, $2, $3, $4} RETURNING *`;

  
});
