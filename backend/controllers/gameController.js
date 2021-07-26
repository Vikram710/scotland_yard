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

//Socket
exports.makeMove = async (toPoint, playerId, selectRoute) => {
	let player = await Player.findOne({_id: playerId});
	let currentPoint = player.position;
	let room = await Room.findOne({_id: player.roomId});
	// check if its the players turn 

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
		.populate('ticketUsed')
		.execPopulate();
	//check if mrX is caught or trapped (room.active = false, room.winner = detectives)
	// append move id to room.moves
	// room.turn  = next player = (search for index in room.user, allplayers[index])
	// if character role is mrX then room.roundNumber++
	//if room.roundNumber >=24 (room.active = false, room.winner = mrX)
	return {move, room};
};
