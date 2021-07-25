const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Models = require('../models/Model');

const Ticket = Models.Ticket;
const Player = Models.Player;
const Character = Models.Character;
const Position = Models.Position;
const Route = Models.Route;

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
