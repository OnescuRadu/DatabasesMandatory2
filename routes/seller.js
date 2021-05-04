const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { sellerController } = require('../controllers');

router.get('/search', isAuthenticated, (req, res, next) => {
    console.log("Search");
    const query = req.query.q;
    sellerController.findSellers(query)
        .then(sellers => res.json({ response: sellers }))
        .catch(next);
});

router.get('/:id', isAuthenticated, (req, res, next) => {
    console.log("By id");
    const id = Number(req.params.id);
    sellerController.getSellerById(id)
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
    const id = Number(req.params.id);
    sellerController.updateSeller(id, req.body, req.user.id)
        .then(seller => res.json({ response: seller }))
        .catch(next);
});

router.delete('/:id', hasRole("Admin"), (req, res, next) => {
    const id = Number(req.params.id);
    sellerController.deleteSeller(id)
        .then(seller => res.json({ response: seller }))
        .catch(next);
});

module.exports = router;
