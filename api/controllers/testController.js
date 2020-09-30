var mysql = require('mysql');
require('dotenv/config'); // load everything from `.env` file into the `process.env` variable
const { DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST } = process.env;

var con = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
  con.query(`CREATE DATABASE IF NOT EXISTS newDB`, function (err, result) {
    if (err) throw err;
    console.log('Database created');
    console.log(result);
  });
});

exports.index = (req, res, next) => {
    res.send('THE API IS NOT A ☕ POT');
};

exports.testPayload = (req, res, next) => {
    res.json({status:'THE API IS NOT A TEAPOT'});
};