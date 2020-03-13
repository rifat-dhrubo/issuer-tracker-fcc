const Issue = require('../models/Issue');
const Project = require('../models/Project');
const { theSureThing } = require('../utils/handlers');
const mongoose = require('mongoose');

const createIssue = async (req, res) => {
	const projectName = req.params.project;
	const [projectErr, projectData] = await theSureThing(
		Project.findOne({ title: projectName }).exec()
	);

	if (projectData) {
		const { _id } = projectData;
		const {
			issue_title: title,
			issue_text: text,
			created_by,
			assigned_to,
			status_text,
		} = req.body;
		const [issueErr, issueData] = await theSureThing(
			Issue.create({
				title,
				text,
				created_by,
				assigned_to: assigned_to || '',
				status_text: status_text || '',
				project: _id,
			})
		);
		if (issueErr) {
			res.json({ error: 'not enough filed' });
		} else {
			res.json(issueData);
		}
	}
	if (projectErr) res.json(projectErr);
};

const formDataValidation = (formData) => {
	let queryData = {};
	let id;
	for (const key in formData) {
		if (formData.hasOwnProperty(key)) {
			if (key === 'open') {
				queryData[key] = Boolean(!formData[key]);
			} else if (key === '_id') {
				id = formData[key];
			} else if (formData[key] !== '') {
				queryData[key] = String(formData[key]);
			}
		}
	}

	return { id, queryData };
};

const updateIssue = async (req, res) => {
	const { id, queryData } = formDataValidation(req.body);
	const updatedFieldCount = Object.keys(queryData).length;
	if (updatedFieldCount === 0) {
		res.send('no updated field sent');
		return;
	}
	const [issueErr, issueData] = await theSureThing(
		Issue.findByIdAndUpdate(id, queryData, {
			new: true, // return the new store instead of the old one
			runValidators: true,
		})
			.lean()
			.exec()
	);
	if (issueErr) {
		console.error(issueErr);
		res.send(`could not update ${id}`);
	} else {
		console.log(issueData);
		res.send(`successfully updated`);
	}
};

const getIssue = async (req, res) => {
	const { title } = req.params;
	const queryData = { title };

	console.log(queryData);
	const [issueErr, issueData] = await theSureThing(
		Issue.find({ ...req.query })
			.populate('project')
			.lean()
			.exec()
	);
	if (issueErr) {
		console.error(issueErr);
		res.send(`could not find `);
	} else {
		console.log(issueData);
		res.send('successfully found');
	}
};
const deleteIssue = async (req, res) => {
	const { _id: id } = req.body;
	if (!id) {
		res.send('_id error');
		return;
	}
	const [issueErr, issueData] = await theSureThing(
		Issue.findByIdAndDelete(id)
			.lean()
			.exec()
	);
	if (issueErr) {
		console.error(issueErr);
		res.send(`could not delete ${id}`);
	} else {
		console.log(issueData);
		res.send(`deleted ${id}`);
	}
};

module.exports = { createIssue, updateIssue, getIssue, deleteIssue };
