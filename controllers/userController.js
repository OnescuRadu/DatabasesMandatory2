const db = require('../db');
const APIError = require('../utils/APIError');
const { hash } = require('bcrypt');
const { pick } = require('../utils');

const numSaltRounds = process.env.NUM_SALT_ROUNDS | 10;

function getAllUsers() {
    return db.user.findMany();
}

function getById(id) {
    return db.user.findUnique({
        where: { id }
    });
}

async function createUser(data, verified) {
    if (
        data === undefined
        || data.email === undefined
        || data.password === undefined
    ) {
        throw new APIError("Missing required fields", 400);
    }

    createData = {
        email: data.email,
        password: await hash(data.password, numSaltRounds),
    }

    if (data.role) {
        createData.role = data.role;
    }

    if (verified) {
        createData.verified = true;
    }

    return db.user.create({ data: createData });
}

async function updateUserProfile(userId, data) {
    if (
        userId === undefined
        || data === undefined
    ) {
        throw new APIError("Missing required fields", 400);
    }

    const updateData = pick(data, ["firstName", "lastName", "dateOfBirth"]);
    const updateAddressData = data.address != undefined ? pick(data.address,
        ["text", "street", "number", "floor", "door", "zipCode", "city"]) : undefined;

    return db.user.update({
        where: { id: userId },
        data: {
            personalData: {
                upsert: {
                    create: {
                        ...updateData,
                        address: data.address != undefined ? { create: updateAddressData } : undefined
                    },
                    update: {
                        ...updateData,
                        address: data.address != undefined ? { create: updateAddressData } : undefined
                    }
                }
            }
        },
        include: { personalData: { include: { address: true } } }
    });
}

module.exports = {
    getAllUsers,
    getById,
    createUser,
    updateUserProfile
}