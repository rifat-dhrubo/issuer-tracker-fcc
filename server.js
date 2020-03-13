'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai').expect;
const cors = require('cors');

const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');
const path = require('path');
const helmet = require('helmet');
const mongoose = require('mongoose');
const issuesRouter = require('./routes/api');
const projectRouter = require('./routes/project');

require('dotenv').config();

const app = express();

// app.use(helmet());
// parses body and populate req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setting up the static folder
app.use(express.static(path.join(__dirname, 'public')));

// pointing to the view folder
app.set('views', path.join(__dirname, 'views'));

// render engine
app.set('view engine', 'ejs');

app.use(cors({ origin: '*' })); //For FCC testing purposes only

//Index page (static HTML)
app.route('/').get(function(req, res) {
	res.render('index');
});

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API

app.use('/api/project', projectRouter);

app.use('/api/issues', issuesRouter);

//404 Not Found Middleware
app.use(function(req, res, next) {
	res.status(404)
		.type('text')
		.send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, async function() {
	console.log('Listening on port ' + process.env.PORT);
	try {
		await mongoose.connect(
			process.env.MONGO_URI,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			},
			console.log('Successfully connected to the database')
		);
	} catch (mongooseConnectionErr) {
		console.error(mongooseConnectionErr);
	}
	if (process.env.NODE_ENV === 'test') {
		console.log('Running Tests...');
		setTimeout(function() {
			try {
				runner.run();
			} catch (e) {
				const error = e;
				console.log('Tests are not valid:');
				console.log(error);
			}
		}, 1500);
	}
});

module.exports = app; //for testing
