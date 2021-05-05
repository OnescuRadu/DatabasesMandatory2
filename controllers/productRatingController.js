const db = require('../db');
const APIError = require('../utils/APIError');


function getProductRatingById(id) {
    return db.productRating.findFirst({ where: { id, deleted: false } });
}

function getAllProductRatingsByProductId(productId) {
    return db.productRating.findMany({
        where: {
            productId: productId,
            deleted: false,
        },
    });
}

function createProductRating(data) {
    if (data === undefined || data.rating === undefined || data.review === undefined) {
        throw new APIError('Missing required fields', 400);
    }

    createData = {
        rating: data.rating,
        review: data.review,
    };

    return db.productRating.create({ data: createData });
}

async function updateProductRating(id, data, user) {
    if (Number.isNaN(id) || data.rating === undefined || data.review === undefined) {
        throw new APIError('Missing required fields', 400);
    }

    const productRating = await db.productRating.findUnique({
        where: {
            id: id,
        },
    });

    if (user.id !== productRating.userId && user.role.toLowerCase() !== 'admin') {
        throw new APIError('Unauthorized action.', 401);
    }

    return db.productRating.update({
        select: {
            id: true,
            rating: true,
            review: true,
        },
        where: { id },
        data: { rating: data.rating, review: data.review },
    });
}

async function deleteProductRating(id, user) {
    if (Number.isNaN(id)) {
        throw new APIError('Invalid product rating id', 400);
    }

    const productRating = await db.productRating.findUnique({
        where: {
            id: id,
        },
    });

    if (user.id !== productRating.userId && user.role.toLowerCase() !== 'admin') {
        throw new APIError('Unauthorized action.', 401);
    }

    return db.productRating.delete({
        select: {
            id: true,
            name: true,
        },
        where: { id },
    });
}

module.exports = {
    getProductRatingById,
    getAllProductRatingsByProductId,
    createProductRating,
    updateProductRating,
    deleteProductRating,
};
