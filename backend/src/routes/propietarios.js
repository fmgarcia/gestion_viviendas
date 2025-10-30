const express = require('express');
const router = express.Router();
const {
  getPropietarios,
  getPropietarioById,
  createPropietario,
  updatePropietario,
  deletePropietario
} = require('../controllers/propietariosController');
const { validatePropietarioBody } = require('../middlewares/validateBody');

// Rutas de propietarios
router.get('/', getPropietarios);
router.get('/:id', getPropietarioById);
router.post('/', validatePropietarioBody, createPropietario);
router.put('/:id', validatePropietarioBody, updatePropietario);
router.delete('/:id', deletePropietario);

module.exports = router;
