const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { productController } = require('../controllers');

router.get('/', (req, res, next) => {
    productController
        .getAllProductGroups()
        .then((productGroups) => res.json({ response: productGroups }))
        .catch(next);
});

router.post('/', isAuthenticated, upload.single('image'), (req, res, next) => {
    productImageController
        .createProductImage(req)
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
