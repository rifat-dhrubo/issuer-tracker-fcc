const expect = require('chai').expect;
const express = require('express');
const router = express.Router();
const {
	createIssue,
	updateIssue,
	getIssue,
	deleteIssue,
} = require('../controllers/issuesController');

router
	.route('/:project')
	.post(createIssue)
	.put(updateIssue)
	.delete(deleteIssue);

router.route('/:title').get(getIssue);

module.exports = router;
