const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Models = require('../models/Model');

const Room = Models.Room;
const Player = Models.Player;
const Game = Models.Game;

const createRoomCode = async () => {
	let roomCode = String(Math.round(Math.random() * Math.pow(10, 9)));
	roomCode = roomCode.substring(0, 3) + '-' + roomCode.substring(3, 6) + '-' + roomCode.substring(6, 9);
	try {
		let query = await Room.findOne({roomCode: roomCode});
		if (!query) {
			console.log('Room Code : ', roomCode);
		} else {
			createRoom();
		}
	} catch (error) {
		roomCode = -1;
	}
	return roomCode;
};

exports.getRoomCode = async (req, res) => {
	let roomCode = await createRoomCode();
	if (roomCode === -1) return res.status(500).json({message: 'Internal server error'});

	return res.status(200).json({roomCode});
};

exports.createRoom = async (req, res) => {
	try {
		let newRoom = {
			roomCode: req.body.roomCode,
			password: req.body.password,
			owner: ObjectId(req.body.userId),
			players: [ObjectId(req.body.userId)],
			active: true,
		};
		let room = await Room.create(newRoom);

		let newGame = {
			roomId: room._id,
		};
		let game = await Game.create(newGame);

		let response = {
			roomId: room._id,
			owner: req.body.userId,
			game: game._id,
		};
		return res.status(200).json({message: 'Created Room', ...response});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: 'Internal server error'});
	}
};

exports.joinRoom = async (req, res) => {
	let room = await Room.findOne({roomCode: req.body.roomCode});
	try {
		if (room) {
			if (
				room.players.length < 6 &&
				!room.players.includes(ObjectId(req.body.userId)) &&
				room.password === req.body.password
			) {
				room.players = [...room.players, ObjectId(req.body.userId)];
				await room.save();
				return res.status(200).json({success: false, error: 'Room joined'});
			} else {
				return res.status(400).json({success: false, error: 'Cannot join room'});
			}
		} else {
			return res.status(400).json({success: false, error: 'Room not found'});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: 'Internal server error'});
	}
};
