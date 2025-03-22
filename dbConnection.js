const { Pool } = require("pg"); //pg: PostgreSQL client for Node.js.

//Pool : Pool is a class provided by the pg (node-postgres) library that helps manage multiple database connections efficiently in a PostgreSQL database.
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "619916",
  port: 5432,
});

module.exports = { pool };
