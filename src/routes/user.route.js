const express = require('express');
const router = express.Router();
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userMiddleware.findAllUser, userMiddleware.returnUsers);

router.get('/:id', userMiddleware.findUserById, userMiddleware.returnUser);

router.post('/', userMiddleware.createUser, userMiddleware.returnUser);

router.patch(
	'/:id',
	userMiddleware.findUserById,
	userMiddleware.updateUser,
	userMiddleware.findUserById,
	userMiddleware.returnUser
);

router.delete('/:id', userMiddleware.findUserById, userMiddleware.deleteUser);

module.exports = router;
