const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { orderController } = require('../controllers');

/**
 * Get order by id - Authentication required
 * @route GET /order/{id}
 * @group order - Order routes
 * @param {string} id.path.required - Order id to look up
 * @returns {object} 200 - Order object
 * @returns {Error} 401 - User not authenticated
 * @returns {Error} 404 - Order not found
 * @security cookie
 */
router.get('/:id', isAuthenticated, (req, res, next) => {
    orderController
        .getById(req.user, req.params.id)
        .then((order) => res.json({ response: order }))
        .catch(next);
});

/**
 * Create new order - User role required
 * @route POST /order/
 * @group order - Order routes
 * @param {OrderData.model} OrderData.body.required - The order data
 * @returns {object} 200 - The newly created order object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  401 - Not Authorized to view this order
 * @returns {Error}  400 - Missing required fields
 * @security cookie
 */
router.post('/', hasRole('User'), (req, res, next) => {
    orderController
        .createOrders(req.user, req.body)
        .then((orders) => res.json({ response: orders.length === 1 ? orders[0] : orders }))
        .catch(next);
});

/**
 * @typedef OrderData
 * @property {Array.<OrderProduct>} items.required - The order's items
 */

/**
 * @typedef OrderProduct
 * @property {string} sellerProductId.required - The
 * @property {integer} quantity.required - The order's product quantity
 */

module.exports = router;
