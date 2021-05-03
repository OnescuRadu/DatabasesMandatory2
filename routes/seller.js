const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { sellerController } = require('../controllers');

router.get('/', isAuthenticated, (req, res, next) => {
    sellerController.getAllSellers()
        .then(sellers => res.json({ response: sellers }))
        .catch(next);
});

router.get('/:id', isAuthenticated, (req, res, next) => {
    const id = Number(req.params.id);
    sellerController.getSellerById(id)
        .then(seller => res.json({ response: seller }))
        .catch(next);
});

router.post('/', hasRole("Admin"), (req, res, next) => {
    sellerController.createSeller(req.body)
        .then(seller => res.json({ response: seller }))
        .catch(next);
});

module.exports = router;
