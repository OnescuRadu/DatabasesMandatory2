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

//TODO UPLOAD LOGIC
function createProductImage(data) {
    if (data === undefined) {
        throw new APIError('Missing required fields', 400);
    }

    const url = '';

    createData = {
        url: url,
    };

    return db.productImage.create({ data: createData });
}

//TODO UPLOAD LOGIC
async function updateProductImage(id, data) {
    if (Number.isNaN(id)) {
        throw new APIError('Missing required fields', 400);
    }

    const url = '';

    return db.productImage.update({
        select: {
            id: true,
            url: true,
        },
        where: { id },
        data: { url: url },
    });
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
