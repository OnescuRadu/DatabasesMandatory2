const { userController } = require('../controllers');

const roles = ["User", "Manager", "Admin"];

function printUsageInfo() {
    console.info(`Usage:
yarn run create:user <email> <pass> [role]
         email: String - The user's email address, used to authenticate.
                Must be unique.
         password: String - The user's password, used to authenticate.
         role: "User" | "Manager" | "Admin" - optional - The user's
               role, used for authorization.`);
}

function createUser(email, password, role) {
    const data = { email, password, role };
    return userController.createUser(data, true);
}

if (require.main === module) {
    if (process.argv.length < 4) {
        console.error("Not enough arguments supplied.");
        printUsageInfo();
        process.exit(1);
    }

    if (process.argv.length >= 5 && !roles.includes(process.argv[4])) {
        console.error(`${process.argv[4]} is not a valid role.`);
        printUsageInfo();
        process.exit(1);
    }

    const email = process.argv[2];
    const password = process.argv[3];
    const role = process.argv.length >= 5 ? process.argv[4] : undefined;

    createUser(email, password, role).then(newUser => {
        console.log("Successfully created user:");
        console.log(newUser);
        process.exit(0);
    }).catch(error => {
        console.error("Error creating user:");
        console.error(error.message);
        process.exit(1);
    });
}

module.exports = createUser;