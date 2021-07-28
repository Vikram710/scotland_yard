const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Models = require('../models/Model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Room = Models.Room;
const Player = Models.Player;

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
		console.log(req.body.password, 'HEY');
		let hashPwd = await bcrypt.hash(req.body.password, saltRounds);
		let newRoom = {
			roomCode: req.body.roomCode,
			password: hashPwd,
			owner: ObjectId(req.body.userId),
			users: [ObjectId(req.body.userId)],
			active: true,
		};
		let room = await Room.create(newRoom);
		let newPlayer = {
			user: ObjectId(req.body.userId),
			roomId: room._id,
			online: true,
		};
		let player = await Player.create(newPlayer);
		let response = {
			roomId: room._id,
			owner: req.body.userId,
			playerId: player._id,
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
			const match = await bcrypt.compare(req.body.password, room.password);
			if (room.users.length < 6 && !room.users.includes(ObjectId(req.body.userId)) && match) {
				room.users = [...room.users, ObjectId(req.body.userId)];
				await room.save();
				let newPlayer = {
					user: ObjectId(req.body.userId),
					roomId: room._id,
					online: true,
				};
				let player = await Player.create(newPlayer);
				let response = {
					roomId: room._id,
					owner: req.body.userId,
					playerId: player._id,
				};
				return res.status(200).json({success: true, message: 'Room joined', ...response});
			} else {
				return res.status(400).json({success: false, message: 'Cannot join room'});
			}
		} else {
			return res.status(400).json({success: false, message: 'Room not found'});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: 'Internal server error'});
	}
};
