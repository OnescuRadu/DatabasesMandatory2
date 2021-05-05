const db = require('../db');
const APIError = require('../utils/APIError');

function getProductImageById(id) {
    return db.productImage.findFirst({ where: { id, deleted: false } });
}

function getAllProductImagesByProductId(productId) {
    return db.productImage.findMany({
        where: {
            productId: productId,
            deleted: false,
        },
    });
}

function createProductImage(req) {
    if (req.fileValidationError) {
        throw new APIError('File validation check failed.', 400);
    } else if (!req.file) {
        throw new APIError('Please select an image to upload', 404);
    } else if (err) {
        throw new APIError('Internal server error.', 500);
    }

    createData = {
        url: req.path,
    };

    return db.productImage.create({ data: createData });
}

async function deleteProductImage(id) {
    if (Number.isNaN(id)) {
        throw new APIError('Invalid product rating id', 400);
    }

    return db.productImage.delete({
        select: {
            id: true,
            url: true,
        },
        where: { id },
    });
}

module.exports = {
    getProductImageById,
    getAllProductImagesByProductId,
    createProductImage,
    updateProductImage,
    deleteProductImage,
};
