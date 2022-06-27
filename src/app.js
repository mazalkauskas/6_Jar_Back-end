const express = require('express');
const cors = require('cors');
const { serverPort } = require('./config');
const mainRoutes = require('./routes/main');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send({ msg: 'Welcome to X back-end app' });
});

app.use('/main', mainRoutes);

app.all('*', (req, res) => {
  res.status(404).send({ err: 'Page not found' });
});

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});
