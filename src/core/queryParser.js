const { FQP } = require('filter-query-parser');

exports.queryParser = (req, res, next) => {
	req.FQP = req.query.search ? FQP.parser(req.query.search) : {};

	next();
};
