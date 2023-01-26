const _ = require('lodash');

exports.createGetDatasResponse = (data, omittedAttributes = [], options) => {
	let pagination = {};
	const result = _.map(data, (result) => {
		const resource = this.modelToResource(result);
		return _.omit(resource, omittedAttributes);
	});

	if (options.totalAllData && options.query) {
		if (options.query.limit !== 'all') {
			pagination.currentPage = Number(options.query.page);
			pagination.totalPages = Math.ceil(
				Number(options.totalAllData) / Number(options.query.limit)
			);
		}
		pagination.limit = isNaN(options.query.limit)
			? options.query.limit
			: Number(options.query.limit);
		pagination.totalRows = result.length;
	}

	return {
		success: true,
		response: {
			data: result,
			pagination,
		},
	};
};

exports.createGetDataResponse = (data) => {
	return {
		success: true,
		response: {
			data,
		},
	};
};

exports.createPostDataResponse = (data) => {
	return {
		success: true,
		response: {
			data,
		},
	};
};

exports.createUpdateDataResponse = (data) => {
	return {
		success: true,
		response: {
			data,
		},
	};
};

exports.createErrorResponse = (statusCode, errorMessage) => {
	return {
		statusCode,
		success: false,
		message: errorMessage,
	};
};

exports.modelToResource = (model) => {
	return model.toJSON ? model.toJSON() : model;
};
