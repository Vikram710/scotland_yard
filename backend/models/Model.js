const mongoose = require('mongoose');

const gameSchema = require('./Game');
const roomSchema = require('./Room');
const routeSchema = require('./Route');
const playerSchema = require('./Player');
const moveSchema = require('./Move');
const transportSchema = require('./Transport');
const characterSchema = require('./Character');
const userSchema = require('./User');
const positionSchema = require('./Position');

// define and create all of your models

const Room = mongoose.model('Room', roomSchema);
const Transport = mongoose.model('Transport', transportSchema);
const Move = mongoose.model('Move', moveSchema);
const Route = mongoose.model('Route', routeSchema);
const Player = mongoose.model('Player', playerSchema);
const Game = mongoose.model('Game', gameSchema);
const Character = mongoose.model('Character', characterSchema);
const User = mongoose.model('User', userSchema);
const Position = mongoose.model('Position', positionSchema);

module.exports = {
	Game,
	Transport,
	Move,
	Player,
	Route,
	Room,
	Character,
	User,
	Position,
};
