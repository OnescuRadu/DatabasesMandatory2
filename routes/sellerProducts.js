const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { sellerProdController } = require('../controllers');

// req.seller is available in this router

/**
 * Get Seller Products price history - Authentication required
 * @route GET /seller/{sellerId}/products/{id}/history
 * @group sellerProducts - Seller Products routes
 * @param {string} sellerId.path.required - The id of the seller
 * @param {string} id.path.required - The id of the product
 * @returns {Array.object} 200 - Array of PriceHistory objects
 * @returns {Error} 401 - User not authenticated
 * @returns {Error} 404 - Seller does not exist.
 * @security cookie
 */
router.get('/:id/history', isAuthenticated, (req, res, next) => {
    sellerProdController.getPriceHistory(req.params.id)
        .then(sellerProduct => res.json({ response: sellerProduct }))
        .catch(next);
});

/**
 * Get Seller Products by id - Authentication required
 * @route GET /seller/{sellerId}/products/{id}
 * @group sellerProducts - Seller Products routes
 * @param {string} sellerId.path.required - The id of the seller
 * @param {string} id.path.required - The id of the product to be queried
 * @returns {object} 200 - SellerProduct object or null
 * @returns {Error} 401 - User not authenticated
 * @returns {Error} 404 - Seller does not exist.
 * @security cookie
 */
router.get('/:id', isAuthenticated, (req, res, next) => {
    sellerProdController.getById(req.seller.id, req.params.id)
        .then(sellerProduct => res.json({ response: sellerProduct }))
        .catch(next);
});

/**
 * Get All Seller Products - Authentication required
 * @route GET /seller/{sellerId}/products/
 * @group sellerProducts - Seller Products routes
 * @param {string} sellerId.path.required - The id of the seller whose products are to be queried
 * @returns {Array.object} 200 - Array of SellerProduct objects
 * @returns {Error} 401 - User not authenticated
 * @returns {Error} 404 - Seller does not exist.
 * @security cookie
 */
router.get('/', isAuthenticated, (req, res, next) => {
    sellerProdController.getAll(req.seller.id)
        .then(sellerProducts => res.json({ response: sellerProducts }))
        .catch(next);
});

/**
 * Create new Seller Product - Manager or Admin role required
 * @route POST /seller/{sellerId}/products/
 * @group sellerProducts - Seller Products routes
 * @param {string} sellerId.path.required - The id of the seller
 * @param {SellerProductData.model} SellerProduct.body.required - The SellerProduct data
 * @returns {object} 200 - The newly created SellerProduct object
 * @returns {Error} 401 - Not Authorized
 * @returns {Error} 404 - Seller does not exist.
 * @returns {Error} 400 - Missing required fields.
 * @security cookie
 */
router.post('/', hasRole("Manager", "Admin"), (req, res, next) => {
    sellerProdController.addProduct(req.seller, req.user, req.body)
        .then(sellerProduct => res.json({ response: sellerProduct }))
        .catch(next);
});

/**
 * Update Seller Product - Manager or Admin role required
 * @route PUT /seller/{sellerId}/products/{id}
 * @group sellerProducts - Seller Products routes
 * @param {string} sellerId.path.required - The id of the seller
 * @param {string} id.path.required - The id of the product to be updated
 * @param {SellerProductData.model} SellerProduct.body.required - The SellerProduct data
 * @returns {object} 200 - The newly updated SellerProduct object
 * @returns {Error} 401 - Not Authorized
 * @returns {Error} 404 - Product not found.
 * @returns {Error} 400 - Not authorized to update product.
 * @returns {Error} 404 - Seller does not exist.
 * @returns {Error} 400 - Missing required fields.
 * @security cookie
 */
router.put('/:id', hasRole("Manager", "Admin"), (req, res, next) => {
    sellerProdController.updateProduct(req.seller, req.user, req.params.id, req.body)
        .then(sellerProduct => res.json({ response: sellerProduct }))
        .catch(next);
});

/**
 * Delete Seller Product - Manager or Admin role required
 * @route DELETE /seller/{sellerId}/products/{id}
 * @group sellerProducts - Seller Products routes
 * @param {string} sellerId.path.required - The id of the seller
 * @param {string} id.path.required - The id of the product to be deleted
 * @returns {object} 200 - The newly created SellerProduct object
 * @returns {Error} 401 - Not Authorized
 * @returns {Error} 400 - Not authorized to delete product.
 * @returns {Error} 404 - Seller does not exist.
 * @security cookie
 */
router.delete('/:id', hasRole("Manager", "Admin"), (req, res, next) => {
    sellerProdController.deleteProduct(req.seller, req.user, req.params.id)
        .then(sellerProduct => res.json({ response: sellerProduct }))
        .catch(next);
});

/**
 * @typedef SellerProductData
 * @property {string} productId.required - The Product id
 * @property {integer} originalPrice.required - The SellerProducts's full price
 * @property {integer} salePrice - The SellerProduct's sale price
 * @property {integer} quantity.required - The SellerProduct's stock quantity
 */

module.exports = router;