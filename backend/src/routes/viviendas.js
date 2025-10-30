const express = require('express');
const router = express.Router();
const {
  getViviendas,
  getViviendaById,
  createVivienda,
  updateVivienda,
  deleteVivienda,
  exportViviendasCSV
} = require('../controllers/viviendasController');
const { validateViviendaBody } = require('../middlewares/validateBody');

// Rutas de viviendas
router.get('/export', exportViviendasCSV); // Debe ir antes de /:id
router.get('/', getViviendas);
router.get('/:id', getViviendaById);
router.post('/', validateViviendaBody, createVivienda);
router.put('/:id', validateViviendaBody, updateVivienda);
router.delete('/:id', deleteVivienda);

module.exports = router;
