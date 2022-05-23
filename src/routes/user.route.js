const express = require('express');
const router = express.Router();
const users = require('../services/user.service');

router.get('/', users.findAllUserService, users.returnUsersService);

router.get('/:id', users.findUserByIdService, users.returnUserService);

router.post('/', users.createUserService, users.returnUserService);

router.patch(
	'/:id',
	users.findUserByIdService,
	users.updateUserService,
	users.findUserByIdService,
	users.returnUserService
);

router.delete('/:id', users.findUserByIdService, users.deleteUserService);

module.exports = router;
