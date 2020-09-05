const mongoose = require('mongoose');
const Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

const routesSchema = new Schema({
	point_1: {
		type: Number,
	},
	point_2: {
		type: Number,
	},
	mode: {
		type: ObjectId,
	},
});
module.exports = routesSchema;
