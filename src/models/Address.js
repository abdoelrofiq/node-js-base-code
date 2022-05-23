'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Address extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Address.belongsTo(models.User, { foreignKey: 'userId' });
		}
	}
	Address.init(
		{
			streetNumber: DataTypes.INTEGER,
			unitNumber: DataTypes.INTEGER,
			streetName: DataTypes.STRING,
			suburb: DataTypes.STRING,
			state: DataTypes.STRING,
			country: DataTypes.STRING,
			postcode: DataTypes.STRING,
			userId: DataTypes.INTEGER,
			deletedAt: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			timestamps: true,
			paranoid: true,
			modelName: 'Address',
			tableName: 'addresses',
		}
	);
	return Address;
};
