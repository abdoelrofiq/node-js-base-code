const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const { userTesting } = require('./users.test');

chai.use(chaiHttp);
chai.should();

userTesting(chai, app);
