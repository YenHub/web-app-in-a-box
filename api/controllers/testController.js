const DBConnector = require('../utils/database/DBConnector');
const { apiLog } = require('../utils/logger');

exports.index = (req, res, next) => {
    let success = 'THE API IS NOT A ☕ POT';
    let failure = 'THE API IS A ☕ POT';
    let handleFailure = (err) => {
        apiLog(`Connected to pool`);
        res.send(failure);
        throw err;
    };
    DBConnector.getConnection( (err, con) => {
      if (err) (handleFailure(err));
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
        if (err) (handleFailure(err));
        apiLog(`testDB EXISTS`);
        apiLog(`Total Successful Test API Calls: ${result.slice(-1)[0][0].HitCount} 🎉`);
        res.send(`${result.slice(-1)[0][0].HitCount.toString()} Successful API Calls`);
      });
      con.release();
    });
};

exports.testPayload = (req, res, next) => {
    res.json({status:'THE API IS NOT A TEAPOT'});
};