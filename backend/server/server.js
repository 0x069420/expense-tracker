const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Gasto = require('../esquema/gasto'); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB conectado correctamente");
  } catch (err) {
    console.error("Error conectando a MongoDB", err);
    process.exit(1);
  }
};

app.get('/api/check-db', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ message: 'Conexión a MongoDB exitosa' });
  } catch (err) {
    res.status(500).json({ message: 'Error al conectar a MongoDB' });
  }
});

app.post('/api/gastos', async (req, res) => {
  const { valor, tipo } = req.body;

  try {
    const nuevoGasto = new Gasto({
      valor,
      tipo,
      id
    });

    await nuevoGasto.save();  
    res.status(201).json({ message: 'Gasto guardado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al guardar el gasto', error: err });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  connectDB();
});
