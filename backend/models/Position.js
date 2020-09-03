const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = new Schema({
	place: {
		type: Number,
	},
	mapX: {
		type: Number,
	},
	mapY: {
		type: Number,
	},
});
module.exports = positionSchema;
