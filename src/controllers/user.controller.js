const userService = require('../services/user.service');
const users = new userService();

const findAllUser = async (req, res, next) => {
	return await users.findAllUserService(req, res, next);
};

const createUser = async (req, res, next) => {
	return await users.createUserService(req, res, next);
};

const findUserById = async (req, res, next) => {
	return await users.findUserByIdService(req, res, next);
};

const updateUser = async (req, res, next) => {
	return await users.updateUserService(req, res, next);
};

const deleteUser = async (req, res, next) => {
	return await users.deleteUserService(req, res, next);
};

const returnUsers = async (req, res) => {
	return await users.returnUsersService(req, res);
};

const returnUser = async (req, res) => {
	return await users.returnUserService(req, res);
};

module.exports = {
	findAllUser,
	findUserById,
	createUser,
	updateUser,
	deleteUser,
	returnUser,
	returnUsers,
};
