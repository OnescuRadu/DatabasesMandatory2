const router = require('express').Router({ mergeParams: true });
const { isAuthenticated } = require('../middleware');
const { productRatingController } = require('../controllers');

router.get('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    productRatingController
        .getProductRatingById(id)
        .then((productRating) => res.json({ response: productRating }))
        .catch(next);
});

router.get('/product/:id', (req, res, next) => {
    const id = Number(req.params.id);
    productRatingController
        .getAllProductRatingsByProductId(id)
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
    const id = Number(req.params.id);
    productRatingController
        .updateProductRating(id, req.body, req.user)
        .then((productRating) => res.json({ response: productRating }))
        .catch(next);
});

router.delete('/:id', isAuthenticated, (req, res, next) => {
    const id = Number(req.params.id);
    productRatingController
        .deleteProductRating(id, req.user)
        .then((productRating) => res.json({ response: productRating }))
        .catch(next);
});

module.exports = router;
