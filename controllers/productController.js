const db = require('../db');
const APIError = require('../utils/APIError');

function getAllProducts() {
    return db.product.findMany();
}

function getProductById(id) {
    return db.product.findUnique({ where: { id }});
}

function createProduct(data) {
    if (
        data === undefined
        || data.name === undefined
        || data.code === undefined
    ) {
        throw new APIError("Missing required fields", 400);
    }

    return db.product.create({ data });
}

function createProductGroup(name) {
    return db.productGroup.create({ data: { name } });
}

function getAllProductGroups() {
    return db.productGroup.findMany();
}

async function addProductToGroup(productId, groupId) {
    const product = await db.product.findUnique({
        where: { id: productId },
        include: { productGroup: true }
    });

    if (!product) {
        throw new APIError("Product not found", 404);
    }

    const group = await db.productGroup.findUnique({
        where: { id: groupId }
    });

    if (!group) {
        throw new APIError("Product group not found", 404);
    }

    if (product.groups.find(g => g.id === groupId)) {
        throw new APIError("Product is already part of that product group", 400);
    }

    return db.product.update({
        where: { id: productId },
        data: {
            groups: {
                connect: { id: groupId }
            }
        },
        include: {
            groups: true
        }
    })
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    createProductGroup,
    getAllProductGroups,
    addProductToGroup
}