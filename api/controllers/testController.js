const DBConnector = require('../utils/database/DBConnector');
const { apiLog } = require('../utils/logger');


const success = 'THE API IS NOT A ☕ POT';
const failure = 'THE API IS A ☕ POT';
const handleFailure = (err, res) => {
    apiLog(`Connected to pool`);
    res.send(failure);
    throw err;
};

exports.index = (req, res, next) => {
    DBConnector.getConnection( (err, con) => {
      if (err) (handleFailure(err, res));
      apiLog(`Connected to pool`);
      let sqlStatement = `CREATE DATABASE IF NOT EXISTS testDB;
          USE testDB;
          CREATE TABLE IF NOT EXISTS testTable(
              ID int NOT NULL AUTO_INCREMENT,
              HitCount int,
              PRIMARY KEY (ID)
          );
          INSERT IGNORE INTO testTable SET ID = 1, HitCount = 1;
          UPDATE testTable SET HitCount = HitCount + 1 WHERE ID = 1;
          SELECT HitCount FROM testTable WHERE ID = 1`;
      con.query( sqlStatement, function (err, result) {
        if (err) (handleFailure(err, res));
        apiLog(`CREATED API CALL`);
        apiLog(`Total Successful Test API Calls: ${result.slice(-1)[0][0].HitCount} 🎉`);
        res.status(200).send(`${result.slice(-1)[0][0].HitCount.toString()} Successful API Calls`);
      });
      con.release();
    });
};

exports.reset = (req, res, next) => {
    DBConnector.getConnection( (err, con) => {
      if (err) (handleFailure(err, res));
      apiLog(`Connected to pool`);
      let sqlStatement = `UPDATE testTable SET HitCount = '0' WHERE testTable.ID = 1;
          SELECT HitCount FROM testTable WHERE ID = 1`;
      con.query( sqlStatement, function (err, result) {
        if (err) (handleFailure(err, res));
        apiLog(`RESET API CALLS`);
        res.status(200).send(`API Calls Reset`);
      });
      con.release();
    });
};

exports.testPayload = (req, res, next) => {
    res.json({status:'THE API IS NOT A TEAPOT ☕'});
};