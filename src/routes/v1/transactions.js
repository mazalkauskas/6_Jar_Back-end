const express = require('express');
const mySQL = require('mysql2/promise');
const isLoggedIn = require('../../middleware/auth');
const { mySQLConfig } = require('../../config');
// const validation = require('../../middleware/validation');
// const { incomePostSchema } = require('../../middleware/Modules/contentSchemas');

const router = express.Router();

const currentTime = () => {
  const Now = new Date();
  const formatedDate =
    [Now.getFullYear(), Now.getMonth() + 1, Now.getDate()].join('/') +
    ' ' +
    [Now.getHours(), Now.getMinutes()].join(':');
  return formatedDate;
};

setInterval(currentTime, 60000);

router.post('/add/income', isLoggedIn, async (req, res) => {
  try {
    const con = await mySQL.createConnection(mySQLConfig);
    const [data] = await con.execute(`
    INSERT INTO transactions (user_id, type, subtype, description, quantity, date)
    VALUES(
    ${mySQL.escape(req.user.accountId)},
    ${mySQL.escape(req.body.type)},
    ${mySQL.escape(req.body.subtype)},
    ${mySQL.escape(req.body.description)},
    ${mySQL.escape(req.body.quantity)},
    '${currentTime()}'
    )`);
    await con.end();

    if (!data.insertId) {
      return res.status(500).send({ err: 'Server issue occured. Please try again later' });
    }

    return res.send({ msg: 'Succesfully added income' });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Server issue occured. Please try again' });
  }
});

router.post('/add/expense', isLoggedIn, async (req, res) => {
  try {
    const con = await mySQL.createConnection(mySQLConfig);
    const [data] = await con.execute(`
    INSERT INTO transactions (user_id, type, subtype, description, quantity, date)
    VALUES(
    ${mySQL.escape(req.user.accountId)},
    ${mySQL.escape(req.body.type)},
    ${mySQL.escape(req.body.subtype)},
    ${mySQL.escape(req.body.description)},
    ${mySQL.escape(req.body.quantity)},
    '${currentTime()}'
    )`);
    await con.end();

    if (!data.insertId) {
      return res.status(500).send({ err: 'Server issue occured. Please try again later' });
    }

    return res.send({ msg: 'Succesfully added an expense' });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Server issue occured. Please try again' });
  }
});

router.get('/latest-history', isLoggedIn, async (req, res) => {
  try {
    const con = await mySQL.createConnection(mySQLConfig);
    const [data] = await con.execute(`
    SELECT * FROM transactions ORDER BY date DESC
    LIMIT 5
    `);
    await con.end();

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Server issue occured. Please try again' });
  }
});

router.get('/all-history', isLoggedIn, async (req, res) => {
  try {
    const con = await mySQL.createConnection(mySQLConfig);
    const [data] = await con.execute(`
    SELECT * FROM transactions ORDER BY date DESC
    `);
    await con.end();

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Server issue occured. Please try again' });
  }
});

module.exports = router;
