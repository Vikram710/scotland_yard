const mongoose = require('mongoose');
const Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

const gameSchema = new Schema({
	roomId: {
		type: ObjectId,
		required: true,
	},
	moves: {
		type: Array,
		default: [],
	},
	over: {
		type: Boolean,
		default: false,
	},
	winner: {
		type: Array,
		default: [],
	},
});
module.exports = gameSchema;
