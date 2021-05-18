const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { productImageController } = require('../controllers');
const multer = require('multer');
const utils = require('../utils/index');

router.get('/:id', (req, res, next) => {
    productImageController
        .getProductImageById(req.params.id)
        .then((productImage) => res.json({ response: productImage }))
        .catch(next);
});

router.get('/product/:id', (req, res, next) => {
    productImageController
        .getAllProductImagesByProductId(req.params.id)
        .then((productImages) => res.json({ response: productImages }))
        .catch(next);
});

//Multer Set-up for image upload
const upload = multer({ storage: utils.multerStorage, fileFilter: utils.multerImageFilter });

router.post('/', isAuthenticated, upload.single('image'), (req, res, next) => {
    productImageController
        .createProductImage(req)
        .then((productImage) => res.json({ response: productImage }))
        .catch(next);
});

router.delete('/:id', hasRole('Admin'), (req, res, next) => {
    productImageController
        .deleteProductImage(req.params.id, req.user)
        .then((productImage) => res.json({ response: productImage }))
        .catch(next);
});

module.exports = router;
