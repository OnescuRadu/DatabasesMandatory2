const router = require('express').Router({ mergeParams: true });
const { isAuthenticated } = require('../middleware');
const { productRatingController } = require('../controllers');

router.get('/:id', (req, res, next) => {
    productRatingController
        .getProductRatingById(req.params.id)
        .then((productRating) => res.json({ response: productRating }))
        .catch(next);
});

router.get('/product/:id', (req, res, next) => {
    productRatingController
        .getAllProductRatingsByProductId(req.params.id)
        .then((productRatings) => res.json({ response: productRatings }))
        .catch(next);
});

router.post('/', isAuthenticated, (req, res, next) => {
    productRatingController
        .createProductRating(req.body, req.user)
        .then((productRating) => res.json({ response: productRating }))
        .catch(next);
});

router.put('/:id', isAuthenticated, (req, res, next) => {
    productRatingController
        .updateProductRating(req.params.id, req.body, req.user)
        .then((productRating) => res.json({ response: productRating }))
        .catch(next);
});

router.delete('/:id', isAuthenticated, (req, res, next) => {
    productRatingController
        .deleteProductRating(req.params.id, req.user)
        .then((productRating) => res.json({ response: productRating }))
        .catch(next);
});

module.exports = router;
