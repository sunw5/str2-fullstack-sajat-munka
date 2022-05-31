const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  vaccine: {
    type: String,
    required: false,
  }
}, {
  timestamps: true,
});


module.exports = mongoose.model('Person', personSchema);