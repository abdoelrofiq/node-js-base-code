const _ = require('lodash');
const { Op } = require('sequelize');

class ActionsMethod {
	constructor(model) {
		this.model = model;
	}

	operator(row) {
		let newOperator = null;
		let newValue = null;
		switch (row.operator) {
		case '=':
			newOperator = Op.eq;
			newValue = row.value;
			break;
		case '!=':
			newOperator = Op.ne;
			newValue = row.value;
			break;
		default:
			newOperator = row.operator;
			newValue = row.value;
		}

		return { newOperator, newValue };
	}

	conversionRules(rules) {
		let newConversionRules = [];

		_.forEach(rules, (row) => {
			const operatorValue = this.operator(row);
			if (row.condition) {
				if (row.condition === 'AND') {
					const andRulesChildValue = this.conversionRules(row.rules);
					newConversionRules.push({ [Op.and]: andRulesChildValue });
				} else if (row.condition === 'OR') {
					const orRulesChildValue = this.conversionRules(row.rules);
					newConversionRules.push({ [Op.or]: orRulesChildValue });
				}
			} else {
				newConversionRules.push({
					[row.field]: { [operatorValue.newOperator]: operatorValue.newValue },
				});
			}
		});

		return newConversionRules;
	}

	async findAll(search = null, FQP = {}, options = {}) {
		let newSearch = {};

		const conversionRulesValue = this.conversionRules(FQP.rules);

		if (FQP.condition === 'AND') {
			newSearch = { [Op.and]: conversionRulesValue };
		} else if (FQP.condition === 'OR') {
			newSearch = { [Op.or]: conversionRulesValue };
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
