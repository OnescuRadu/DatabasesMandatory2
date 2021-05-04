const db = require('../db');
const { pick } = require('../utils');
const APIError = require('../utils/APIError');

async function createSeller(data) {
    if (
        data === undefined
        || data.name === undefined
        || data.legalName === undefined
        || data.cvr === undefined
        || data.phoneNumber === undefined
        || data.ownerId === undefined
        || data.address === undefined
    ) {
        throw new APIError("Missing required fields", 400);
    }

    const owner = await db.user.findUnique({ where: { id: data.ownerId } });
    if (!owner) {
        throw new APIError(`Can't set owner: user with id ${data.ownerId} not found.`, 404);
    }

    const address = data.address;
    const ownerId = data.ownerId;
    delete data.address;
    delete data.ownerId;

    return db.seller.create({
        data: {
            ...data,
            owner: {
                connect: { id: ownerId },
            },
            address: {
                create: { ...address }
            }
        },
        include: { address: true }
    });
}

function getAllSellers() {
    return db.seller.findMany({ where: { deleted: false }});
}

function getSellerById(id) {
    return db.seller.findUnique({ where: { id }});
}

function findSellers(query) {
    return db.seller.findMany({
        where: {
            AND: [
                {
                    OR: [
                        { name: { contains: query } },
                        { legalName: { contains: query} },
                        { cvr: { contains: query } }
                    ],
                },
                { deleted: false }
            ]
        }
    });
}

function findByProduct(id) {
    return db.seller.findMany({
        where: {
            products: {
                some: {
                    productId: id
                }
            }
        }
    })
}

async function updateSeller(id, data, userId) {
    if (data === undefined) {
        throw new APIError("Missing required fields", 400)
    }

    const caller = await db.user.findUnique({ where: { id: userId }});
    const seller = await db.seller.findUnique({ where: { id }});

    if (!seller) {
        throw new APIError(`Seller with id ${id} not found.`, 404);
    }

    if (caller.role !== "Admin" && seller.ownerId !== userId) {
        throw new APIError("You're only allowed to edit sellers you own.", 400);
    }

    const updateData = pick(data, ["name", "legalName", "cvr", "phoneNumber"]);
    const updateAddress = data.address !== undefined ? pick(data.address,
        ["text", "street", "number", "floor", "door", "zipCode", "city"]) : undefined;

    return db.seller.update({
        where: { id },
        data: {
            ...updateData,
            address: data.address !== undefined ? { create: { data: updateAddress } } : undefined
        }
    });
}

async function deleteSeller(id) {
    const seller = await db.seller.findUnique({ where: { id }});

    if (!seller) {
        throw new APIError(`Seller with id ${id} not found.`, 404);
    }

    return db.seller.update({
        where: { id },
        data: {
            deleted: true
        }
    });
}

module.exports = {
    createSeller,
    getAllSellers,
    getSellerById,
    findSellers,
    findByProduct,
    updateSeller,
    deleteSeller
}