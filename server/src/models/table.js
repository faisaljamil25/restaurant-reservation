const mongoose = require('mongoose');

const reservationSchema = require('./reservation').schema;

const tableSchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  isAvailable: Boolean,
  location: String,
  reservation: {
    required: false,
    type: reservationSchema,
  },
});
const Table = mongoose.model('Table', tableSchema);

module.exports.model = Table;
module.exports.schema = tableSchema;
