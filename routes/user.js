const router = require('express').Router({ mergeParams: true });
const { isAuthenticated, hasRole } = require('../middleware');
const { userController } = require('../controllers');

// Get all users

router.get('/', isAuthenticated, (req, res, next) => {
    userController.getAllUsers()
        .then(users => res.json({ response: users }))
        .catch(next);
});

// Get user by id

router.get('/:id', isAuthenticated, (req, res, next) => {
    const id = Number(req.params.id);
    userController.getById(id)
        .then(user => res.json({ response: user }))
        .catch(next);
});

// Create user

router.post('/', hasRole("Admin"), (req, res, next) => {
    userController.createUser(req.body)
        .then(user => res.json({ response: user }))
        .catch(next);
});

// Update profile

router.post('/profile', isAuthenticated, (req, res, next) => {
    userController.updateUserProfile(req.user.id, req.body)
        .then(result => res.json({ response: result }))
        .catch(next);
});

// Change password

router.post('/change-pass', isAuthenticated, (req, res, next) => {
    userController.changePassword(req.user.id, req.body)
        .then(user => res.json({ response: user }))
        .catch(next);
});

// Delete user

router.delete('/', isAuthenticated, (req, res, next) => {
    userController.deleteUser(req.user.id)
        .then(user => res.json({ response: user }))
        .catch(next);
})

module.exports = router;
