const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { orderController } = require('../controllers');

router.get('/:id', isAuthenticated, (req, res, next) => {
    const id = Number(req.params.id);
    orderController.getById(req.user, id)
        .then(order => res.json({ response: order }))
        .catch(next);
});

router.post('/', hasRole("User"), (req, res, next) => {
    orderController.createOrders(req.user, req.body)
        .then(orders => res.json({ response: orders.length === 1 ? orders[0] : orders }))
        .catch(next);
});

module.exports = router;