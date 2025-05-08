const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Usuario = mongoose.model('Usuario', usuarioSchema);
