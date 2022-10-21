const mysql = require("mysql2");
const dbconfig = require("../config/db.json");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
