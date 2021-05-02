const db = require('../db');

function createProductGroup(name) {
    return db.productGroup.create({ data: { name } });
}

function getAllProductGroups() {
    return db.productGroup.findMany();
}

function addProductToGroup(productId, groupId) {
    const product = await db.product.findUnique({
        where: { id: productId },
        include: { productGroup: true }
    });

    if (!product) {
        throw new Error("Product not found");
    }

    const group = await db.productGroup.findUnique({
        where: { id: groupId }
    });

    if (!group) {
        throw new Error("Product group not found");
    }

    if (product.groups.find(g => g.id === groupId)) {
        throw new Error("Product is already part of that product group");
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