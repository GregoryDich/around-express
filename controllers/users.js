const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'No user found with that id' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid data' });
      }
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid data' });
      }
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findOneAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'No user found with that id' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid data' });
      }
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findOneAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid URL' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid data' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'No user found with that id' });
      }
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};
