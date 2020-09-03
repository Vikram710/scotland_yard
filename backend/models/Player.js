const mongoose = require('mongoose');
const Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId,
	Mixed = Schema.Types.Mixed;

const playerSchema = new Schema({
	user: {
		type: ObjectId,
	},
	character: {
		type: ObjectId,
	},
	roomId: {
		type: ObjectId,
	},
	ticket: {
		type: Mixed,
		default: [],
	},
	position: {
		type: Number,
	},
	online: {
		type: Boolean,
		default: false,
	},
});
module.exports = playerSchema;
