const router = require('express').Router({ mergeParams: true });
const { isAuthenticated } = require('../middleware');
const { productRatingController } = require('../controllers');

/**
 * Get Product Rating by ID
 * @route GET /product-rating/{id}
 * @group productRating - Product Rating routes
 * @param {string} id.path.required - Product Rating id to look up
 * @returns {object} 200 - Product Rating object
 */
router.get('/:id', (req, res, next) => {
    productRatingController
        .getProductRatingById(req.params.id)
        .then((productRating) => res.json({ response: productRating }))
        .catch(next);
});

/**
 * Get All Product Ratings by Product ID
 * @route GET /product-rating/product/{id}
 * @group productRating - Product Rating routes
 * @param {string} id.path.required - Product id to look up
 * @returns {Array.object} 200 - Array of Product Ratings objects
 */
router.get('/product/:id', (req, res, next) => {
    productRatingController
        .getAllProductRatingsByProductId(req.params.id)
        .then((productRatings) => res.json({ response: productRatings }))
        .catch(next);
});

/**
 * Create new product rating - Authentication required
 * @route POST /product-rating/
 * @group productRating - Product Rating routes
 * @param {ProductRatingData.model} ProductRatingData.body.required - The product rating data
 * @returns {object} 200 - The newly created product rating object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @security cookie
 */
router.post('/', isAuthenticated, (req, res, next) => {
    productRatingController
        .createProductRating(req.body, req.user)
        .then((productRating) => res.json({ response: productRating }))
        .catch(next);
});

/**
 * Update product rating data - Authentication required
 * @route PUT /product-rating/{id}
 * @group productRating - Product Rating routes
 * @param {string} id.path.required - The product rating's id which is to be updated
 * @param {ProductRatingData.model} ProductRatingData.body.required - The product rating data
 * @returns {object} 200 - The updated product rating object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @security cookie
 */
router.put('/:id', isAuthenticated, (req, res, next) => {
    productRatingController
        .updateProductRating(req.params.id, req.body, req.user)
        .then((productRating) => res.json({ response: productRating }))
        .catch(next);
});

/**
 * Delete product rating by id - Authentication required
 * @route DELETE /product-rating/{id}
 * @group productRating - Product Rating routes
 * @param {string} id.path.required - The product rating's id which is to be deleted
 * @returns {object} 200 - The deleted manufacturer object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @security cookie
 */
router.delete('/:id', isAuthenticated, (req, res, next) => {
    productRatingController
        .deleteProductRating(req.params.id, req.user)
        .then((productRating) => res.json({ response: productRating }))
        .catch(next);
});

/**
 * @typedef ProductRatingData
 * @property {integer} rating.required - The rating value
 * @property {string} review.required - The review
 * @property {string} productId.required - The product id which the image is uploaded for
 */

module.exports = router;
