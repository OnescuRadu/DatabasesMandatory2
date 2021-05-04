const APIError = require('../utils/APIError');

// Authentication middleware for passport
function isAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    response.status(401).send('User not authenticated');
}

function hasRole(...roles) {
    const finalRoles = roles.map(s => s.toLowerCase());
    return function (request, response, next) {
        if (request.isAuthenticated()
            && finalRoles.includes(request.user.role.toLowerCase())) {
            return next();
        }
        response.status(401).send('Not authorized');
    }
}

function pad(number) {
    return `0${number}`.substr(String(number).length - 1);
}

function timestamp() {
    const now = new Date();
    const yr = now.getFullYear();
    const mo = pad(now.getMonth());
    const da = pad(now.getDay());
    const hr = pad(now.getHours());
    const mi = pad(now.getMinutes());
    const se = pad(now.getSeconds());
    return `${yr}-${mo}-${da}@${hr}:${mi}:${se}`;
}

// Error handling middleware
function errorHandler(error, request, response, next) {
    console.error(`${timestamp()} ${error.name}: ${error.message}`);
    console.error(error.stack);
    if (error instanceof APIError) {
        return response.status(error.statusCode).json({ error: error.message });
    } else {
        return response.status(500).json({ error: "Internal server error." });
    }
}

// Logger middleware
function logger(request, response, next) {
    response.on('finish', () => {
        console.log(`[${timestamp()}] User: ${request.user != undefined ? request.user.id : 'N/A' }, ${request.method} ${request.originalUrl} : ${response.statusCode}`)
    });
    next();
}

module.exports = {
    isAuthenticated,
    hasRole,
    errorHandler,
    logger
}