const filterQueryParams = require('../core/queryParser');
const userRoutes = require('./user.route');

module.exports = (app) => {
	app.get('*', filterQueryParams.queryParser);
	app.use('/users', userRoutes);
};
