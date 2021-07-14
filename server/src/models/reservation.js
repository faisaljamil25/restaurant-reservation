const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
});
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports.model = Reservation;
module.exports.schema = reservationSchema;
