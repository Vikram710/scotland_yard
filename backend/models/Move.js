const mongoose = require('mongoose');
const Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

const moveSchema = new Schema({
	madeBy: {
		type: ObjectId,
	},
	fromPosition: {
		type: Number,
	},
	currentPosition: {
		type: Number,
	},
	usedTransport: {
		type: ObjectId,
	},
	roundNumber: {
		type: Number,
		default: 0,
	},
	turnNumber: {
		type: Number,
		default: 1,
	},
	firstMove: {
		type: Boolean,
		default: false,
	},
	time: {
		type: Date,
		default: Date.now(),
	},
});
module.exports = moveSchema;
