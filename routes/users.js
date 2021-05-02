const router = require('express').Router({ mergeParams: true });
const { authenticated } = require('../middleware');
const { userController } = require('../controllers');

// Get all users

router.get('/', authenticated, (req, res, next) => {
    userController.getAllUsers()
        .then(users => res.json({ response: users }))
        .catch(next);
});

// Get user by id

router.get('/:id', authenticated, (req, res, next) => {
    const id = Number(req.params.id);
    userController.getById(id)
        .then(user => res.json({ response: user }))
        .catch(next);
});

// Create user

router.post('/', (req, res, next) => {
    userController.createUser(req.body)
        .then(user => res.json({ response: user }))
        .catch(next);
});

module.exports = router;
