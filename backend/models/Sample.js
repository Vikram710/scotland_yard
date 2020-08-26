const mongoose = require('mongoose');

let sampleSchema = new mongoose.Schema({
	name: {type: String},
});
module.exports = mongoose.model('Sample', sampleSchema);
