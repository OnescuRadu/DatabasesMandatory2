const db = require('../db');
const APIError = require('../utils/APIError');

function getProductDescriptionById(id) {
    return db.productDescription.findFirst({ where: { id } });
}

function getAllProductDescriptionsByProductId(productId) {
    return db.productDescription.findMany({
        where: {
            productId: productId,
        },
    });
}

function createProductDescription(data) {
    if (data === undefined || data.description === undefined) {
        throw new APIError('Missing required fields', 400);
    }

    createData = {
        description: data.description,
    };

    return db.productDescription.create({ data: createData });
}

function updateProductDescription(id, data, user) {
    if (Number.isNaN(id) || data.description === undefined) {
        throw new APIError('Missing required fields', 400);
    }

    return db.productDescription.update({
        select: {
            id: true,
            description: true,
        },
        where: { id },
        data: { description: data.description },
    });
}

function deleteProductDescription(id, user) {
    if (Number.isNaN(id)) {
        throw new APIError('Invalid product description id', 400);
    }

    return db.productDescription.delete({
        select: {
            id: true,
            name: true,
        },
        where: { id },
    });
}

module.exports = {
    getProductDescriptionById,
    getAllProductDescriptionsByProductId,
    createProductDescription,
    updateProductDescription,
    deleteProductDescription,
};
