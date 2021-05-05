const router = require('express').Router({ mergeParams: true });
const { hasRole } = require('../middleware');
const { propertyController } = require('../controllers');

router.get('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    propertyController
        .getPropertyById(id)
        .then((property) => res.json({ response: property }))
        .catch(next);
});

router.get('/', (req, res, next) => {
    propertyController
        .getAllProperties()
        .then((properties) => res.json({ response: properties }))
        .catch(next);
});

router.post('/', hasRole('Admin'), (req, res, next) => {
    propertyController
        .createProperty(req.body)
        .then((property) => res.json({ response: property }))
        .catch(next);
});

router.put('/:id', hasRole('Admin'), (req, res, next) => {
    const id = Number(req.params.id);
    propertyController
        .updateProperty(id, req.body)
        .then((property) => res.json({ response: property }))
        .catch(next);
});

router.delete('/:id', hasRole('Admin'), (req, res, next) => {
    const id = Number(req.params.id);
    propertyController
        .deleteProperty(id)
        .then((property) => res.json({ response: property }))
        .catch(next);
});

module.exports = router;
