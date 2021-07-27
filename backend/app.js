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

// Socket controllers
const {makeMove} = require('./controllers/gameController');

// Import routes
const userRouter = require('./routes/user');
const roomRouter = require('./routes/room');
const preGameRouter = require('./routes/preGame');
const gameRouter = require('./routes/game');

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

io.on('connection', (socket) => {
	socket.on('move', async ({toPoint, playerId, selectRoute}, callback) => {
		let data = await makeMove(toPoint, playerId, selectRoute);
		if (Object.keys(data).length > 1) {
			console.log(
				`${data.move.madeBy.user.name} moved from ${data.move.fromPosition} to ${data.move.toPosition} using ${data.move.ticketUsed.name}`
			);
			callback('Success', data.room, data.mrXboardDetails);
			socket.broadcast.emit('receiveMove', data);
		} else callback(data.message);
	});

	socket.on('disconnect', () => {
		console.log('disconnect');
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
app.use('/room', roomRouter);
app.use('/user', userRouter);
app.use('/pre_game', preGameRouter);
app.use('/game', gameRouter);

//Listen
server.listen(port, host, () => {
	console.log('\x1b[36m%s\x1b[0m', `App running on http://${host}:${port}`);
});
