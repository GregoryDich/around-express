const cardsRouter = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

cardsRouter.get('/cards', (req, res) => {
  fs.readFile(path.join(__dirname, '../data/cards.json'), 'utf8')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send({ err });
    });
});

module.exports = cardsRouter;
