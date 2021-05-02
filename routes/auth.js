const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const { authenticated } = require('../middleware');

router.get('/login', (req, res) => {
  res.send({ response: 'Login failed' });
});

router.get('/protected', authenticated, (req, res) => {
  res.send({ response: 'Secret' });
});

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/auth/login', session: true }),
  async (req, res) => {
    res.send({ response: 'User logged in successfully!' });
  }
);

module.exports = router;
