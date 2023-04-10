/* eslint-disable no-unused-vars */

'use strict';

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

		await queryInterface.bulkInsert(
			'addresses',
			[
				{
					id: 1,
					streetNumber: null,
					unitNumber: null,
					streetName: null,
					suburb: 'Kediri',
					state: 'Indonesia',
					country: 'Indonesia',
					postcode: 54321,
					userId: 1,
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

		await queryInterface.bulkDelete('addresses', null, {});
	},
};
