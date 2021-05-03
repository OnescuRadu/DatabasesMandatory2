const APIError = require('../utils/APIError');

// Authentication middleware for passport
function isAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    response.status(401).send('User not authenticated');
}

function hasRole(role) {
    return function (request, response, next) {
        if (request.isAuthenticated()
            && request.user.role.toLowerCase() === role.toLowerCase()) {
            return next();
        }
        response.status(401).send('Not authorized');
    }
}

// Error handling middleware
function errorHandler(error, request, response, next) {
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}@${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    console.error(`${timestamp} ${error.name}: ${error.message}`);
    console.error(error.stack);
    if (error instanceof APIError) {
        return response.status(error.statusCode).json({ error: error.message });
    } else {
        return response.status(500).json({ error: "Internal server error." });
    }
}

module.exports = {
    isAuthenticated,
    errorHandler,
    hasRole
}