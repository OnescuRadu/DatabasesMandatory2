const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { productController, categoryController } = require('../controllers');

/**
 * Get All Products - Authentication required
 * @route GET /product/
 * @group product - Product routes
 * @returns {Array.object} 200 - Array of Product objects
 * @returns {Error} 401 - User not authenticated
 * @security cookie
 */
router.get('/', isAuthenticated, (req, res, next) => {
    productController
        .getAllProducts()
        .then((products) => res.json({ response: products }))
        .catch(next);
});

/**
 * Get All Categories - Authentication required
 * @route GET /product/categories
 * @group product - Product routes
 * @returns {Array.object} 200 - Array of Category objects
 * @returns {Error} 401 - User not authenticated
 * @security cookie
 */
router.get('/categories', isAuthenticated, (req, res, next) => {
    categoryController
        .getAllCategories()
        .then((categories) => res.json({ response: categories }))
        .catch(next);
});

/**
 * Get product by id - Authentication required
 * @route GET /product/{id}
 * @group product - Product routes
 * @param {string} id.path.required - Product id to look up
 * @returns {object} 200 - Product object
 * @returns {Error} 401 - User not authenticated
 * @security cookie
 */
router.get('/:id', isAuthenticated, (req, res, next) => {
    productController
        .getProductById(req.params.id)
        .then((product) => res.json({ response: product }))
        .catch(next);
});

/**
 * Create new product - Admin role required
 * @route POST /product/
 * @group product - Product routes
 * @param {ProductData.model} ProductData.body.required - The product data
 * @returns {object} 200 - The newly created product object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @security cookie
 */
router.post('/', hasRole('Admin'), (req, res, next) => {
    productController
        .createProduct(req.body)
        .then((product) => res.json({ response: product }))
        .catch(next);
});

/**
 * Create new category - Admin role required
 * @route POST /product/categories/
 * @group product - Product routes
 * @param {CategoryData.model} CategoryData.body.required - The product data
 * @returns {object} 200 - The newly created product object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @security cookie
 */
router.post('/categories', hasRole('Admin'), (req, res, next) => {
    categoryController
        .createCategory(req.body)
        .then((category) => res.json({ response: category }))
        .catch(next);
});

/**
 * Delete category by id - Admin role required
 * @route DELETE /product/categories/{id}
 * @group product - Product routes
 * @param {string} id.path.required - The category's id which is to be deleted
 * @returns {object} 200 - The deleted category object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @security cookie
 */
router.delete('/categories/:id', hasRole('Admin'), (req, res, next) => {
    categoryController
        .deleteCategory(req.params.id)
        .then((category) => res.json({ response: category }))
        .catch(next);
});

/**
 * Add product to group - Admin role required
 * @route PUT /product/group
 * @group product - Product routes
 * @param {ProductToGroupData.model} ProductToGroupData.body.required - The ProductToGroupData data
 * @returns {object} 200 - The updated product object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @security cookie
 */
router.put('/group', hasRole('Admin'), (req, res, next) => {
    productController
        .addProductToGroup(req.body)
        .then((product) => res.json({ response: product }))
        .catch(next);
});

/**
 * Remove product from group - Admin role required
 * @route DELETE /product/{productId}/group/{groupId}
 * @group product - Product routes
 * @param {string} productId.path.required - The product's id which is removed from group
 * @param {string} groupId.path.required - The group's id which the product is removed from
 * @returns {object} 200 - The updated product object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @returns {Error}  400 - Product is not part of that product group
 * @returns {Error}  404 - Product not found
 * @returns {Error}  404 - Product group not found
 * @security cookie
 */
router.delete('/:productId/group/:groupId', hasRole('Admin'), (req, res, next) => {
    productController
        .removeProductFromGroup(req.params.productId, req.params.groupId)
        .then((product) => res.json({ response: product }))
        .catch(next);
});

/**
 * Add description to product - Admin role required
 * @route PUT /product/description
 * @group product - Product routes
 * @param {DescriptionToProduct.model} DescriptionToProduct.body.required - The DescriptionToProduct data
 * @returns {object} 200 - The updated product object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @returns {Error}  404 - Product not found
 * @returns {Error}  404 - Description not found
 * @security cookie
 */
router.put('/description', hasRole('Admin'), (req, res, next) => {
    productController
        .addDescriptionToProduct(req.body)
        .then((product) => res.json({ response: product }))
        .catch(next);
});

/**
 * Add property to product - Admin role required
 * @route POST /product/property
 * @group product - Product routes
 * @param {PropertyToProduct.model} PropertyToProduct.body.required - The PropertyToProduct data
 * @returns {object} 200 - The updated product object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @returns {Error}  404 - Product not found
 * @returns {Error}  404 - Property not found
 * @security cookie
 */
router.post('/property', hasRole('Admin'), (req, res, next) => {
    productController
        .addPropertyToProduct(req.body)
        .then((product) => res.json({ response: product }))
        .catch(next);
});

/**
 * Remove property from product - Admin role required
 * @route DELETE /product/property/{prodPropId}/
 * @group product - Product routes
 * @param {string} prodPropId.path.required - The product-property's id
 * @returns {object} 200 - The updated product object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @security cookie
 */
router.delete('/property/:prodPropId', hasRole('Admin'), (req, res, next) => {
    productController
        .removePropertyFromProduct(req.params.prodPropId)
        .then((product) => res.json({ response: product }))
        .catch(next);
});

/**
 * @typedef ProductData
 * @property {string} name.required - The product's name
 * @property {string} code.required - The product's code
 * @property {string} categoryId.required - The category where the product belongs to
 * @property {string} manufacturerId.required - The product's manufacturer
 */

/**
 * @typedef CategoryData
 * @property {string} name.required - The category's name
 * @property {string} parentId.required - The category's parent id
 */

/**
 * @typedef ProductToGroupData
 * @property {string} productId.required - The product's id
 * @property {string} groupId.required - The group's id
 */

/**
 * @typedef DescriptionToProduct
 * @property {string} productId.required - The product's id
 * @property {string} descriptionId.required - The description's id
 */

/**
 * @typedef PropertyToProduct
 * @property {string} productId.required - The product's id
 * @property {string} propertyId.required - The property's id
 * @property {string} value.required - The property's value
 */

module.exports = router;
