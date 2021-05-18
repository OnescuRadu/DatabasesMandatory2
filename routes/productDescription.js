const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { productDescriptionController } = require('../controllers');

router.get('/:id', (req, res, next) => {
    productDescriptionController
        .getProductDescriptionById(req.params.id)
        .then((productDescription) => res.json({ response: productDescription }))
        .catch(next);
});

router.get('/product/:id', (req, res, next) => {
    productDescriptionController
        .getProductDescriptionsByProductId(req.params.id)
        .then((productDescriptions) => res.json({ response: productDescriptions }))
        .catch(next);
});

router.post('/', isAuthenticated, (req, res, next) => {
    productDescriptionController
        .createProductDescription(req.body)
        .then((productDescription) => res.json({ response: productDescription }))
        .catch(next);
});

router.put('/:id', hasRole('Admin'), (req, res, next) => {
    productDescriptionController
        .updateProductDescription(req.params.id, req.body, req.user)
        .then((productDescription) => res.json({ response: productDescription }))
        .catch(next);
});

router.delete('/:id', hasRole('Admin'), (req, res, next) => {
    productDescriptionController
        .deleteProductDescription(req.params.id, req.user)
        .then((productDescription) => res.json({ response: productDescription }))
        .catch(next);
});

module.exports = router;
