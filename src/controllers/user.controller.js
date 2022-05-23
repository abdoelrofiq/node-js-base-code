const { actions } = require('../core/actionMethod');
const { User } = require('../models');

const userController = actions(User);

module.exports = userController;
