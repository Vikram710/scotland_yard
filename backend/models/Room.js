const mongoose = require('mongoose');
const Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

const roomSchema = new Schema({
	roomCode: {
		type: String,
		required: true,
	},
	players: {
		type: Array,
		default: [],
	},
	turn: {
		type: ObjectId,
	},
	roundNumber: {
		type: Number,
		default: 0,
	},
	owner: {
		type: String,
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
