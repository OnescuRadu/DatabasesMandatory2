const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { sellerController } = require('../controllers');

router.get('/search', isAuthenticated, (req, res, next) => {
    const query = req.query.q;
    sellerController.findSellers(query)
        .then(sellers => res.json({ response: sellers }))
        .catch(next);
});

router.get('/byProduct/:id', isAuthenticated, (req, res, next) => {
    sellerController.findByProduct(req.params.id)
        .then(sellers => res.json({ response: sellers }))
        .catch(next);
});

router.get('/:id', isAuthenticated, (req, res, next) => {
    sellerController.getSellerById(req.params.id)
        .then(seller => res.json({ response: seller }))
        .catch(next);
});

router.get('/', isAuthenticated, (req, res, next) => {
    sellerController.getAllSellers()
        .then(sellers => res.json({ response: sellers }))
        .catch(next);
});

router.post('/', hasRole("Admin"), (req, res, next) => {
    sellerController.createSeller(req.body)
        .then(seller => res.json({ response: seller }))
        .catch(next);
});

router.put('/:id', hasRole("Manager", "Admin"), (req, res, next) => {
    sellerController.updateSeller(req.params.id, req.body, req.user.id)
        .then(seller => res.json({ response: seller }))
        .catch(next);
});

router.delete('/:id', hasRole("Admin"), (req, res, next) => {
    sellerController.deleteSeller(req.params.id)
        .then(seller => res.json({ response: seller }))
        .catch(next);
});

module.exports = router;
