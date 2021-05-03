const db = require('../db');
const APIError = require('../utils/APIError');

function getAllCategories() {
    return db.category.findMany({
        include: { parent: true, subCategories: true }
    });
}

async function createCategory(data) {
    if (
        data === undefined
        || data.name === undefined
    ) {
        throw new APIError("Missing required fields", 400);
    }

    const parent = data.parentId !== undefined
        ? await db.category.findUnique({ where: { id: data.parentId } })
        : undefined

    if (data.parentId && !parent) {
        throw new APIError(`Can't set parent: category with id ${data.parentId} not found`, 404);
    }

    return db.category.create({ data });
}

module.exports = {
    getAllCategories,
    createCategory
}