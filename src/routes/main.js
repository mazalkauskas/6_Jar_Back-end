const express = require('express');
const mySQL = require('mysql2/promise');
const { mySQLConfig } = require('../config');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const con = await mySQL.createConnection(mySQLConfig);
    const [data] = await con.execute(`
      SELECT * FROM services
      `);
    await con.end();

    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err: 'Server issue occured. Please try again' });
  }
});

module.exports = router;
