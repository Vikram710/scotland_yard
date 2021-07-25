const mongoose = require('mongoose');
const Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

const moveSchema = new Schema({
	roomId: {
		type: ObjectId,
		ref: 'Room',
	},
	madeBy: {
		type: ObjectId,
		ref: 'Player',
	},
	fromPosition: {
		type: Number,
	},
	toPosition: {
		type: Number,
	},
	ticketUsed: {
		type: ObjectId,
		ref: 'Ticket',
	},
	roundNumber: {
		type: Number,
		default: 0,
	},
	time: {
		type: Date,
		default: Date.now(),
	},
});
module.exports = moveSchema;
