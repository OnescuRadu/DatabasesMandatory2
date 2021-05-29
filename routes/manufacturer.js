const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { manufacturerController } = require('../controllers');

/**
 * Get All Manufacturers - Authentication required
 * @route GET /manufacturer/
 * @group manufacturer - Manufacturer routes
 * @param {integer} pageNumber.query - Page number for pagination
 * @param {integer} pageSize.query - Page size for pagination 
 * @returns {Array.object} 200 - Array of Manufacturer objects
 * @returns {string} 401 - User not authenticated
 * @security cookie
 */
router.get('/', isAuthenticated, (req, res, next) => {
    const pageNumber = req.query.page;
    const pageSize = req.query.size;
    manufacturerController.getManufacturers(pageNumber, pageSize)
        .then(manufacturers => res.json({ response: manufacturers }))
        .catch(next);
});


/**
 * Find manufacturer by name - Authentication required
 * @route GET /manufacturer/search
 * @group manufacturer - Manufacturer routes
 * @param {string} q.query - Search query
 * @returns {Array.object} 200 - Array of matching Manufacturer objects
 * @returns {string} 401 - User not authenticated
 * @security cookie
 */
router.get('/search', isAuthenticated, (req, res, next) => {
    const query = req.query.q;
    manufacturerController.findManufacturers(query)
        .then(manufacturers => res.json({ response: manufacturers }))
        .catch(next);
});

/**
 * Get manufacturer by id - Authentication required
 * @route GET /manufacturer/{id}
 * @group manufacturer - Manufacturer routes
 * @param {string} id.path.required - Manufacturer id to look up
 * @returns {object} 200 - Manufacturer object
 * @returns {string} 401 - User not authenticated
 * @security cookie
 */
router.get('/:id', isAuthenticated, (req, res, next) => {
    manufacturerController.getById(req.params.id)
        .then(manufacturer => res.json({ response: manufacturer }))
        .catch(next);
});

/**
 * Create new manufacturer - Admin role required
 * @route POST /manufacturer/
 * @group manufacturer - Manufacturer routes
 * @param {ManufacturerData.model} ManufacturerData.body.required - The manufacturer data
 * @returns {object} 200 - The newly created manufacturer object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @security cookie
 */
router.post('/', hasRole("Admin"), (req, res, next) => {
    manufacturerController.createManufacturer(req.body)
        .then(manufacturer => res.json({ response: manufacturer }))
        .catch(next);
});

/**
 * Update manufacturer by id - Admin role required
 * @route PUT /manufacturer/{id}
 * @group manufacturer - Manufacturer routes
 * @param {string} id.path.required - The manufacturer's id which is to be updated
 * @param {ManufacturerData.model} ManufacturerData.body.required - The manufacturer data
 * @returns {object} 200 - The updated manufacturer object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @returns {Error}  400 - Missing required fields
 * @security cookie
 */
router.put('/:id', hasRole("Admin"), (req, res, next) => {
    manufacturerController.updateManufacturer(req.params.id, req.body)
        .then(manufacturer => res.json({ response: manufacturer }))
        .catch(next);
});

/**
 * Delete manufacturer by id - Admin role required
 * @route DELETE /manufacturer/{id}
 * @group manufacturer - Manufacturer routes
 * @param {string} id.path.required - The manufacturer's id which is to be deleted
 * @returns {object} 200 - The deleted manufacturer object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  401 - Not Authorized
 * @security cookie
 */
router.delete('/:id', hasRole("Admin"), (req, res, next) => {
    manufacturerController.deleteManufacturer(req.params.id)
        .then(category => res.json({ response: category }))
        .catch(next);
});

/**
 * @typedef ManufacturerData
 * @property {string} name.required - The manufacturer's name
 */

module.exports = router;
