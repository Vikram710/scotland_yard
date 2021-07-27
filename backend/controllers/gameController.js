const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Models = require('../models/Model');

const Ticket = Models.Ticket;
const Player = Models.Player;
const Character = Models.Character;
const Position = Models.Position;
const Route = Models.Route;
const Move = Models.Move;
const Room = Models.Room;

const groupByKey = (array, key) => {
	return array.reduce((hash, obj) => {
		if (obj[key] === undefined) return hash;
		return Object.assign(hash, {[obj[key]]: (hash[obj[key]] || []).concat(obj)});
	}, {});
};

const fillXboard = (board) => {
	fullBoard = new Array(24).fill({});
	for (let i = 0; i < board.length; i++) {
		fullBoard[i] = board[i];
	}
	return fullBoard;
};

exports.getPossibleRoutes = async (req, res) => {
	try {
		let p = await Player.findOne({_id: req.body.playerId});
		let currentPoint = p.position;
		let routes = await Route.find({
			$or: [
				{point_1: currentPoint, point_2: req.body.toPoint},
				{point_2: currentPoint, point_1: req.body.toPoint},
			],
		}).populate('mode');
		return res.status(200).json({message: routes});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: 'Internal server error'});
	}
};

exports.getTimeline = async (req, res) => {
	try {
		let moves = await Move.find({roomId: req.body.roomId})
			.populate({
				path: 'madeBy',
				model: 'Player',
				populate: [
					{path: 'user', model: 'User'},
					{path: 'character', model: 'Character'},
				],
			})
			.populate('ticketVal');
		let timeline = groupByKey(moves, 'roundNumber');
		return res.status(200).json({message: timeline});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: 'Internal server error'});
	}
};

//Socket
exports.makeMove = async (toPoint, playerId, selectRoute) => {
	let player = await Player.findOne({_id: playerId}).populate('user').populate('character');
	let ticketVal = await Ticket.findOne({_id: selectRoute});
	let currentPoint = player.position;
	let room = await Room.findOne({_id: player.roomId});
	// check if its the players turn
	if (!room.turn.equals(player._id)) {
		console.log(`It is not ${player.user.name}'s turn`);
		return {};
	}
	// check if he has tickets
	if (player.tickets[ticketVal.name] <= 0) {
		console.log(`no ${ticketVal.name} for ${player.user.name}`);
		return {};
	}
	// check player position collision
	//check if mrX is caught (room.active = false, room.winner = detectives)

	let newMove = {
		roomId: room._id,
		madeBy: playerId,
		fromPosition: currentPoint,
		toPosition: toPoint,
		ticketUsed: selectRoute,
		roundNumber: room.roundNumber,
	};
	let move = await Move.create(newMove);
	move = await move
		.populate({
			path: 'madeBy',
			model: 'Player',
			populate: [
				{path: 'user', model: 'User'},
				{path: 'character', model: 'Character'},
			],
		})
		.populate('ticketVal')
		.execPopulate();
	//Change player position, tickets
	let newPlayerTickets = {...player.tickets};
	newPlayerTickets[ticketVal.name] -= 1;
	player.tickets = newPlayerTickets;
	player.position = toPoint;
	await player.save();

	// room.turn  = next player = (search for index in room.user, allplayers[index].user)
	let allPlayers = await Player.find({}).populate('user').populate('character');
	let nextPlayerIndex = 0;
	room.users.forEach((user, index) => {
		if (user._id.equals(player.user._id)) {
			if (index < room.users.length - 1) nextPlayerIndex = index + 1;
		}
	});
	nextPlayer = allPlayers[nextPlayerIndex];
	room.turn = nextPlayer._id;

	// if character role is mrX then room.roundNumber++
	// if(player.character.role === 'mrX') room.roundNumber++;

	//if room.roundNumber >=24 (room.active = false, room.winner = mrX)
	if (room.roundNumber >= 24) {
		room.active = false;
		room.winner = 'mrX';
	}
	await room.save();

	//send updated mrX board details
	const revealTurn = [3, 8, 13, 18, 24];
	let mrXId = await Player.find({roomId: room._id, user: room.users[0]});
	let mrXboardDetails = await Move.find({madeBy: mrXId}).populate('ticketUsed');
	mrXboardDetails.forEach((ele) => {
		if (revealTurn.indexOf(ele + 1) === -1) {
			ele['fromPosition'] = -1;
			ele['toPosition'] = -1;
		}
	});
	mrXboardDetails = fillXboard(mrXboardDetails);
	return {move, room, allPlayers, mrXboardDetails};
};
