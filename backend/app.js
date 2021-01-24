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
const userRouter = require('./routes/user');
const roomRouter = require('./routes/room');
const Models = require('./models/Model.js');
const Room = Models.Room;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose
	.connect(config.dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
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

io.set('origins', '*:*');

io.use(async (socket, next) => {
	var handshakeData = socket.request;
	const roomCode = handshakeData._query['room'];
	const username = handshakeData._query['username'];
	socket.roomCode = roomCode;
	socket.username = username;
	console.log('username ' + username + ' ' + roomCode);

	next();
});

io.on('connection', (socket) => {
	const roomCode = socket.roomCode;
	const username = socket.username;

	socket.join(roomCode);
	console.log('new conn');

	socket.on('disconnect', () => {
		console.log('dis conn');
	});
	socket.on('sendMessage', (message,callback) => {
		io.to(roomCode).emit('message',{user: username, text: message});
		callback();
	});
	io.to(roomCode).emit('test', `datasending ${roomCode}`);
	io.to(roomCode).emit('playerJoin', {
		playerName: username,
	});
});

// Initailize locals
const initialiseUserLocal = (req, res, next) => {
	req.locals = {};
	req.locals.initialized = true;
	next();
};

app.use(initialiseUserLocal);

// Routes
app.use(roomRouter);
app.use(userRouter);

//Listen
server.listen(port, host, () => {
	console.log('\x1b[36m%s\x1b[0m', `App running on http://${host}:${port}`);
});
