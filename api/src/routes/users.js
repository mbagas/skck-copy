const router = require('express').Router();
const user = require('../middlewares/user');

// POST /users
router.post('/', user.authMw, user.createUserMw, user.returnConditionalUserMw);

// POST /siswas/login
router.post('/login', user.loginMw);

// GET /users
router.get('/', user.authMw, user.getUsersMw, user.returnUsersMw);
// GET /users/:id
router.get('/:id', user.authMw, user.getUserMw, user.returnUserMw);

// PATCH /users/:id
router.patch(
  '/:id',
  user.authMw,
  user.getUserMw,
  user.updateUserMw,
  user.getUserMw,
  user.returnUserMw
);

// DELETE /users/:id
router.delete('/:id', user.authMw, user.getUserMw, user.deleteUserMw);

module.exports = router;
