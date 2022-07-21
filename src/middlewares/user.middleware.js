const asyncMw = require('async-express-mw');
const userService = require('../services/user.service');
const users = new userService();

const findAllUser = asyncMw(async (req, res, next) => {
	return await users.findAllUserService(req, res, next);
});

const createUser = asyncMw(async (req, res, next) => {
	return await users.createUserService(req, res, next);
});

const findUserById = asyncMw(async (req, res, next) => {
	return await users.findUserByIdService(req, res, next);
});

const updateUser = asyncMw(async (req, res, next) => {
	return await users.updateUserService(req, res, next);
});

const deleteUser = asyncMw(async (req, res, next) => {
	return await users.deleteUserService(req, res, next);
});

const returnUsers = asyncMw(async (req, res) => {
	return await users.returnUsersService(req, res);
});

const returnUser = asyncMw(async (req, res) => {
	return await users.returnUserService(req, res);
});

module.exports = {
	findAllUser,
	findUserById,
	createUser,
	updateUser,
	deleteUser,
	returnUser,
	returnUsers,
};
