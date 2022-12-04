const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const callSchema = new Schema({
  call_name: {
    type: String,
    required: true,
  },
  call_phone: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const Call = mongoose.model('Call', callSchema);

module.exports = Call;