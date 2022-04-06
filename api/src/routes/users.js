const router = require('express').Router();
const user = require('../middlewares/user');
const validator = require('../middlewares/requestValidation');

// POST /users
router.post(
  '/',
  user.authMw,
  validator.userSchema,
  validator.validationMw,
  user.createUserMw,
  user.returnConditionalUserMw
);

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
  user.updateUserByRoleMw,
  user.getUserMw,
  user.returnUserMw
);

// DELETE /users/:id
router.delete('/:id', user.authMw, user.getUserMw, user.deleteUserMw);

module.exports = router;
