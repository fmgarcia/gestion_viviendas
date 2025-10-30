const express = require('express');
const cors = require('cors');
const viviendasRoutes = require('./routes/viviendas');
const propietariosRoutes = require('./routes/propietarios');

const app = express();

// Middleware para serializar BigInt a String en JSON
BigInt.prototype.toJSON = function() {
  return this.toString();
};

// Middlewares globales
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.get('/', (req, res) => {
  res.json({
    message: 'API de Gestión de Viviendas',
    version: '1.0.0',
    endpoints: {
      viviendas: '/api/viviendas',
      propietarios: '/api/propietarios'
    }
  });
});

app.use('/api/viviendas', viviendasRoutes);
app.use('/api/propietarios', propietariosRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Manejo centralizado de errores
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

module.exports = app;
