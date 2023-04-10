/* eslint-disable no-unused-vars */

'use strict';

const { hashText } = require('../utils/encryption');

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */

		const password = await hashText('123');
		await queryInterface.bulkInsert(
			'users',
			[
				{
					id: 1,
					firstName: 'John',
					lastName: 'Doe',
					username: 'john',
					email: 'john@gmail.com',
					phoneNumber: '085123456789',
					password: password,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */

		await queryInterface.bulkDelete('users', null, {});
	},
};
