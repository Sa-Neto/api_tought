const router = require('express').Router();
const userRouter = require('./UserRoute');
const toughtRouter = require('./ToughtRouter');

router.use('/', userRouter);
router.use('/tought', toughtRouter);

module.exports = router;
