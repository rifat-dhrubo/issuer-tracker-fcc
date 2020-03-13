const expect = require('chai').expect;
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { theSureThing } = require('../utils/handlers');

router.route('/').post(async (req, res) => {
	const { project_title: title } = req.body;

	const [err, data] = await theSureThing(Project.findOne({ title }).exec());
	if (data === null) {
		const [err, data] = await theSureThing(Project.create({ title }));
		console.error(err);
		res.json({ err, data });
	} else {
		res.json({
			err,
			data: 'Already have that project on DB',
		});
	}
});

module.exports = router;
