'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasOne(models.Address, { foreignKey: 'userId' });
		}
	}

	User.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			username: DataTypes.STRING,
			email: {
				type: DataTypes.TEXT,
				allowNull: false,
				unique: true,
			},
			phoneNumber: DataTypes.STRING,
			password: DataTypes.STRING,
			deletedAt: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			timestamps: true,
			paranoid: true,
			modelName: 'User',
			tableName: 'users',
		}
	);

	return User;
};
