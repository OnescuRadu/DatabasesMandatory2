const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { productDescriptionController } = require('../controllers');

/**
 * Get Product Description by ID
 * @route GET /product-description/{id}
 * @group productDescription - Product Description routes
 * @param {string} id.path.required - Product Description id to look up
 * @returns {object} 200 - Product Description object
 */
router.get('/:id', (req, res, next) => {
    productDescriptionController
        .getProductDescriptionById(req.params.id)
        .then((productDescription) => res.json({ response: productDescription }))
        .catch(next);
});

/**
 * Get Product Description by Product ID
 * @route GET /product-description/product/{id}
 * @group productDescription - Product Description routes
 * @param {string} id.path.required - Product id to look up
 * @returns {Array.object} 200 - Product Description object
 */
router.get('/product/:id', (req, res, next) => {
    productDescriptionController
        .getProductDescriptionsByProductId(req.params.id)
        .then((productDescriptions) => res.json({ response: productDescriptions }))
        .catch(next);
});

/**
 * Create new product description - Authentication required
 * @route POST /product-description/
 * @group productDescription - Product Description routes
 * @param {ProductDescriptionData.model} ProductDescriptionData.body.required - The product description data
 * @returns {object} 200 - The newly created product description object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @security cookie
 */
router.post('/', isAuthenticated, (req, res, next) => {
    productDescriptionController
        .createProductDescription(req.body)
        .then((productDescription) => res.json({ response: productDescription }))
        .catch(next);
});

/**
 * Update product description by id - Admin role required
 * @route PUT /product-description/
 * @group productDescription - Product Description routes
 * @param {ProductDescriptionUpdateData.model} ProductDescriptionUpdateData.body.required - The product description data
 * @returns {object} 200 - Product object of which the description belongs to
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @security cookie
 */
router.put('/:id', hasRole('Admin'), (req, res, next) => {
    productDescriptionController
        .updateProductDescription(req.params.id, req.body, req.user)
        .then((productDescription) => res.json({ response: productDescription }))
        .catch(next);
});

/**
 * Delete product description by id - Admin role required
 * @route DELETE /product-description/
 * @group productDescription - Product Description routes
 * @param {string} id.path.required - The product description's id which is to be deleted
 * @returns {object} 200 - The deleted product description
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @security cookie
 */
router.delete('/:id', hasRole('Admin'), (req, res, next) => {
    productDescriptionController
        .deleteProductDescription(req.params.id, req.user)
        .then((productDescription) => res.json({ response: productDescription }))
        .catch(next);
});

/**
 * @typedef ProductDescriptionData
 * @property {string} description.required - The description text
 */

/**
 * @typedef ProductDescriptionUpdateData
 * @property {string} productId.required - The product's id of which the description belongs to
 * @property {string} descriptionId.required - The description id which will be updated
 */

module.exports = router;
