const mongoose = require('mongoose');
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

exports.createRoom = async (req, res) => {
	try {
		let roomCode = await createRoomCode();
		if (roomCode === -1) return res.status(500).json({status_code: 500, message: 'Internal server error'});
		else {
			let newRoom = {
				roomCode: roomCode,
				owner: req.body.userName,
				active: true,
			};
			let room = await Room.create(newRoom);

			let newGame = {
				roomId: room._id,
			};
			await Game.create(newGame);

			let response = {
				roomCode: roomCode,
				owner: req.body.userName,
			};
			return res.status(200).json({status_code: 200, message: 'Created Room', ...response});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({status_code: 500, message: 'Internal server error'});
	}
};

exports.joinRoom = async (req, res) => {
	let room = await Room.findOne({roomCode: req.params.roomCode});
	try {
		if (room) {
			if (room.players.length < 6 && !room.players.includes(req.body.userName)) {
				//testing purpose condition should be <6 && !includes
				room.players = [...room.players, req.body.userName];
				await room.save();
				return res.status(200).json({status_code: 200, success: false, message: 'Room joined'});
			} else {
				return res.status(400).json({success: false, error: 'Cannot join room'});
			}
		} else {
			return res.status(400).json({success: false, error: 'Room not found'});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({status_code: 500, message: 'Internal server error'});
	}
};
