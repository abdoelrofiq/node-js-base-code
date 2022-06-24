const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.findAllUser, userController.returnUsers);

router.get('/:id', userController.findUserById, userController.returnUser);

router.post('/', userController.createUser, userController.returnUser);

router.patch(
	'/:id',
	userController.findUserById,
	userController.updateUser,
	userController.findUserById,
	userController.returnUser
);

router.delete('/:id', userController.findUserById, userController.deleteUser);

module.exports = router;
