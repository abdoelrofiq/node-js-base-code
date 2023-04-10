const { Address } = require('../models');
const yup = require('yup');
const Models = require('../core/actionMethod');
const {
	createGetDatasResponse,
	createGetDataResponse,
	createPostDataResponse,
	createErrorResponse,
} = require('../utils/response');
const { hashText } = require('../utils/encryption');

class UserService extends Models {
	async findAllUserService(req, res, next) {
		try {
			const usersData = await this.connection.user.findAll({}, req.FQP, {
				...req.query,
				include: [{ model: Address }],
			});

			req.users = createGetDatasResponse(usersData, ['password'], {
				totalAllData: await this.connection.user.count(),
				query: req.query,
			});
			next();
		} catch (error) {
			return res.status(400).send(createErrorResponse(400, error.message));
		}
	}

	async findUserByIdService(req, res, next) {
		try {
			const userData = await this.connection.user.findOne(req.params.id, {
				include: [{ model: Address }],
			});

			if (!userData) {
				throw new Error('User not found.');
			}

			req.user = createGetDataResponse(userData);
			next();
		} catch (error) {
			return res.status(400).send(createErrorResponse(400, error.message));
		}
	}

	async createUserService(req, res, next) {
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
			await schema.validate(req.body);

			req.body.password = await hashText(req.body.password);
			const newUser = await this.connection.user.create(req.body);

			req.user = createPostDataResponse(newUser);
			next();
		} catch (error) {
			return res.status(400).send(createErrorResponse(400, error.message));
		}
	}

	async updateUserService(req, res, next) {
		const schema = yup.object().shape({
			email: yup.string().email(),
			firstName: yup.string(),
			lastName: yup.string(),
			username: yup.string(),
			phoneNumber: yup.string(),
		});

		try {
			await schema.validate(req.body);

			await this.connection.user.update({ id: req.params.id }, req.body);

			next();
		} catch (error) {
			return res.status(400).send(createErrorResponse(400, error.message));
		}
	}

	async deleteUserService(req, res) {
		await this.connection.user.delete({ id: req.params.id });

		return res.sendStatus(204);
	}

	async returnUsersService(req, res) {
		return res.status(200).send(req.users);
	}

	async returnUserService(req, res) {
		return res.status(200).send(req.user);
	}
}

module.exports = UserService;
