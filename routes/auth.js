const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const db = require('../db');

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

// Authentication middleware for passport
function authenticated(request, response, next) {
  if (request.isAuthenticated()) {
    return next();
  }
  response.status(401).send('User not authenticated');
}

module.exports = router;
