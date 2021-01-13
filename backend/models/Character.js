const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema({
	role: {
		type: String,
	},
	name: {
		type: String,
	},
});
module.exports = characterSchema;
