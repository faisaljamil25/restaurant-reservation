const mongoose = require('mongoose');
const tableSchema = require('./table').schema;

const daySchema = new mongoose.Schema({
  date: Date,
  tables: [tableSchema],
});
const Day = mongoose.model('Day', daySchema);

module.exports.model = Day;
module.exports.schema = daySchema;
