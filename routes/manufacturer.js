const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { manufacturerController } = require('../controllers');

router.get('/', isAuthenticated, (req, res, next) => {
    const pageNumber = req.query.page;
    const pageSize = req.query.size;
    manufacturerController.getManufacturers(pageNumber, pageSize)
        .then(manufacturers => res.json({ response: manufacturers }))
        .catch(next);
});

router.get('/search', isAuthenticated, (req, res, next) => {
    const query = Number(req.query.q);
    manufacturerController.findManufacturers(query)
        .then(manufacturers => res.json({ response: manufacturers }))
        .catch(next);
});

router.get('/:id', isAuthenticated, (req, res, next) => {
    const id = Number(req.params.id);
    manufacturerController.getById(id)
        .then(manufacturer => res.json({ response: manufacturer }))
        .catch(next);
});

router.post('/', hasRole("Admin"), (req, res, next) => {
    manufacturerController.createManufacturer(req.body)
        .then(manufacturer => res.json({ response: manufacturer }))
        .catch(next);
});

router.patch('/:id', hasRole("Admin"), (req, res, next) => {
    const id = Number(req.params.id);
    manufacturerController.updateManufacturer(id, req.body)
        .then(manufacturer => res.json({ response: manufacturer }))
        .catch(next);
});

router.delete('/:id', hasRole("Admin"), (req, res, next) => {
    const id = Number(req.params.id);
    manufacturerController.deleteManufacturer(id)
        .then(category => res.json({ response: category }))
        .catch(next);
});

module.exports = router;
