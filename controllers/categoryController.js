const db = require('../db');
const APIError = require('../utils/APIError');

function getAllCategories() {
    return db.category.findMany({
        select: {
            id: true,
            parentId: true,
            name: true,
        },
        where: { deleted: false },
    });
}

async function createCategory(data) {
    if (data === undefined || data.name === undefined) {
        throw new APIError('Missing required fields', 400);
    }

    const parent = data.parentId ? await db.category.findFirst({ where: { id: data.parentId } }) : undefined;

    if (data.parentId && !parent) {
        throw new APIError(`Can't set parent: category with id ${data.parentId} not found`, 404);
    }

    return db.category.create({
        data,
        include: { parent: true },
    });
}

function deleteCategory(id) {
    if (Number.isNaN(id)) {
        throw new APIError('Invalid product description id', 400);
    }

    return db.category.delete({
        select: {
            id: true,
            name: true,
        },
        where: { id },
    });
}

module.exports = {
    getAllCategories,
    createCategory,
    deleteCategory,
};
