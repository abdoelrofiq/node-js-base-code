const _ = require('lodash');
const { Op } = require('sequelize');

exports.findAll =
	(model) =>
		(search = null, FQP = {}, options = {}) => {
			const rules = [];
			let newSearch = {};

			_.forEach(FQP.rules, (row) => {
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

			if (FQP.condition === 'AND') {
				newSearch = { [Op.and]: rules };
			} else if (FQP.condition === 'OR') {
				newSearch = { [Op.or]: rules };
			}

			const searchObj = _.isObject(search)
				? search
				: !_.isNull(search)
					? { id: search }
					: {};
			const where = { ...newSearch, ...searchObj };

			return model.findAll({ where, ...options });
		};

exports.findOne =
	(model) =>
		(search = null, options = {}) => {
			const where = _.isObject(search)
				? search
				: !_.isNull(search)
					? { id: search }
					: {};

			return model.findOne({ where, ...options });
		};

exports.create = (model) => (data) => {
	return model.create(data);
};

exports.update = (model) => (search, data) => {
	return model.update(data, { where: search });
};

exports.delete = (model) => (search) => {
	return model.destroy({ where: search });
};

module.exports.actions = (model) => ({
	findAll: exports.findAll(model),
	findOne: exports.findOne(model),
	create: exports.create(model),
	update: exports.update(model),
	delete: exports.delete(model),
});
