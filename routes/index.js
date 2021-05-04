const APIError = require('../utils/APIError');
const router = require('express').Router();
const db = require('../db');

router.use('/', require('./test'));
router.use('/auth', require('./auth'));
router.use('/order', require('./order'));
router.use('/manufacturer', require('./manufacturer'));
router.use('/product', require('./product'));
router.use('/seller', require('./seller'));
router.use('/seller/:id/products', function (req, res, next) {
    sellerId = Number(req.params.id);
    if (Number.isNaN(sellerId)) {
        throw new APIError("Invalid seller id", 400);
    }
    db.seller.findFirst({ where: { id: sellerId, deleted: false }})
        .then(seller => {
            if (!seller) {
                throw new APIError("Seller does not exist.", 404);
            }
            req.seller = seller;
            next();
        }).catch(next)
}, require('./sellerProducts'));
router.use('/user', require('./user'));

module.exports = router;
