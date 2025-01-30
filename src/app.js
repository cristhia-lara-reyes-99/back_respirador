const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);


// Ruta para servir archivos estáticos
module.exports = app;

