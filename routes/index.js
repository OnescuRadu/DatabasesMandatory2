const APIError = require('../utils/APIError');
const router = require('express').Router();
const db = require('../db');

router.use('/auth', require('./auth'));
router.use('/order', require('./order'));
router.use('/manufacturer', require('./manufacturer'));
router.use('/product', require('./product'));
router.use('/seller', require('./seller'));
router.use(
    '/seller/:id/products',
    function (req, res, next) {
        const sellerId = req.params.id;
        db.seller
            .findFirst({ where: { id: sellerId, deleted: false } })
            .then((seller) => {
                if (!seller) {
                    throw new APIError('Seller does not exist.', 404);
                }
                req.seller = seller;
                next();
            })
            .catch(next);
    },
    require('./sellerProducts')
);
router.use('/user', require('./user'));
router.use('/product-rating', require('./productRating'));
router.use('/product-description', require('./productDescription'));
router.use('/product-image', require('./productImage'));
router.use('/product-group', require('./productGroup'));
router.use('/property', require('./property'));

module.exports = router;
