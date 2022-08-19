const router = require('express').Router();
const userRouter = require('./users');
const cardsRouter = require('./cards');

router.get('/users', userRouter);
router.get('/cards', cardsRouter);
router.get('/users/:id', userRouter);

module.exports = router;
