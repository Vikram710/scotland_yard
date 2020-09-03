const express = require('express');
const bodyParser = require('body-parser');
const config = require('./utils/env.js');
const mongoose = require('mongoose');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');
const app = express();

const port = config.port || 3000;
const host = (config.ip && config.boolIp) || 'localhost';

// Import routes
const sampleRouter = require('./routes/sample');
const roomRouter = require('./routes/room');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Data base connection
const db = require('./config/keys').mongoURI;

mongoose
	.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		console.log('Database connection successful');
	})
	.catch((err) => {
		console.error('Database connection error' + err);
	});

// CORS
app.use(cors());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// Sockets
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
	console.log('new conn');

	socket.on('join', ({name, pwd}) => {
		console.log(name, pwd);
	});

	socket.on('disconnect', () => {
		console.log('dis conn');
	});
});

// Routes
app.use('/', sampleRouter);
app.use('/',roomRouter);

//Listen
server.listen(port, host, () => {
	console.log('\x1b[36m%s\x1b[0m', `App running on http://${host}:${port}`);
});
