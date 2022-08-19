const express = require('express');
const path = require('path');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.static(path.join(__dirname, 'root')));
app.use(router);
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
