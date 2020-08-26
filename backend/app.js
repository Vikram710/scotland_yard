const express = require('express');
const bodyParser = require('body-parser');
const config = require('./utils/env.js');
const mongoose = require('mongoose');
const app = express();

const port = config.PORT || 3000;

// Import routes

const sampleRouter = require('./routes/sample');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Data base connection 
mongoose
	.connect(`mongodb://${config.server}/${config.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		console.log('Database connection successful');
	})
	.catch((err) => {
		console.error('Database connection error' + err);
    });

// Headers

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// Routes

app.use('/', sampleRouter);

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
