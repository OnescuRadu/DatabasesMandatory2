const db = require('../db');
const APIError = require('../utils/APIError');

function getManufacturers(pageNumber, pageSize) {
    if (pageNumber && pageSize) {
        const offset = (pageNumber - 1) * pageSize;
        return db.manufacturer.findMany({
            select: {
                id: true,
                name: true
            },
            skip: offset,
            take: pageSize
        });
    } else {
        return db.manufacturer.findMany();
    }
}

function getById(id) {
    return db.manufacturer.findUnique({
        select: {
            id: true,
            name: true
        },
        where: { id }
    });
}

function findManufacturers(query) {
    return db.manufacturer.findMany({
        select: {
            id: true,
            name: true
        },
        where: {
            name: {
                contains: query
            }
        }
    });
}

function createManufacturer(data) {
    if (
        data === undefined
        || data.name === undefined
    ) {
        throw new APIError("Missing required fields", 400);
    }

    return db.manufacturer.create({
        select: {
            id: true,
            name: true
        },
        data: { name: data.name }
    });
}

function updateManufacturer(id, data) {
    if (
        Number.isNaN(id)
        || data === undefined
        || data.name === undefined
    ) {
        throw new APIError("Missing required fields", 400);
    }

    return db.manufacturer.update({
        select: {
            id: true,
            name: true
        },
        where: { id },
        data: { name: data.name }
    });
}

function deleteManufacturer(id) {
    if (Number.isNaN(id)) {
        throw new APIError("Invalid manufacturer id", 400);
    }

    return db.manufacturer.delete({
        select: {
            id: true,
            name: true
        },
        where: { id }
    });
}

module.exports = {
    getManufacturers,
    getById,
    findManufacturers,
    createManufacturer,
    updateManufacturer,
    deleteManufacturer
}