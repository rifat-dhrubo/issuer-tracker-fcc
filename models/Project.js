const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	issues: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Issue',
	},
});

module.exports = mongoose.model('Project', projectSchema);
