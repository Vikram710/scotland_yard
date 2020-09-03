const mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const ticketSchema = new Schema({
    ticket_index: {
        type: Number
    },
    ticket_number: {
        type: Number
    },
});
module.exports = ticketSchema;