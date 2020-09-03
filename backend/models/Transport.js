const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transportSchema = new Schema({
	name: {
		type: String,
	},
});
module.exports = transportSchema;
