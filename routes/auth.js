const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const { userController } = require('../controllers')

/**
 * Route that user is redirected to on a failed login
 * @route GET /auth/login
 * @group auth - Authentication routes
 * @returns {object} 200 - Login failure message
 */
router.get('/login', (req, res) => {
  res.send({ response: 'Login failed' });
});

/**
 * Route used to register a new account
 * @route POST /auth/register
 * @group auth - Authentication routes
 * @param {UserData.model} UserData.body.required - The user data
 * @returns {object} 200 - The newly created user object
 * @returns {Error}  500 - Internal server error
 * @returns {Error}  400 - Missing required fields
 * @returns {Error}  400 - Email already taken
 */
router.post('/register', (req, res, next) => {
  userController.createUser(req.body)
    .then(user => res.json({ response: user }))
    .catch(next);
});

/**
 * Route for logging out
 * @route GET /auth/logout
 * @group auth - Authentication routes
 * @returns {object} 200 - Success message
 * @returns {Error}  500 - Internal server error
 */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.json({ response: "Success" });
})

/**
 * Route used to login
 * @route POST /auth/login
 * @group auth - Authentication routes
 * @param {UserData.model} UserData.body.required - The user data
 * @returns {object} 200 - Login success message
 * @returns {Error}  302 - Redirect to GET /auth/login
 */
router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/auth/login', session: true }),
  async (req, res) => {
    res.send({ response: 'User logged in successfully!' });
  }
);

/**
 * @typedef UserData
 * @property {string} email.required - user's email address - eg: user@domain.com
 * @property {string} password.required - user's desired password - eg: password1234
 */

module.exports = router;
