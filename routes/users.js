const userRouter = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

userRouter.get('/users', (req, res) => {
  fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send({ err });
    });
});

userRouter.get('/users/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8')
    .then((data) => {
      const fileData = Array.from(JSON.parse(data));
      const currentUser = fileData.filter((user) => user._id === [req.params.id].toString());
      if (currentUser.length === 0) {
        res.statusCode = 404;
        res.send({ message: 'User ID not found' });
      }
      res.send(currentUser);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = userRouter;
