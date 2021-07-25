const mongoose = require('mongoose');
const Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

const roomSchema = new Schema({
	roomCode: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	players: {
		type: Array,
		default: [{type: ObjectId, ref: 'Player'}],
	},
	turn: {
		type: ObjectId,
		ref: 'Player',
	},
	roundNumber: {
		type: Number,
		default: 1,
	},
	owner: {
		type: ObjectId,
		ref: 'User',
	},
	moves: {
		type: Array,
		default: [{type: ObjectId, ref: 'Move'}],
	},
	winner: {
		type: String,
		default: '', // dectectives or MrX
	},
	active: {
		type: Boolean,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});
module.exports = roomSchema;
