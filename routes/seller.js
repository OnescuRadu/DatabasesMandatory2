const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { sellerController } = require('../controllers');

/**
 * Find Sellers by name, legal name, or cvr - Authentication required
 * @route GET /seller/search
 * @group seller - Seller routes
 * @param {string} q.query.required - The search string
 * @returns {Array.object} 200 - Array of Sellers whose name, legal name, or cvr match the search query
 * @returns {Error} 401 - User not authenticated
 * @security cookie
 */
router.get('/search', isAuthenticated, (req, res, next) => {
    const query = req.query.q;
    sellerController.findSellers(query)
        .then(sellers => res.json({ response: sellers }))
        .catch(next);
});

/**
 * Find Sellers that sell a Product, by the Product's id - Authentication required
 * @route GET /seller/byProduct/{id}
 * @group seller - Seller routes
 * @param {string} id.path.required - The id of a Product
 * @returns {Array.object} 200 - Array of Sellers that are selling the product
 * @returns {Error} 401 - User not authenticated
 * @security cookie
 */
router.get('/byProduct/:id', isAuthenticated, (req, res, next) => {
    sellerController.findByProduct(req.params.id)
        .then(sellers => res.json({ response: sellers }))
        .catch(next);
});

/**
 * Get Seller by id - Authentication required
 * @route GET /seller/{id}
 * @group seller - Seller routes
 * @param {string} id.path.required - The id of the Seller to be looked up
 * @returns {object} 200 - Seller object or null
 * @returns {Error} 401 - User not authenticated
 * @security cookie
 */
router.get('/:id', isAuthenticated, (req, res, next) => {
    sellerController.getSellerById(req.params.id)
        .then(seller => res.json({ response: seller }))
        .catch(next);
});

/**
 * Get All Sellers - Authentication required
 * @route GET /seller/
 * @group seller - Seller routes
 * @returns {Array.object} 200 - Array of Seller objects
 * @returns {Error} 401 - User not authenticated
 * @security cookie
 */
router.get('/', isAuthenticated, (req, res, next) => {
    sellerController.getAllSellers()
        .then(sellers => res.json({ response: sellers }))
        .catch(next);
});

/**
 * Create new Seller - Admin role required
 * @route POST /seller/
 * @group seller - Seller routes
 * @param {SellerData.model} SellerData.body.required - The Seller data
 * @returns {object} 200 - The newly created Seller object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @returns {Error}  404 - Can't set owner: user with id {body.ownerId} not found.
 * @security cookie
 */
router.post('/', hasRole("Admin"), (req, res, next) => {
    sellerController.createSeller(req.body)
        .then(seller => res.json({ response: seller }))
        .catch(next);
});

/**
 * Create new Seller - Manger or Admin role required
 * @route POST /seller/
 * @group seller - Seller routes
 * @param {string} id.path.required - The id of the Seller to be looked up
 * @param {SellerData.model} SellerData.body.required - The Seller data
 * @returns {object} 200 - The newly updated Seller object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @returns {Error}  404 - Seller with id ${id} not found.
 * @returns {Error}  400 - You're only allowed to update sellers you own.
 * @security cookie
 */
router.put('/:id', hasRole("Manager", "Admin"), (req, res, next) => {
    sellerController.updateSeller(req.params.id, req.body, req.user.id)
        .then(seller => res.json({ response: seller }))
        .catch(next);
});

/**
 * Delete seller by id - Admin role required
 * @route DELETE /seller/{id}
 * @group seller - Seller routes
 * @param {string} id.path.required - The id of the Seller to be deleted
 * @returns {object} 200 - The deleted Seller object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  404 - Seller with id {id} not found.
 * @security cookie
 */
router.delete('/:id', hasRole("Admin"), (req, res, next) => {
    sellerController.deleteSeller(req.params.id)
        .then(seller => res.json({ response: seller }))
        .catch(next);
});

/**
 * @typedef SellerData
 * @property {string} name.required - The seller's name
 * @property {string} legalName.required - The seller's legal name
 * @property {string} cvr.required - The seller's cvr number
 * @property {string} phoneNumber.required - The seller's phone number
 * @property {string} ownerId.required - The id of the user account that is to be the owner of this seller
 * @property {AddressData.model} address.required - The company's registered address
 */

/**
 * @typedef AddressData
 * @property {string} text.required - The full address string
 * @property {string} street.required - The street name
 * @property {string} number.required - The building number
 * @property {string} floor - The floor number
 * @property {string} door - The door number
 * @property {string} zipCode - The zip code
 * @property {string} city - The city's name
 */

module.exports = router;
