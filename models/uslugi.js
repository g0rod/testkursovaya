const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uslugiSchema = new Schema({
  usluga: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const uslugi = mongoose.model('uslugi', uslugiSchema);

module.exports = uslugi;