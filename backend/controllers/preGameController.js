const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Models = require('../models/Model');

const Ticket = Models.Ticket;
const Player = Models.Player;
const Character = Models.Character;
const Position = Models.Position;

const characterTicketRelation = {
	detective: {
		taxi: 4,
		bus: 3,
		underground: 3,
		black: 5,
	},
	mrX: {
		taxi: 11,
		bus: 8,
		underground: 4,
		black: 0,
	},
};

const allocateTickets = async (player, character) => {
	try {
		let tickets = await Ticket.find({});
		let ticketObject = {};
		tickets.forEach((ele) => {
			ticketObject[ele._id] = characterTicketRelation[character.role][ele.name];
		});
		player.tickets = ticketObject;
		player.save();
	} catch (err) {
		console.log(err);
	}
};

const getRandomPosition = (initialPositions) => {
	let position = 0;
	while (initialPositions.includes(position)) {
		position = Math.floor(Math.random() * 200) + 1;
	}
	return position;
};

exports.orderAndSelect = async (req, res) => {
	try {
		let initialPositions = [];
		for (let i = 0; i < req.body.orderedPlayers.length; i++) {
			let player = await Player.findOne({roomId: req.body.roomCode, _id: req.body.orderedPlayers[i].playerid});
			if (player) {
				let character = await Character.findOne({role: req.body.role, name: req.body.name});
				player.character = character._id;
				let randomPosition = getRandomPosition(initialPositions);
				initialPositions.push(randomPosition);
				player.position = randomPosition;
				player.save();
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
