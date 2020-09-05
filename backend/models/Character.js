const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema({
	name: {
		type: String,
	},
	turn: {
		type: Number,
	},
});
module.exports = characterSchema;
