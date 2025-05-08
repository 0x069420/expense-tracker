import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { hashPassword } from '../middleware/bcrypt.js';
import { getData } from '../../frontend/pages/register/register.js';
import Gasto from '../esquema/gasto.js';
import  Usuario  from '../esquema/usuario.js';

dotenv.config();

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
  const { valor, tipo} = req.body;

  try {
    const nuevoGasto = new Gasto({
      valor,
      tipo
    });

    await nuevoGasto.save(); 
    res.status(201).json({ message: 'Gasto guardado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al guardar el gasto', error: err });
  }
});

app.post('/api/register', async (req, res) => {
  const { hashedPassword } = await hashPassword();
  const { name} = getData();

  try {
    const nuevoUsuario = new Usuario({
      name,
      hashedPassword
    });
    await nuevoUsuario.save();
    res.status(201).json({message: 'Usuario registrado correctamente' });
  } catch (err){
    res.status(500).json({ message: 'Error al registrar usuario', error: err});
  }
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  connectDB();
});
