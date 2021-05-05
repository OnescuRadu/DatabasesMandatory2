const db = require('../db');
const APIError = require('../utils/APIError');

function getAllProducts() {
    return db.product.findMany({
        include: {
            manufacturer: true,
            description: true,
            category: true,
        },
        where: { approved: true, deleted: false },
    });
}

function getProductById(id) {
    return db.product.findUnique({ where: { id } });
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

function getProductGroupById(id) {
    return db.productGroup.findFirst({ where: { id, deleted: false } });
}

function createProductGroup(data) {
    if (data === undefined || data.name === undefined) {
        throw new APIError('Missing required fields', 400);
    }
    return db.productGroup.create({ data: { name } });
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

    const product = await db.product.findUnique({
        where: { id: data.productId },
        include: { productGroup: true },
    });

    if (!product) {
        throw new APIError('Product not found', 404);
    }

    const group = await db.productGroup.findUnique({
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

async function removeProductFromGroup(data) {
    if (data === undefined || data.productId === undefined || data.groupId === undefined) {
        throw new APIError('Missing required fields', 400);
    }

    const product = await db.product.findUnique({
        where: { id: data.productId },
        include: { productGroup: true },
    });

    if (!product) {
        throw new APIError('Product not found', 404);
    }

    const group = await db.productGroup.findUnique({
        where: { id: data.groupId },
    });

    if (!group) {
        throw new APIError('Product group not found', 404);
    }

    if (!product.groups.find((g) => g.id === data.groupId)) {
        throw new APIError('Product is not part of that product group', 400);
    }

    return db.product.update({
        where: { id: data.productId },
        data: {
            groups: {
                disconnect: { id: data.groupId },
            },
        },
        include: {
            groups: true,
        },
    });
}

async function addImageToProduct(data) {
    if (data === undefined || data.productId === undefined || data.imageId === undefined) {
        throw new APIError('Missing required fields', 400);
    }

    const product = await db.product.findUnique({
        where: { id: data.productId },
        include: { productImage: true },
    });

    if (!product) {
        throw new APIError('Product not found', 404);
    }

    const productImage = await db.productImage.findUnique({
        where: { id: data.imageId },
    });

    if (!productImage) {
        throw new APIError('Product image not found', 404);
    }

    if (product.images.find((i) => i.id === data.imageId)) {
        throw new APIError('Product is already having this image.', 400);
    }

    return db.product.update({
        where: { id: data.productId },
        data: {
            images: {
                connect: { id: data.imageId },
            },
        },
        include: {
            images: true,
        },
    });
}

async function removeImageFromProduct(data) {
    if (data === undefined || data.productId === undefined || data.imageId === undefined) {
        throw new APIError('Missing required fields', 400);
    }

    const product = await db.product.findUnique({
        where: { id: data.productId },
        include: { productImage: true },
    });

    if (!product) {
        throw new APIError('Product not found', 404);
    }

    const productImage = await db.productImage.findUnique({
        where: { id: data.imageId },
    });

    if (!productImage) {
        throw new APIError('Product image not found', 404);
    }

    if (!product.images.find((i) => i.id === data.imageId)) {
        throw new APIError('Product is not having this image.', 400);
    }

    return db.product.update({
        where: { id: data.productId },
        data: {
            images: {
                disconnect: { id: data.imageId },
            },
        },
        include: {
            images: true,
        },
    });
}

//TODO
async function addPropertyToProduct(data) {
    if (data === undefined || data.productId === undefined || data.propertyId === undefined) {
        throw new APIError('Missing required fields', 400);
    }

    const product = await db.product.findUnique({
        where: { id: data.productId },
        include: { productImage: true },
    });

    if (!product) {
        throw new APIError('Product not found', 404);
    }

    const productImage = await db.productImage.findUnique({
        where: { id: data.imageId },
    });

    if (!productImage) {
        throw new APIError('Product image not found', 404);
    }

    if (product.images.find((i) => i.id === data.imageId)) {
        throw new APIError('Product is already having this image.', 400);
    }

    return db.product.update({
        where: { id: data.productId },
        data: {
            images: {
                connect: { id: data.imageId },
            },
        },
        include: {
            images: true,
        },
    });
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    getProductGroupById,
    getAllProductGroups,
    createProductGroup,
    deleteProductGroup,
    addProductToGroup,
    removeProductFromGroup,
    addImageToProduct,
    removeImageFromProduct,
};
