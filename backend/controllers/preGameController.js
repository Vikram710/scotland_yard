const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Models = require('../models/Model');

const Ticket = Models.Ticket;
const Player = Models.Player;
const Character = Models.Character;
const Position = Models.Position;
const Room = Models.Room;
const Move = Models.Move;

const characterTicketRelation = {
	mrX: {
		taxi: 4,
		bus: 3,
		underground: 3,
		black: 5,
	},
	detective: {
		taxi: 11,
		bus: 8,
		underground: 4,
		black: 0,
	},
};

const fillXboard = (board) => {
	fullBoard = new Array(24).fill({});
	for (let i = 0; i < board.length; i++) {
		fullBoard[i] = board[i];
	}
	return fullBoard;
};

const allocateTickets = async (player, character) => {
	try {
		let tickets = await Ticket.find({});
		let ticketObject = {};
		tickets.forEach((ele) => {
			ticketObject[ele.name] = characterTicketRelation[character.role][ele.name];
		});
		player.tickets = ticketObject;
		player.save();
	} catch (err) {
		console.log(err);
	}
};

const getRandomPosition = (initialPositions) => {
	let position = Math.floor(Math.random() * 200) + 1;
	while (initialPositions.includes(position)) {
		position = Math.floor(Math.random() * 200) + 1;
	}
	return position;
};

exports.orderAndSelect = async (req, res) => {
	const characterMap = {
		0: 'Mr.X',
		1: 'Red',
		2: 'Blue',
		3: 'Purple',
		4: 'Green',
		5: 'Yellow',
	};
	try {
		let initialPositions = [];
		for (let i = 0; i < req.body.orderedPlayers.length; i++) {
			let player = await Player.findOne({roomId: req.body.roomId, _id: req.body.orderedPlayers[i]._id});
			if (player) {
				let character = await Character.findOne({name: characterMap[i]});
				player.character = character._id;
				let randomPosition = getRandomPosition(initialPositions);
				initialPositions.push(randomPosition);
				player.position = randomPosition;
				await allocateTickets(player, character);
			}
		}
		return res.status(200).json({message: 'Ordered'});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: 'Internal server error'});
	}
};

exports.getCharacters = async (req, res) => {
	try {
		let characters = await Character.find({});
		return res.status(200).json({message: characters});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: 'Internal server error'});
	}
};

exports.getTickets = async (req, res) => {
	try {
		let tickets = await Ticket.find({});
		return res.status(200).json({message: tickets});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: 'Internal server error'});
	}
};

exports.getPositions = async (req, res) => {
	try {
		let positions = await Position.find({});
		return res.status(200).json({message: positions});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: 'Internal server error'});
	}
};

exports.getRoomDetails = async (req, res) => {
	try {
		let room = await Room.findOne({_id: req.body.roomId}).populate('users').populate('owner');
		let players = await Player.find({roomId: req.body.roomId}).populate('user').populate('character');
		const revealTurn = [3, 8, 13, 18, 24];
		let mrXId = await Player.find({roomId: room._id, user: room.users[0]});
		let mrXboardDetails = await Move.find({madeBy: mrXId}).populate('ticketUsed');
		mrXboardDetails.forEach((ele, index) => {
			if (revealTurn.indexOf(index + 1) === -1) {
				ele['fromPosition'] = -1;
				ele['toPosition'] = -1;
			}
		});
		mrXboardDetails = fillXboard(mrXboardDetails);
		return res.status(200).json({message: {room, players, mrXboardDetails}});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: 'Internal server error'});
	}
};
