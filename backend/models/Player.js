const mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.Types.ObjectId;

const playerSchema = new Schema({
    name: {
        type: String,
    },
    character: { 
        type: String,
    },
    ticket: {
        type: Array,
        default: []
    },
    position: {
        type: ObjectId,
    },
    online: {
        type: Boolean,
        default: false
    },
    last_login: {
        type: Date,
        default: Date.now()
    },
    room_id: {
        type: ObjectId,
    }
});
module.exports = playerSchema;