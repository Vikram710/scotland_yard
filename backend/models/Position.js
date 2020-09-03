const mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const positionSchema = new Schema({
      transport_details: {
        type: [Schema.Types.Mixed],
      },
      position_number: {
        type: Number
      }
});
module.exports = positionSchema;