const { user } = require('../db');
const { hash } = require('bcrypt');

const numSaltRounds = process.env.NUM_SALT_ROUNDS | 10;

function getAllUsers() {
    return user.findMany();
}

function getById(id) {
    return user.findUnique({
        where: { id }
    });
}

async function createUser(data) {
    if (
        data === undefined
        || data.email === undefined
        || data.password === undefined
    ) {
        throw new Error("Missing required fields");
    }

    createData = {
        email: data.email,
        password: await hash(data.password, numSaltRounds),
    }

    if (data.role) {
        createData.role = data.role;
    }

    return user.create({ data: createData });
}

module.exports = {
    getAllUsers,
    getById,
    createUser
}