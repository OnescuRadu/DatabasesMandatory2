// Authentication middleware for passport
function authenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    response.status(401).send('User not authenticated');
}

// Error handling middleware
function errorHandler(error, request, response, next) {
    console.error(error);
    return response.status(500).end();
}

module.exports = {
    authenticated,
    errorHandler
}