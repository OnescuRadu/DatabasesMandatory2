const db = require('../db');
const { pick } = require('../utils');
const APIError = require('../utils/APIError');

function getAll(sellerId) {
    return db.sellerToProducts.findMany({
        where: {
            sellerId: sellerId,
            deleted: false
        }
    });
}

function getById(sellerId, id) {
    return db.sellerToProducts.findFirst({ where: { id, sellerId, deleted: false } });
}

async function addProduct(seller, user, data) {
    if (user.role !== "Admin" && seller.ownerId !== user.id) {
        throw new APIError("Not authorized to add product to seller.");
    }

    if (
        data === undefined
        || data.productId === undefined
        || data.originalPrice === undefined
        || data.stockQty === undefined
    ) {
        throw new APIError("Missing required fields", 400);
    }

    const createData = pick(data, ["productId", "originalPrice", "salePrice", "stockQty"]);
    createData.sellerId = seller.id;

    return db.sellerToProducts.create({ data: createData });
}

async function updateProduct(seller, user, productId, data) {
    if (user.role !== "Admin" && seller.ownerId !== user.id) {
        throw new APIError("Not authorized to update product.");
    }

    const updateData = pick(data, ["productId", "originalPrice", "salePrice", "stockQty"]);

    return db.sellerToProducts.update({
        where: { id: productId },
        data: updateData
    });
}

async function deleteProduct(seller, user, id) {
    if (user.role !== "Admin" && seller.ownerId !== user.id) {
        throw new APIError("Not authorized to delete product.");
    }

    return db.sellerToProducts.update({
        where: { id },
        data: { deleted: true }
    });
}

async function getPriceHistory(productId) {
    return db.priceHistory.findMany({
        where: { sellerProductId: productId },
        orderBy: { createdAt: 'desc' }
    });
}

module.exports = {
    getAll,
    getById,
    addProduct,
    updateProduct,
    deleteProduct,
    getPriceHistory
}