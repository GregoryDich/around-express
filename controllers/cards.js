const Card = require('../models/card');

module.exports.deleteCard = (req, res) => {
  Card.findOneAndDelete(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'NotValid Data' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Card not found' });
      }
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid data' });
        return;
      }
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'NotValid Data' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Card not found' });
      }
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'NotValid Data' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Card not found' });
      }
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};
