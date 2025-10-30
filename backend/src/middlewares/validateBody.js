const { body, validationResult } = require('express-validator');

/**
 * Middleware para validar el cuerpo de las peticiones de viviendas
 */
const validateViviendaBody = [
  body('direccion')
    .notEmpty().withMessage('La dirección es obligatoria')
    .isString().withMessage('La dirección debe ser texto'),
  
  body('ciudad')
    .notEmpty().withMessage('La ciudad es obligatoria')
    .isString().withMessage('La ciudad debe ser texto'),
  
  body('provincia')
    .notEmpty().withMessage('La provincia es obligatoria')
    .isString().withMessage('La provincia debe ser texto'),
  
  body('precio')
    .notEmpty().withMessage('El precio es obligatorio')
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  
  body('tipoOperacion')
    .notEmpty().withMessage('El tipo de operación es obligatorio')
    .isIn(['venta', 'alquiler', 'venta/alquiler']).withMessage('Tipo de operación inválido'),
  
  body('habitaciones')
    .optional()
    .custom((value) => {
      const num = parseInt(value);
      if (isNaN(num) || num < 0) {
        throw new Error('Las habitaciones deben ser un número entero positivo');
      }
      return true;
    }),
  
  body('banos')
    .optional()
    .custom((value) => {
      const num = parseInt(value);
      if (isNaN(num) || num < 0) {
        throw new Error('Los baños deben ser un número entero positivo');
      }
      return true;
    }),
  
  body('metrosCuadrados')
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      if (value === '' || value === null || value === undefined) return true;
      const num = parseInt(value);
      if (isNaN(num) || num < 0) {
        throw new Error('Los metros cuadrados deben ser un número entero positivo');
      }
      return true;
    }),
  
  body('anoConstruccion')
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      if (value === '' || value === null || value === undefined) return true;
      const num = parseInt(value);
      const currentYear = new Date().getFullYear();
      if (isNaN(num) || num < 1800 || num > currentYear) {
        throw new Error('Año de construcción inválido');
      }
      return true;
    }),
  
  body('piscina')
    .optional()
    .isBoolean({ loose: true }).withMessage('Piscina debe ser true o false'),
  
  body('garaje')
    .optional()
    .isBoolean({ loose: true }).withMessage('Garaje debe ser true o false'),
  
  body('trastero')
    .optional()
    .isBoolean({ loose: true }).withMessage('Trastero debe ser true o false'),
  
  body('terraza')
    .optional()
    .isBoolean({ loose: true }).withMessage('Terraza debe ser true o false'),
  
  body('ascensor')
    .optional()
    .isBoolean({ loose: true }).withMessage('Ascensor debe ser true o false'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: errors.array()
      });
    }
    next();
  }
];

/**
 * Middleware para validar el cuerpo de las peticiones de propietarios
 */
const validatePropietarioBody = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isString().withMessage('El nombre debe ser texto'),
  
  body('email')
    .optional()
    .isEmail().withMessage('Email inválido'),
  
  body('telefono')
    .optional()
    .isString().withMessage('El teléfono debe ser texto'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = {
  validateViviendaBody,
  validatePropietarioBody
};
