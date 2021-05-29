const db = require('../db');
const APIError = require('../utils/APIError');

function getAllProducts() {
    return db.product.findMany({
        include: {
            manufacturer: true,
            description: true,
            category: true,
            properties: true,
        },
        where: { approved: true, deleted: false },
    });
}

function getProductById(id) {
    return db.product.findUnique({
        where: { id },
        include: {
            category: true,
            description: true,
            groups: true,
            images: true,
            manufacturer: true,
            properties: true,
            ratings: true,
        }
    });
}

function createProduct(data) {
    if (
        data === undefined ||
        data.name === undefined ||
        data.code === undefined ||
        data.categoryId === undefined ||
        data.manufacturerId === undefined
    ) {
        throw new APIError('Missing required fields', 400);
    }

    return db.product.create({ data });
}

function updateProductGroup(id, data) {
    if (Number.isNaN(id) || data.name === undefined) {
        throw new APIError('Missing required fields', 400);
    }

    return db.productGroup.update({
        select: {
            id: true,
            name: true,
        },
        where: { id },
        data: { name: data.name },
    });
}

function getProductGroupById(id) {
    return db.productGroup.findFirst({ 
        where: { id }, 
        include: {
            products: true
        } 
    });
}

function createProductGroup(data) {
    if (data === undefined || data.name === undefined) {
        throw new APIError('Missing required fields', 400);
    }
    return db.productGroup.create({ data: { name: data.name } });
}

function getAllProductGroups() {
    return db.productGroup.findMany();
}

async function deleteProductGroup(id) {
    if (Number.isNaN(id)) {
        throw new APIError('Invalid product rating id', 400);
    }

    return db.productGroup.delete({
        select: {
            id: true,
            name: true,
        },
        where: { id },
    });
}

async function addProductToGroup(data) {
    if (data === undefined || data.productId === undefined || data.groupId === undefined) {
        throw new APIError('Missing required fields', 400);
    }

    const product = await db.product.findFirst({
        where: { id: data.productId },
        include: { groups: true },
    });

    if (!product) {
        throw new APIError('Product not found', 404);
    }

    const group = await db.productGroup.findFirst({
        where: { id: data.groupId },
    });

    if (!group) {
        throw new APIError('Product group not found', 404);
    }

    if (product.groups.find((g) => g.id === data.groupId)) {
        throw new APIError('Product is already part of that product group', 400);
    }

    return db.product.update({
        where: { id: data.productId },
        data: {
            groups: {
                connect: { id: data.groupId },
            },
        },
        include: {
            groups: true,
        },
    });
}

async function addDescriptionToProduct(data) {
    if (data === undefined || data.productId === undefined || data.descriptionId === undefined) {
        throw new APIError('Missing required fields', 400);
    }

    const product = await db.product.findUnique({
        where: { id: data.productId },
        include: { description: true },
    });

    if (!product) {
        throw new APIError('Product not found', 404);
    }

    descriptionId = data.descriptionId;

    const description = await db.productDescription.findFirst({ where: { id: descriptionId } });

    if (!description) {
        throw new APIError('Description not found', 404);
    }

    return db.product.update({
        where: { id: data.productId },
        data: {
            description: {
                connect: { id: data.descriptionId },
            },
        },
        include: {
            description: true,
        },
    });
}

async function removeProductFromGroup(productId, groupId) {
    if (productId === undefined || groupId === undefined) {
        throw new APIError('Missing required fields', 400);
    }

    const product = await db.product.findUnique({
        where: { id: productId },
        include: { groups: true },
    });

    if (!product) {
        throw new APIError('Product not found', 404);
    }

    const group = await db.productGroup.findUnique({
        where: { id: groupId },
    });

    if (!group) {
        throw new APIError('Product group not found', 404);
    }

    if (!product.groups.find((g) => g.id === groupId)) {
        throw new APIError('Product is not part of that product group', 400);
    }

    db.productGroup.update({ 
        where: { id: groupId },
        data: {
            products: {
                disconnect: { id: productId },
            },
        },
    });

    return db.product.update({
        where: { id: productId },
        data: {
            groups: {
                disconnect: { id: groupId },
            },
        },
        include: {
            groups: true,
        },
    });
}

async function addPropertyToProduct(data) {
    if (data === undefined || data.productId === undefined || data.propertyId === undefined || data.value === undefined) {
        throw new APIError('Missing required fields', 400);
    }

    const product = await db.product.findUnique({
        where: { id: data.productId },
        include: { properties: true },
    });

    if (!product) {
        throw new APIError('Product not found', 404);
    }

    const property = await db.property.findUnique({
        where: { id: data.propertyId },
    });

    if (!property) {
        throw new APIError('Property not found', 404);
    }

    return db.productsToProperties.create({
        data: {
            product: {
                connect: { id: data.productId },
            },
            property: {
                connect: { id: data.propertyId },
            },
            value: data.value,
        },
        include: {
            property: true,
            product: true,
        },
    });
}

async function removePropertyFromProduct(id) {
    if (Number.isNaN(id)) {
        throw new APIError('Missing required fields', 400);
    }

    return db.productsToProperties.delete({
        select: {
            id: true,
            value: true,
        },
        where: { id },
    });
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    getProductGroupById,
    getAllProductGroups,
    createProductGroup,
    updateProductGroup,
    deleteProductGroup,
    addProductToGroup,
    removeProductFromGroup,
    addDescriptionToProduct,
    addPropertyToProduct,
    removePropertyFromProduct,
};
