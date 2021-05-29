const router = require('express').Router({ mergeParams: true });
const { hasRole, isAuthenticated } = require('../middleware');
const { propertyController } = require('../controllers');

/**
 * Get Property by id - Authentication required
 * @route GET /manufacturer/{id}
 * @group property - Property routes
 * @param {integer} id.path.required - The requested Property's id
 * @returns {object} 200 - Property object or null
 * @returns {Error} 401 - User not authenticated
 * @security cookie
 */
router.get('/:id', isAuthenticated, (req, res, next) => {
    propertyController
        .getPropertyById(req.params.id)
        .then((property) => res.json({ response: property }))
        .catch(next);
});

/**
 * Get All Properties - Authentication required
 * @route GET /property/
 * @group property - Property routes
 * @returns {Array.object} 200 - Array of Property objects
 * @returns {Error} 401 - User not authenticated
 * @security cookie
 */
router.get('/', isAuthenticated, (req, res, next) => {
    propertyController
        .getAllProperties()
        .then((properties) => res.json({ response: properties }))
        .catch(next);
});

/**
 * Create new property - Admin role required
 * @route POST /property/
 * @group property - Property routes
 * @param {PropertyData.model} PropertyData.body.required - The property data
 * @returns {object} 200 - The newly created property object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @returns {Error}  400 - Invalid property type
 * @security cookie
 */
router.post('/', hasRole('Admin'), (req, res, next) => {
    propertyController
        .createProperty(req.body)
        .then((property) => res.json({ response: property }))
        .catch(next);
});

/**
 * Update property by id - Admin role required
 * @route POST /property/{id}
 * @group property - Property routes
 * @param {string} id.path.required - The id of the Property to be updated
 * @param {PropertyData.model} PropertyData.body.required - The property data
 * @returns {object} 200 - The newly created property object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @returns {Error}  400 - Invalid property type
 * @security cookie
 */
router.put('/:id', hasRole('Admin'), (req, res, next) => {
    propertyController
        .updateProperty(req.params.id, req.body)
        .then((property) => res.json({ response: property }))
        .catch(next);
});

/**
 * Delete manufacturer by id - Admin role required
 * @route DELETE /property/{id}
 * @group property - Property routes
 * @param {string} id.path.required - The id of the Property to be deleted
 * @returns {object} 200 - The deleted property object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @security cookie
 */
router.delete('/:id', hasRole('Admin'), (req, res, next) => {
    propertyController
        .deleteProperty(req.params.id)
        .then((property) => res.json({ response: property }))
        .catch(next);
});

/**
 * @typedef PropertyData
 * @property {string} name.required - The property's name
 * @property {string} type.required - One of: "String", "Number", "Boolean"
 */

module.exports = router;
