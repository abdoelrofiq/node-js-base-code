const _ = require('lodash');
const { Op } = require('sequelize');
const { allModelNames } = require('../models');

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
		case 'IN':
			newOperator = Op.in;
			newValue = row.value;
			break;
		case 'NOT NULL':
			newOperator = Op.ne;
			newValue = null;
			break;
		case 'CONTAINS':
			newOperator = Op.like;
			newValue = `%${row.value}%`;
			break;
		default:
			newOperator = row.operator;
			newValue = row.value;
		}

		return { newOperator, newValue };
	}

	rulesConversion(rules) {
		let newRulesConversion = [];

		_.forEach(rules, (row) => {
			const operatorValue = this.operator(row);
			if (row.condition) {
				if (row.condition === 'AND') {
					const andRulesChildValue = this.rulesConversion(row.rules);
					newRulesConversion.push({ [Op.and]: andRulesChildValue });
				} else if (row.condition === 'OR') {
					const orRulesChildValue = this.rulesConversion(row.rules);
					newRulesConversion.push({ [Op.or]: orRulesChildValue });
				}
			} else {
				newRulesConversion.push({
					[row.field]: { [operatorValue.newOperator]: operatorValue.newValue },
				});
			}
		});

		return newRulesConversion;
	}

	async findAll(search = null, FQP = {}, options = {}) {
		let newSearch = {};
		const limit = +(options.limit === 'all' ? 0 : _.get(options, 'limit', 10));
		const offset =
			options.page && options.page > 0 ? limit * (options.page - 1) : 0;
		const otherOptions = _.omit(options, ['limit', 'offset']);
		const rulesConversionValue = this.rulesConversion(FQP.rules);

		let order = [];
		if (options.sort) {
			const direction = options.direction ? options.direction : 'asc';
			order.push([options.sort, direction]);
		}

		if (FQP.condition === 'AND') {
			newSearch = { [Op.and]: rulesConversionValue };
		} else if (FQP.condition === 'OR') {
			newSearch = { [Op.or]: rulesConversionValue };
		}

		const searchObj = _.isObject(search)
			? search
			: !_.isNull(search)
				? { id: search }
				: {};
		const where = { ...newSearch, ...searchObj };

		return this.model.findAll({
			where,
			...(limit === 0 ? {} : { limit }),
			offset,
			order,
			...otherOptions,
		});
	}

	async findOne(search = null, options = {}) {
		const where = _.isObject(search)
			? search
			: !_.isNull(search)
				? { id: search }
				: {};

		return this.model.findOne({ where, ...options });
	}

	async count(search = null, FQP = {}, options = {}) {
		let newSearch = {};
		const rulesConversionValue = this.rulesConversion(FQP.rules);

		if (FQP.condition === 'AND') {
			newSearch = { [Op.and]: rulesConversionValue };
		} else if (FQP.condition === 'OR') {
			newSearch = { [Op.or]: rulesConversionValue };
		}

		const searchObj = _.isObject(search)
			? search
			: !_.isNull(search)
				? { id: search }
				: {};
		const where = { ...newSearch, ...searchObj };

		return this.model.count({
			where,
			...options,
		});
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

class Models {
	constructor() {
		this.connection = {};

		for (const key in allModelNames) {
			const model = allModelNames[key];
			const keyName = Object.keys(model)?.[0];
			this.connection[keyName] = new ActionsMethod(model[keyName]);
		}
	}
}

module.exports = Models;
