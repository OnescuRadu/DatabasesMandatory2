const router = require('express').Router({ mergeParams: true });
const { hasRole } = require('../middleware');
const { productController } = require('../controllers');

router.get('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    productController
        .getProductGroupById(id)
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
    const id = Number(req.params.id);
    productController
        .updateProductGroup(id, req.body)
        .then((productGroup) => res.json({ response: productGroup }))
        .catch(next);
});

router.delete('/:id', hasRole('Admin'), (req, res, next) => {
    const id = Number(req.params.id);
    productController
        .deleteProductGroup(id)
        .then((productGroup) => res.json({ response: productGroup }))
        .catch(next);
});

module.exports = router;
