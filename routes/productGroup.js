const router = require('express').Router({ mergeParams: true });
const { hasRole } = require('../middleware');
const { productController } = require('../controllers');

router.get('/:id', (req, res, next) => {
    productController
        .getProductGroupById(req.params.id)
        .then((productGroup) => res.json({ response: productGroup }))
        .catch(next);
});

router.get('/', (req, res, next) => {
    productController
        .getAllProductGroups()
        .then((productGroups) => res.json({ response: productGroups }))
        .catch(next);
});

router.post('/', hasRole('Admin'), (req, res, next) => {
    productController
        .createProductGroup(req.body)
        .then((productGroup) => res.json({ response: productGroup }))
        .catch(next);
});

router.put('/:id', hasRole('Admin'), (req, res, next) => {
    productController
        .updateProductGroup(req.params.id, req.body)
        .then((productGroup) => res.json({ response: productGroup }))
        .catch(next);
});

router.delete('/:id', hasRole('Admin'), (req, res, next) => {
    productController
        .deleteProductGroup(req.params.id)
        .then((productGroup) => res.json({ response: productGroup }))
        .catch(next);
});

module.exports = router;
