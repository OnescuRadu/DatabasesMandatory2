const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const { userController } = require('../controllers')

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/login', (req, res) => {
  res.send({ response: 'Login failed' });
});

router.post('/register', (req, res, next) => {
  userController.createUser(req.body)
    .then(user => res.json({ response: user }))
    .catch(next);
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.json({ response: "Success" });
})

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/auth/login', session: true }),
  async (req, res) => {
    res.send({ response: 'User logged in successfully!' });
  }
);

module.exports = router;
