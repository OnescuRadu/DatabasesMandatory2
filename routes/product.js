const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { productController, categoryController } = require('../controllers');

router.get('/', isAuthenticated, (req, res, next) => {
    productController
        .getAllProducts()
        .then((products) => res.json({ response: products }))
        .catch(next);
});

router.get('/categories', isAuthenticated, (req, res, next) => {
    categoryController
        .getAllCategories()
        .then((categories) => res.json({ response: categories }))
        .catch(next);
});

router.get('/:id', isAuthenticated, (req, res, next) => {
    const id = Number(req.params.id);
    productController
        .getProductById(id)
        .then((product) => res.json({ response: product }))
        .catch(next);
});

router.post('/', hasRole('Admin'), (req, res, next) => {
    productController
        .createProduct(req.body)
        .then((product) => res.json({ response: product }))
        .catch(next);
});

router.post('/categories', hasRole('Admin'), (req, res, next) => {
    categoryController
        .createCategory(req.body)
        .then((category) => res.json({ response: category }))
        .catch(next);
});

router.delete('/categories/:id', hasRole('Admin'), (req, res, next) => {
    const id = Number(req.params.id);
    categoryController
        .deleteCategory(id)
        .then((category) => res.json({ response: category }))
        .catch(next);
});

router.put('/group', hasRole('Admin'), (req, res, next) => {
    productController
        .addProductToGroup(req.body)
        .then((product) => res.json({ response: product }))
        .catch(next);
});

router.delete('/:productId/group/:groupId', hasRole('Admin'), (req, res, next) => {
    const productId = Number(req.params.productId);
    const groupId = Number(req.params.groupId);

    productController
        .removeProductFromGroup(productId, groupId)
        .then((product) => res.json({ response: product }))
        .catch(next);
});

router.put('/description', hasRole('Admin'), (req, res, next) => {
    productController
        .addDescriptionToProduct(req.body)
        .then((product) => res.json({ response: product }))
        .catch(next);
});

router.post('/property', hasRole('Admin'), (req, res, next) => {
    productController
        .addPropertyToProduct(req.body)
        .then((product) => res.json({ response: product }))
        .catch(next);
});

router.delete('/property/:propertyId', hasRole('Admin'), (req, res, next) => {
    const propertyId = Number(req.params.propertyId);

    productController
        .removeProperty(propertyId)
        .then((product) => res.json({ response: product }))
        .catch(next);
});

module.exports = router;
