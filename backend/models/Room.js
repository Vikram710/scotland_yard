const mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.Types.ObjectId;

const roomSchema = new Schema({
    created_at: {
        type: Date,
        default: Date.now()
      },
      owner: {
        type: ObjectId,
      },
      active: {
        type: Boolean,
        required: true
      },
      room_name: {
        type: String,
      },
      room_code: {
        type: String,
        required: true,
      },
      players: {
        type: Array,
        default: [],
      },
      turn: {
        type: Number,
        default: 0
      },
      max_number: {
        type: Number,
        default: 10
      }
});
module.exports = roomSchema;