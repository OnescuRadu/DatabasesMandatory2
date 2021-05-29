const db = require('../db');
const APIError = require('../utils/APIError');

function getPropertyById(id) {
    return db.property.findFirst({ where: { id } });
}

function getAllProperties() {
    return db.property.findMany({});
}

function createProperty(data) {
    if (data === undefined || data.name === undefined || data.type === undefined) {
        throw new APIError('Missing required fields', 400);
    }

    if (data.type !== 'Boolean' && data.type !== 'Number' && data.type !== 'String') {
        throw new APIError('Invalid property type.', 400);
    }

    createData = {
        name: data.name,
        type: data.type,
    };

    return db.property.create({ data: createData });
}

async function updateProperty(id, data) {
    if (data === undefined || (data.name === undefined && data.type === undefined)) {
        throw new APIError('Missing required fields', 400);
    }

    if (data.type !== 'Boolean' && data.type !== 'Number' && data.type !== 'String') {
        throw new APIError('Invalid property type.', 400);
    }

    return db.property.update({
        select: {
            id: true,
            name: true,
            type: true,
        },
        where: { id },
        data: { name: data.name, type: data.type },
    });
}

async function deleteProperty(id) {
    if (Number.isNaN(id)) {
        throw new APIError('Invalid product rating id', 400);
    }

    return db.property.delete({
        select: {
            id: true,
            name: true,
            type: true,
        },
        where: { id },
    });
}

module.exports = {
    getPropertyById,
    getAllProperties,
    createProperty,
    updateProperty,
    deleteProperty,
};
