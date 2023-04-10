const FQP = require('../core/queryParser');
const userRoutes = require('./user.route');

module.exports = (app) => {
	app.get('*', FQP.queryParser);
	app.use('/users', userRoutes);
};
