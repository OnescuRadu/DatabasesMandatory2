const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { sellerProdController } = require('../controllers');

// req.seller is available in this router

router.get('/:id', isAuthenticated, (req, res, next) => {
    const id = Number(req.params.id);
    sellerProdController.getById(req.seller.id, id)
        .then(sellerProduct => res.json({ response: sellerProduct }))
        .catch(next);
});

router.get('/', isAuthenticated, (req, res, next) => {
    sellerProdController.getAll(req.seller.id)
        .then(sellerProducts => res.json({ response: sellerProducts }))
        .catch(next);
});

router.post('/', hasRole("Manager", "Admin"), (req, res, next) => {
    sellerProdController.addProduct(req.seller, req.user, req.body)
        .then(sellerProduct => res.json({ response: sellerProduct }))
        .catch(next);
});

router.put('/:id', hasRole("Manager", "Admin"), (req, res, next) => {
    const id = Number(req.params.id);
    sellerProdController.updateProduct(req.seller, req.user, id, req.body)
        .then(sellerProduct => res.json({ response: sellerProduct }))
        .catch(next);
});

router.delete('/:id', hasRole("Manager", "Admin"), (req, res, next) => {
    const id = Number(req.params.id);
    sellerProdController.deleteProduct(req.seller, req.user, id)
        .then(sellerProduct => res.json({ response: sellerProduct }))
        .catch(next);
});

module.exports = router;