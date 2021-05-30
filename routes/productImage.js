const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { productImageController } = require('../controllers');
const multer = require('multer');
const utils = require('../utils/index');

/**
 * Get Product Image by ID
 * @route GET /product-image/{id}
 * @group productImage - Product Image routes
 * @param {string} id.path.required - Product Image id to look up
 * @returns {object} 200 - Product Image object
 */
router.get('/:id', (req, res, next) => {
    productImageController
        .getProductImageById(req.params.id)
        .then((productImage) => res.json({ response: productImage }))
        .catch(next);
});

/**
 * Get All Product Images by Product ID
 * @route GET /product-image/product/{id}
 * @group productImage - Product Image routes
 * @param {string} id.path.required - Product id to look up
 * @returns {Array.object} 200 - Array of Product Images objects
 */
router.get('/product/:id', (req, res, next) => {
    productImageController
        .getAllProductImagesByProductId(req.params.id)
        .then((productImages) => res.json({ response: productImages }))
        .catch(next);
});

//Multer Set-up for image upload
const upload = multer({
    storage: utils.multerStorage,
    fileFilter: utils.multerImageFilter,
});

/**
 * Create new product image - Authentication required
 * @route POST /product-image/
 * @group productImage - Product Image routes
 * @param {file} image.formData.required - Image file
 * @param {string} productId.formData.required - The product id which the image is uploaded for
 * @returns {object} 200 - The newly created product image object
 * @returns {Error}  400 - File validation check failed.
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  404 - Please select an image to upload
 * @returns {Error}  500 - Internal server error
 * @security cookie
 */
router.post('/', isAuthenticated, upload.single('image'), (req, res, next) => {
    productImageController
        .createProductImage(req)
        .then((productImage) => res.json({ response: productImage }))
        .catch(next);
});

/**
 * Delete product image by id - Admin role required
 * @route DELETE /product-image/{id}
 * @group productImage - Product Image routes
 * @param {string} id.path.required - The product image's id which is to be deleted
 * @returns {object} 200 - The deleted product image object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @security cookie
 */
router.delete('/:id', hasRole('Admin'), (req, res, next) => {
    productImageController
        .deleteProductImage(req.params.id, req.user)
        .then((productImage) => res.json({ response: productImage }))
        .catch(next);
});

module.exports = router;
