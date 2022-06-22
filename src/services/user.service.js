const { Address } = require('../models');
const controller = require('../controllers');
const yup = require('yup');

exports.findAllUserService = async (req, res, next) => {
	try {
		const usersData = await controller.user.findAll({}, req.FQP, {
			include: [{ model: Address }],
		});

		req.users = usersData;
		next();
	} catch (error) {
		return res.status(400).send({ message: error.message });
	}
};

exports.findUserByIdService = async (req, res, next) => {
	try {
		const userData = await controller.user.findOne(req.params.id, {
			include: [{ model: Address }],
		});

		if (!userData) {
			throw new Error('User not found.');
		}

		req.user = userData;
		next();
	} catch (error) {
		return res.status(400).send({ message: error.message });
	}
};

exports.createUserService = async (req, res, next) => {
	const schema = yup.object().shape({
		email: yup.string().email().required(),
		firstName: yup.string().required(),
		lastName: yup.string(),
		username: yup.string().required(),
		phoneNumber: yup.string().required(),
		password: yup.string().required(),
		confirmPassword: yup
			.string()
			.required()
			.oneOf(
				[yup.ref('password'), null],
				'Password and Confirm Password should be the same'
			),
	});

	try {
		await schema.validate({ ...req.body });

		const newUser = await controller.user.create(req.body);
		req.user = newUser;

		next();
	} catch (error) {
		return res.status(400).send({ message: error.message });
	}
};

exports.updateUserService = async (req, res, next) => {
	const schema = yup.object().shape({
		email: yup.string().email(),
		firstName: yup.string(),
		lastName: yup.string(),
		username: yup.string(),
		phoneNumber: yup.string(),
	});

	try {
		await schema.validate({ ...req.body });

		await controller.user.update({ id: req.params.id }, req.body);

		next();
	} catch (error) {
		return res.status(400).send({ message: error.message });
	}
};

exports.deleteUserService = async (req, res) => {
	await controller.user.delete({ id: req.params.id });

	return res.sendStatus(204);
};

exports.returnUsersService = async (req, res) => {
	return res.status(200).send(req.users);
};

exports.returnUserService = async (req, res) => {
	return res.status(200).send(req.user);
};
