const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { userController } = require('../controllers');

/**
 * Get All Users - Admin role required
 * @route GET /user/
 * @group user - User routes
 * @returns {Array.object} 200 - Array of User objects
 * @returns {Error} 401 - Not Authorized
 * @security cookie
 */
router.get('/', hasRole('Admin'), (req, res, next) => {
    userController.getAllUsers()
        .then(users => res.json({ response: users }))
        .catch(next);
});

/**
 * Get User by id - Admin role required
 * @route GET /user/{id}
 * @group user - User routes
 * @param {string} id.path.required - The id of the sought User
 * @returns {object} 200 - User object or null
 * @returns {Error} 401 - Not authorized
 * @security cookie
 */
router.get('/:id', hasRole('Admin'), (req, res, next) => {
    userController.getById(req.params.id)
        .then(user => res.json({ response: user }))
        .catch(next);
});

/**
 * Create User - Admin role required
 * @route POST /user/
 * @group user - User routes
 * @param {CreateUserData.model} CreateUserData.body.required - Create User data
 * @returns {object} 200 - Newly created User object or null
 * @returns {Error} 401 - Not authorized
 * @returns {Error} 400 - Missing required fields.
 * @returns {Error} 400 - Email already taken
 * @security cookie
 */
router.post('/', hasRole("Admin"), (req, res, next) => {
    userController.createUser(req.body)
        .then(user => res.json({ response: user }))
        .catch(next);
});

/**
 * Update Profile - Authentication required
 * @route PUT /user/profile
 * @group user - User routes
 * @param {UpdateProfileData.model} UpdateProfileData.body.required - The user profile data
 * @returns {object} 200 - The updated User object
 * @returns {Error} 401 - Not authorized
 * @returns {Error} 400 - Missing required fields.
 * @security cookie
 */
router.put('/profile', isAuthenticated, (req, res, next) => {
    userController.updateUserProfile(req.user.id, req.body)
        .then(result => res.json({ response: result }))
        .catch(next);
});

/**
 * Change password - Authentication required
 * @route POST /user/change-pass
 * @group user - User routes
 * @param {ChangePasswordRequest.model} ChangePasswordRequest.body.required - ChangePasswordRequest data
 * @returns {object} 200 - The updated User object
 * @returns {Error} 401 - Not authorized
 * @returns {Error} 400 - Missing required fields.
 * @returns {Error} 401 - Wrong password
 * @security cookie
 */
router.post('/change-pass', isAuthenticated, (req, res, next) => {
    userController.changePassword(req.user.id, req.body)
        .then(user => res.json({ response: user }))
        .catch(next);
});

/**
 * Delete User - Authentication required
 * @route DELETE /user/
 * @group user - User routes
 * @returns {object} 200 - User object or null
 * @returns {Error} 401 - User not authenticated
 * @security cookie
 */
router.delete('/', isAuthenticated, (req, res, next) => {
    userController.deleteUser(req.user.id)
        .then(user => res.json({ response: user }))
        .catch(next);
});

/**
 * @typedef CreateUserData
 * @property {string} email.required - The user's email (must be unique)
 * @property {string} password.required - The user's desired password
 * @property {string} role - The user's role (User, Manager, or Admin) - default: User
 */

/**
 * @typedef ChangePasswordRequest
 * @property {string} oldPassword.required - The user's old password
 * @property {string} newPassword.required - The user's desired new password
 */

/**
 * @typedef UpdateProfileData
 * @property {string} firstName - The user's first name
 * @property {string} lastName - The user's last name
 * @property {string} dateOfBirth - The user's date of birth
 * @property {AddressData.model} address - The user's address
 */

/**
 * @typedef AddressData
 * @property {string} text.required - The full address string
 * @property {string} street.required - The street name
 * @property {string} number.required - The building number
 * @property {string} floor - The floor number
 * @property {string} door - The door number
 * @property {string} zipCode.required - The zip code
 * @property {string} city.required - The city's name
 */

module.exports = router;
