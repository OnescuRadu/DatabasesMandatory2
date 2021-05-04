const db = require('../db');
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
    return db.seller.findMany();
}

function getSellerById(id) {
    return db.seller.findUnique({ where: { id }});
}

function findSellers(query) {
    return db.seller.findMany({
        where: {
            OR: {
                name: { contains: query },
                legalName: { contains: query},
                cvr: { contains: query }
            }
        }
    });
}

module.exports = {
    createSeller,
    getAllSellers,
    getSellerById
}