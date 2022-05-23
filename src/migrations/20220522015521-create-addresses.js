/* eslint-disable no-alert, no-unused-vars */

'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('addresses', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			streetNumber: {
				type: Sequelize.INTEGER,
			},
			unitNumber: {
				type: Sequelize.INTEGER,
			},
			streetName: {
				type: Sequelize.STRING,
			},
			suburb: {
				type: Sequelize.STRING,
			},
			state: {
				type: Sequelize.STRING,
			},
			country: {
				type: Sequelize.STRING,
			},
			postcode: {
				type: Sequelize.STRING,
			},
			userId: {
				type: Sequelize.INTEGER,
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('addresses');
	},
};
