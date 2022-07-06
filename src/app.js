const express = require('express');
const cors = require('cors');
const { serverPort } = require('./config');
const userRoutes = require('./routes/v1/users');
const transactionsRoutes = require('./routes/v1/transactions');
const statisticsRoutes = require('./routes/v1/statistics');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send({ msg: 'Welcome to 6 Jar back-end app' });
});

app.use('/v1/users/', userRoutes);
app.use('/v1/transactions/', transactionsRoutes);
app.use('/v1/statistics/', statisticsRoutes);

app.all('*', (req, res) => {
  res.status(404).send({ err: 'Page not found' });
});

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});
