const router = require('express').Router({ mergeParams: true });
const db = require('../db');

router.get('/', async (req, res) => {
  const allUsers = await db.user.findMany();
  res.send({ response: allUsers });
});

module.exports = router;
