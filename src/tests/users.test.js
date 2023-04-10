/* eslint-disable no-undef */

exports.userTesting = (chai, app) => {
	describe('User', () => {
		const id = 4;
		describe('GET /', () => {
			it('should create a user', (done) => {
				chai
					.request(app)
					.post('/users')
					.send({
						email: 'unit-testing@gmail.com',
						firstName: 'unit',
						lastName: 'testing',
						username: 'unit',
						phoneNumber: '085134509123',
						password: '123',
						confirmPassword: '123',
					})
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						done();
					});
			});

			it('should update a user', (done) => {
				chai
					.request(app)
					.patch(`/users/${id}`)
					.send({
						firstName: 'I am a',
						lastName: 'unit testing',
					})
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						done();
					});
			});

			it('should get all users', (done) => {
				chai
					.request(app)
					.get('/users')
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						done();
					});
			});

			it('should get a single user', (done) => {
				chai
					.request(app)
					.get(`/users/${id}`)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						done();
					});
			});

			it('should not get a single user', (done) => {
				chai
					.request(app)
					.get('/users/none')
					.end((err, res) => {
						res.should.have.status(400);
						done();
					});
			});

			it('should delete a user', (done) => {
				chai
					.request(app)
					.delete(`/users/${id}`)
					.end((err, res) => {
						res.should.have.status(204);
						done();
					});
			});
		});
	});
};
