const router = require('express').Router();

router.use('/', require('./test'));
router.use('/auth', require('./auth'));
router.use('/product', require('./product'));
router.use('/seller', require('./seller'));
router.use('/user', require('./user'));
router.use('/manufacturer', require('./manufacturer'));

module.exports = router;
