const db = require('../db');
const { pick } = require('../utils');
const APIError = require('../utils/APIError');

function getAll(sellerId) {
    return db.sellerToProducts.findMany({
        where: {
            sellerId: sellerId,
            deleted: false
        },
        include: { product: { include: {
            manufacturer: { select: { id: true, name: true } },
            description: { select: { id: true, description: true } },
            properties: true,
            category: { select: { id: true, parentId: true, name: true } },
            // groups: true,
            images: true,
            ratings: true
        }}}
    });
}

function getById(sellerId, id) {
    return db.sellerToProducts.findFirst({
        where: { id, sellerId, deleted: false },
        include: { product: { include: {
            manufacturer: { select: { id: true, name: true } },
            description: { select: { id: true, description: true } },
            properties: true,
            category: { select: { id: true, parentId: true, name: true } },
            // groups: true,
            images: true,
            ratings: true
        }}}
    });
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

async function updateProduct(seller, user, sellerProdId, data) {
    const prod = await db.sellerToProducts.findFirst({ where: { id: sellerProdId, deleted: false } });
    if (!prod) {
        throw new APIError("Product not found.", 404);
    }

    if (user.role !== "Admin" && seller.ownerId !== user.id) {
        throw new APIError("Not authorized to update product.", 400);
    }

    const updateData = pick(data, ["originalPrice", "salePrice", "stockQty"]);

    if (prod.salePrice !== data.salePrice || prod.originalPrice !== data.originalPrice) {
        await db.priceHistory.create({
            data: {
                sellerProductId: sellerProdId,
                oldPrice: prod.originalPrice,
                newPrice: data.originalPrice,
                oldSalePrice: prod.salePrice,
                newSalePrice: data.salePrice
            }
        });
    }

    return db.sellerToProducts.update({
        where: { id: sellerProdId },
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