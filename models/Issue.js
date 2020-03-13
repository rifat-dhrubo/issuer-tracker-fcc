const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: 'project must have a title',
		},
		text: {
			type: String,
			required: 'project must have a description',
		},
		created_by: {
			type: String,
			required: 'project must be created by someone',
		},
		assigned_to: String,
		status_text: String,
		open: {
			type: Boolean,
			default: true,
		},

		project: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project',
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_on',
		},
	}
);

function autoPopulate(next) {
	this.populate('project');
	next();
}

issueSchema.pre('findOneAndUpdate', autoPopulate);
issueSchema.pre('findByIdAndUpdate', autoPopulate);

module.exports = mongoose.model('Issue', issueSchema);
