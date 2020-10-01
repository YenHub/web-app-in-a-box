const DBConnector = require('../utils/database/DBConnector');
const log = require('../utils/logger');

exports.index = (req, res, next) => {
    let success = 'THE API IS NOT A ☕ POT';
    let failure = 'THE API IS A ☕ POT';
    let handleFailure = (err) => {
        log(`Connected to pool`);
        res.send(failure);
        throw err;
    };
    DBConnector.getConnection( (err, con) => {
      if (err) (handleFailure(err));
      log(`Connected to pool`);
      con.query(`CREATE DATABASE IF NOT EXISTS newDB`, function (err, result) {
        if (err) (handleFailure(err));
        log(`newDB EXISTS`);
        log(JSON.stringify(result));
        res.send(success);
      });
      con.release();
    });
};

exports.testPayload = (req, res, next) => {
    res.json({status:'THE API IS NOT A TEAPOT'});
};