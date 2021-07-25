const mongoose = require('mongoose');
const Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId,
	Mixed = Schema.Types.Mixed;

const playerSchema = new Schema({
	user: {
		type: ObjectId,
		ref: 'User',
	},
	character: {
		type: ObjectId,
		ref: 'Character',
	},
	roomId: {
		type: ObjectId,
		ref: 'Room',
	},
	tickets: {
		type: Mixed,
		default: {}, //{"ticketId":10}
	},
	position: {
		type: Number,
	},
	roundNumber: {
		type: Number,
	},
	online: {
		type: Boolean,
		default: false,
	},
});
module.exports = playerSchema;
