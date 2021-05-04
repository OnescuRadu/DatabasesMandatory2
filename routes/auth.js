const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const { isAuthenticated } = require('../middleware');
const { userController } = require('../controllers')

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
