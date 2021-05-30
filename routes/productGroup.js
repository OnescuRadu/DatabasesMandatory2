const router = require('express').Router({ mergeParams: true });
const { hasRole } = require('../middleware');
const { productController } = require('../controllers');

/**
 * Get product group by id
 * @route GET /product-group/{id}
 * @group productGroup - Product Group routes
 * @param {string} id.path.required - Product Group id to look up
 * @returns {object} 200 - Product Group object
 */
router.get('/:id', (req, res, next) => {
    productController
        .getProductGroupById(req.params.id)
        .then((productGroup) => res.json({ response: productGroup }))
        .catch(next);
});

/**
 * Get All Product Groups
 * @route GET /product-group/
 * @group productGroup - Product Group routes
 * @returns {Array.object} 200 - Array of Product Group objects
 */
router.get('/', (req, res, next) => {
    productController
        .getAllProductGroups()
        .then((productGroups) => res.json({ response: productGroups }))
        .catch(next);
});

/**
 * Create new product group - Admin role required
 * @route POST /product-group/
 * @group productGroup - Product Group routes
 * @param {ProductGroupData.model} ProductGroupData.body.required - The product group data
 * @returns {object} 200 - The newly created product group object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @security cookie
 */
router.post('/', hasRole('Admin'), (req, res, next) => {
    productController
        .createProductGroup(req.body)
        .then((productGroup) => res.json({ response: productGroup }))
        .catch(next);
});

/**
 * Update product group by id - Admin role required
 * @route PUT /product-group/{id}
 * @group productGroup - Product Group routes
 * @param {string} id.path.required - The product group's id which is to be updated
 * @param {ProductGroupData.model} ProductGroupData.body.required - The product group data
 * @returns {object} 200 - The updated product group object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @security cookie
 */
router.put('/:id', hasRole('Admin'), (req, res, next) => {
    productController
        .updateProductGroup(req.params.id, req.body)
        .then((productGroup) => res.json({ response: productGroup }))
        .catch(next);
});

/**
 * Delete Product Group by id - Admin role required
 * @route DELETE /product-group/{id}
 * @group productGroup - productGroup routes
 * @param {string} id.path.required - The product group's id which is to be deleted
 * @returns {object} 200 - The deleted Product Group object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @security cookie
 */
router.delete('/:id', hasRole('Admin'), (req, res, next) => {
    productController
        .deleteProductGroup(req.params.id)
        .then((productGroup) => res.json({ response: productGroup }))
        .catch(next);
});

/**
 * @typedef ProductGroupData
 * @property {string} name.required - The product group's name
 */

module.exports = router;
