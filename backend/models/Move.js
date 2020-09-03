const mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const moveSchema = new Schema({
    made_by: {
        type: ObjectId
      },
    from_position: {
        type: ObjectId
      },
    current_position: {
        type: ObjectId
      },
    used_transport: {
        type: Number
      },
    turn_number: {
        type: Number,
        default: 0
      },
    first_move: {
        type: Boolean,
        default: false,
    },
    time: {
        type: Date,
        default: Date.now()
    }
});
module.exports = moveSchema;