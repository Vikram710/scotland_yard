const mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const gameSchema = new Schema({
    room_id: {
        type: ObjectId,
        required: true
      },
      moves: {
        type: Array,
        default: []
      },
      over: {
        type: Boolean,
        default: false
      },
      winner: {
        type: Array,
        default: []
      }
});
module.exports = gameSchema;