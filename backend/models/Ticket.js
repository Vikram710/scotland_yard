const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
	name: {
		type: String,
	},
});
module.exports = ticketSchema;
