const db = require('../db');
const APIError = require('../utils/APIError');

function getProductImageById(id) {
    return db.productImage.findFirst({ where: { id } });
}

function getAllProductImagesByProductId(productId) {
    return db.productImage.findMany({
        where: {
            productId: productId,
        },
    });
}

function createProductImage(req) {
    if (req.fileValidationError) {
        throw new APIError('File validation check failed.', 400);
    } else if (!req.file) {
        throw new APIError('Please select an image to upload', 404);
    } else if (req.err) {
        throw new APIError('Internal server error.', 500);
    }

    const productId = Number(req.body.productId);

    createData = {
        url: req.file.path,
        product: {
            connect: { id: productId },
        },
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
    deleteProductImage,
};
