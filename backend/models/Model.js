const mongoose = require('mongoose');


const gameSchema = require('./Game');
const roomSchema = require('./Room');
const positionSchema = require('./Position');
const playerSchema = require('./Player');
const moveSchema = require('./Move');
const ticketSchema = require('./Ticket');


// define and create all of your models

const Room = mongoose.model('Room', roomSchema);
const Ticket = mongoose.model('Ticket', ticketSchema);
const Move = mongoose.model('Move', moveSchema);
const Position = mongoose.model('Position', positionSchema);
const Player = mongoose.model('Player', playerSchema);
const Game = mongoose.model('Game', gameSchema);

module.exports = {
Game: Game,
Ticket: Ticket,
Move: Move,
Player: Player,
Position: Position,
Room: Room
}