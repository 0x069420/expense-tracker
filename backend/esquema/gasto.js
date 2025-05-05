
const mongoose = require('mongoose');

const gastoSchema = new mongoose.Schema({
  valor: {
    type: Number,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

const Gasto = mongoose.model('Gasto', gastoSchema);

module.exports = Gasto;
