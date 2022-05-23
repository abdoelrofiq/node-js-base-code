const _ = require('lodash');
const { Op } = require('sequelize');

exports.findAll =
	(model) =>
		(filter = null, filterQueryParams = {}, options = {}) => {
			const rules = [];
			let newFilter = {};

			_.forEach(filterQueryParams.rules, (row) => {
				let newOperator = null;
				let newValue = null;
				switch (row.operator) {
				case '=':
					newOperator = Op.eq;
					newValue = row.value;
					break;
				default:
					newOperator = row.operator;
				}

				rules.push({
					[row.field]: { [newOperator]: newValue },
				});
			});

			if (filterQueryParams.condition === 'AND') {
				newFilter = { [Op.and]: rules };
			} else if (filterQueryParams.condition === 'OR') {
				newFilter = { [Op.or]: rules };
			}

			const filterObj = _.isObject(filter)
				? filter
				: !_.isNull(filter)
					? { id: filter }
					: filter;
			const where = { ...newFilter, ...filterObj };

			return model.findAll({ where, ...options });
		};

exports.findOne =
	(model) =>
		(filter = null, options = {}) => {
			const where = _.isObject(filter)
				? filter
				: !_.isNull(filter)
					? { id: filter }
					: filter;

			return model.findOne({ where, ...options });
		};

exports.create = (model) => (data) => {
	return model.create(data);
};

exports.update = (model) => (filter, data) => {
	return model.update(data, { where: filter });
};

exports.delete = (model) => (filter) => {
	return model.destroy({ where: filter });
};

module.exports.actions = (model) => ({
	findAll: exports.findAll(model),
	findOne: exports.findOne(model),
	create: exports.create(model),
	update: exports.update(model),
	delete: exports.delete(model),
});
