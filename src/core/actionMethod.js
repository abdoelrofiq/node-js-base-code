const _ = require('lodash');
const { Op } = require('sequelize');

class ActionsMethod {
	constructor(model) {
		this.model = model;
	}

	async findAll(search = null, FQP = {}, options = {}) {
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

		return this.model.findAll({ where, ...options });
	}

	async findOne(search = null, options = {}) {
		const where = _.isObject(search)
			? search
			: !_.isNull(search)
				? { id: search }
				: {};

		return this.model.findOne({ where, ...options });
	}

	async create(data) {
		return this.model.create(data);
	}

	async update(search, data) {
		return this.model.update(data, { where: search });
	}

	async delete(search) {
		return this.model.destroy({ where: search });
	}
}

module.exports = ActionsMethod;
