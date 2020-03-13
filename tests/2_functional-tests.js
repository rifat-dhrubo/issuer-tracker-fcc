/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
	suite('POST /api/issues/{project} => object with issue data', function() {
		test('Every field filled in', function(done) {
			chai.request(server)
				.post('/api/issues/test')
				.send({
					issue_title: 'Title',
					issue_text: 'text',
					created_by: 'Functional Test - Every field filled in',
					assigned_to: 'Chai and Mocha',
					status_text: 'In QA',
				})
				.end(function(err, res) {
					assert.equal(res.status, 200);
					assert.exists(res.body.issue_title);
					assert.exists(res.body.issue_text);
					assert.exists(res.body.created_by);
					assert.exists(res.body.assigned_to);
					assert.exists(res.body.status_text);
					assert.exists(res.body.created_on);
					assert.exists(res.body.updated_on);
					assert.exists(res.body.open);
					assert.exists(res.body._id);
				});

			done();
		});

		test('Required fields filled in', function(done) {
			chai.request(server)
				.post('/api/issues/test')
				.send({
					issue_title: 'Title',
					issue_text: 'text',
					created_by: 'Functional Test - Every field filled in',
				})
				.end(function(err, res) {
					assert.equal(res.status, 200);
					assert.exists(res.body.issue_title);
					assert.exists(res.body.issue_text);
					assert.exists(res.body.created_by);
				});

			done();
		});

		test('Missing required fields', function(done) {
			chai.request(server)
				.post('/api/issues/test')
				.send({
					issue_title: 'Title',
					issue_text: 'text',
				})
				.end(function(err, res) {
					assert.equal(res.status, 200);
					assert.exists(res.error);
					assert.equal(res.error, 'not enough filed');
				});

			done();
		});
	});

	suite('PUT /api/issues/{project} => text', function() {
		test('No body', function(done) {
			assert.equal(res.status, 200);
			assert.equal(res.body, 'no updated field sent');
		});

		test('One field to update', function(done) {
			assert.equal(res.status, 200);
			assert.equal(res.body, 'successfully updated');
		});

		test('Multiple fields to update', function(done) {
			assert.equal(res.status, 200);
			assert.equal(res.body, 'successfully updated');
		});
	});

	suite('GET /api/issues/{project} => Array of objects with issue data', function() {
		test('No filter', function(done) {
			chai.request(server)
				.get('/api/issues/test')
				.query({})
				.end(function(err, res) {
					assert.equal(res.status, 200);
					assert.isArray(res.body);
					assert.property(res.body, 'issue_title');
					assert.property(res.body, 'issue_text');
					assert.property(res.body, 'created_on');
					assert.property(res.body, 'updated_on');
					assert.property(res.body, 'created_by');
					assert.property(res.body, 'assigned_to');
					assert.property(res.body, 'open');
					assert.property(res.body, 'status_text');
					assert.property(res.body, '_id');
					done();
				});
		});

		test('One filter', function(done) {
			chai.request(server)
				.get('/api/issues/test')
				.query('?created_by=Joe')
				.end(function(err, res) {
					assert.equal(res.status, 200);
					assert.isArray(res.body);
					assert.property(res.body, 'issue_title');
					assert.property(res.body, 'issue_text');
					assert.property(res.body, 'created_on');
					assert.property(res.body, 'updated_on');
					assert.property(res.body, 'created_by');
					assert.property(res.body, 'assigned_to');
					assert.property(res.body, 'open');
					assert.property(res.body, 'status_text');
					assert.property(res.body, '_id');
					assert.equal(res.body.created_by, 'Joe');
					done();
				});
		});

		test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
			chai.request(server)
				.get('/api/issues/test')
				.query('?open=true&assigned_to=Joe')
				.end(function(err, res) {
					assert.equal(res.status, 200);
					assert.isArray(res.body);
					assert.property(res.body, 'issue_title');
					assert.property(res.body, 'issue_text');
					assert.property(res.body, 'created_on');
					assert.property(res.body, 'updated_on');
					assert.property(res.body, 'created_by');
					assert.property(res.body, 'assigned_to');
					assert.property(res.body, 'open');
					assert.property(res.body, 'status_text');
					assert.property(res.body, '_id');
					assert.equal(res.body.created_by, 'Joe');
					assert.equal(res.body.open, 'true');
					done();
				});
		});
	});

	suite('DELETE /api/issues/{project} => text', function() {
		test('No _id', function(done) {
			chai.request(server)
				.get('/api/issues/test')
				.query('?open=true&assigned_to=Joe')
				.end(function(err, res) {
					assert.equal(res.status, 200);
					assert.isArray(res.body);
					assert.property(res.body, 'issue_title');
					assert.property(res.body, 'issue_text');
					assert.property(res.body, 'created_on');
					assert.property(res.body, 'updated_on');
					assert.property(res.body, 'created_by');
					assert.property(res.body, 'assigned_to');
					assert.property(res.body, 'open');
					assert.property(res.body, 'status_text');
					assert.property(res.body, '_id');
					assert.equal(res.body.created_by, 'Joe');
					assert.equal(res.body.open, 'true');
					done();
				});
		});

		test('Valid _id', function(done) {});
	});
});
