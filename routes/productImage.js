const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { productImageController } = require('../controllers');

router.get('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    productImageController
        .getProductImageById(id)
        .then((productImage) => res.json({ response: productImage }))
        .catch(next);
});

router.get('/product/:id', (req, res, next) => {
    const id = Number(req.params.id);
    productImageController
        .getProductImageByProductId(id)
        .then((productImages) => res.json({ response: productImages }))
        .catch(next);
});

//TODO
router.post('/', isAuthenticated, (req, res, next) => {
    productImageController
        .createProductImage(req.body)
        .then((productImage) => res.json({ response: productImage }))
        .catch(next);
});

//TODO
router.put('/:id', hasRole('Admin'), (req, res, next) => {
    const id = Number(req.params.id);
    productImageController
        .updateProductImage(id, req.body, req.user)
        .then((productImage) => res.json({ response: productImage }))
        .catch(next);
});

router.delete('/:id', hasRole('Admin'), (req, res, next) => {
    const id = Number(req.params.id);
    productImageController
        .deleteProductImage(id, req.user)
        .then((productImage) => res.json({ response: productImage }))
        .catch(next);
});

module.exports = router;
