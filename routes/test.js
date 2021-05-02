const router = require('express').Router({ mergeParams: true });
const db = require('../db');
const { user } = db;

router.get('/', async (req, res) => {
  const allUsers = await user.findMany();
  res.send({ response: allUsers });
});

module.exports = router;
