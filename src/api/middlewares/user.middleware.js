const asyncMw = require('async-express-mw');
const userService = require('../services/user.service');
const services = { user: new userService() };

const findAllUser = asyncMw(async (req, res, next) => {
	return await services.user.findAllUserService(req, res, next);
});

const createUser = asyncMw(async (req, res, next) => {
	return await services.user.createUserService(req, res, next);
});

const findUserById = asyncMw(async (req, res, next) => {
	return await services.user.findUserByIdService(req, res, next);
});

const updateUser = asyncMw(async (req, res, next) => {
	return await services.user.updateUserService(req, res, next);
});

const deleteUser = asyncMw(async (req, res, next) => {
	return await services.user.deleteUserService(req, res, next);
});

const returnUsers = asyncMw(async (req, res) => {
	return await services.user.returnUsersService(req, res);
});

const returnUser = asyncMw(async (req, res) => {
	return await services.user.returnUserService(req, res);
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
