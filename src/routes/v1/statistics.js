const express = require('express');
const mySQL = require('mysql2/promise');
const isLoggedIn = require('../../middleware/auth');
const { mySQLConfig } = require('../../config');

const router = express.Router();

router.get('/incomes', isLoggedIn, async (req, res) => {
  try {
    const con = await mySQL.createConnection(mySQLConfig);
    const [data] = await con.execute(`
    SELECT IFNULL(
      (SELECT SUM(quantity) FROM transactions
      WHERE type = 'income' AND user_id = '${req.user.accountId}'), 0
    ) AS incomesSum
    `);
    await con.end();

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Server issue occured. Please try again' });
  }
});

router.get('/expenses', isLoggedIn, async (req, res) => {
  try {
    const con = await mySQL.createConnection(mySQLConfig);
    const [data] = await con.execute(`
    SELECT IFNULL(
      (SELECT SUM(quantity) FROM transactions
      WHERE type = 'expense' AND user_id = '${req.user.accountId}'),0
    ) AS expensesSum
      `);
    await con.end();

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Server issue occured. Please try again' });
  }
});

router.get('/jars/necessities', isLoggedIn, async (req, res) => {
  try {
    const con = await mySQL.createConnection(mySQLConfig);
    const [data] = await con.execute(`
    SELECT IFNULL(
    (SELECT(SELECT SUM(quantity) * 0.5 FROM transactions
     WHERE type = 'income' AND user_id = '${req.user.accountId}')
     -
    (SELECT IFNULL((SELECT SUM(quantity) FROM transactions
    WHERE subtype = 'necessities' AND user_id = '${req.user.accountId}'), 0
    ))),0) AS necessitiesLeft
    `);
    await con.end();

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Server issue occured. Please try again' });
  }
});

router.get('/jars/education', isLoggedIn, async (req, res) => {
  try {
    const con = await mySQL.createConnection(mySQLConfig);
    const [data] = await con.execute(`
    SELECT IFNULL(
    (SELECT(SELECT SUM(quantity) * 0.1 FROM transactions
     WHERE type = 'income' AND user_id = '${req.user.accountId}')
     -
    (SELECT IFNULL((SELECT SUM(quantity) FROM transactions
    WHERE subtype = 'education' AND user_id = '${req.user.accountId}'), 0
    ))), 0) AS educationLeft
    `);
    await con.end();

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Server issue occured. Please try again' });
  }
});

router.get('/jars/saving', isLoggedIn, async (req, res) => {
  try {
    const con = await mySQL.createConnection(mySQLConfig);
    const [data] = await con.execute(`
    SELECT IFNULL(
    (SELECT(SELECT SUM(quantity) * 0.1 FROM transactions
     WHERE type = 'income' AND user_id = '${req.user.accountId}')
     -
    (SELECT IFNULL((SELECT SUM(quantity) FROM transactions
    WHERE subtype = 'saving' AND user_id = '${req.user.accountId}'), 0
    ))), 0) AS savingLeft
    `);
    await con.end();

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Server issue occured. Please try again' });
  }
});

router.get('/jars/play', isLoggedIn, async (req, res) => {
  try {
    const con = await mySQL.createConnection(mySQLConfig);
    const [data] = await con.execute(`
    SELECT IFNULL(
    (SELECT(SELECT SUM(quantity) * 0.1 FROM transactions
     WHERE type = 'income' AND user_id = '${req.user.accountId}')
     -
    (SELECT IFNULL((SELECT SUM(quantity) FROM transactions
    WHERE subtype = 'play' AND user_id = '${req.user.accountId}'), 0
    ))), 0) AS playLeft
    `);
    await con.end();

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Server issue occured. Please try again' });
  }
});

router.get('/jars/investment', isLoggedIn, async (req, res) => {
  try {
    const con = await mySQL.createConnection(mySQLConfig);
    const [data] = await con.execute(`
    SELECT IFNULL(
    (SELECT(SELECT SUM(quantity) * 0.1 FROM transactions
     WHERE type = 'income' AND user_id = '${req.user.accountId}')
     -
    (SELECT IFNULL((SELECT SUM(quantity) FROM transactions
    WHERE subtype = 'investment' AND user_id = '${req.user.accountId}'), 0
    ))), 0) AS investmentLeft
    `);
    await con.end();

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Server issue occured. Please try again' });
  }
});

router.get('/jars/give', isLoggedIn, async (req, res) => {
  try {
    const con = await mySQL.createConnection(mySQLConfig);
    const [data] = await con.execute(`
    SELECT IFNULL(
    (SELECT(SELECT SUM(quantity) * 0.1 FROM transactions
     WHERE type = 'income' AND user_id = '${req.user.accountId}')
     -
    (SELECT IFNULL((SELECT SUM(quantity) FROM transactions
    WHERE subtype = 'give' AND user_id = '${req.user.accountId}'), 0
    ))), 0) AS giveLeft
    `);
    await con.end();

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Server issue occured. Please try again' });
  }
});

module.exports = router;
