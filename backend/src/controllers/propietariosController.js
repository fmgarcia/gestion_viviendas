const prisma = require('../services/prismaClient');

/**
 * Obtiene todos los propietarios
 * GET /api/propietarios
 */
const getPropietarios = async (req, res) => {
  try {
    const propietarios = await prisma.propietario.findMany({
      include: {
        viviendas: true
      },
      orderBy: {
        nombre: 'asc'
      }
    });

    res.json({
      success: true,
      data: propietarios
    });
  } catch (error) {
    console.error('Error al obtener propietarios:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los propietarios',
      error: error.message
    });
  }
};

/**
 * Obtiene un propietario por ID
 * GET /api/propietarios/:id
 */
const getPropietarioById = async (req, res) => {
  try {
    const { id } = req.params;

    const propietario = await prisma.propietario.findUnique({
      where: { id: parseInt(id) },
      include: {
        viviendas: true
      }
    });

    if (!propietario) {
      return res.status(404).json({
        success: false,
        message: 'Propietario no encontrado'
      });
    }

    res.json({
      success: true,
      data: propietario
    });
  } catch (error) {
    console.error('Error al obtener propietario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el propietario',
      error: error.message
    });
  }
};

/**
 * Crea un nuevo propietario
 * POST /api/propietarios
 */
const createPropietario = async (req, res) => {
  try {
    const propietarioData = req.body;

    const nuevoPropietario = await prisma.propietario.create({
      data: propietarioData
    });

    res.status(201).json({
      success: true,
      message: 'Propietario creado exitosamente',
      data: nuevoPropietario
    });
  } catch (error) {
    console.error('Error al crear propietario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear el propietario',
      error: error.message
    });
  }
};

/**
 * Actualiza un propietario existente
 * PUT /api/propietarios/:id
 */
const updatePropietario = async (req, res) => {
  try {
    const { id } = req.params;
    const propietarioData = req.body;

    const existingPropietario = await prisma.propietario.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingPropietario) {
      return res.status(404).json({
        success: false,
        message: 'Propietario no encontrado'
      });
    }

    const propietarioActualizado = await prisma.propietario.update({
      where: { id: parseInt(id) },
      data: propietarioData
    });

    res.json({
      success: true,
      message: 'Propietario actualizado exitosamente',
      data: propietarioActualizado
    });
  } catch (error) {
    console.error('Error al actualizar propietario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el propietario',
      error: error.message
    });
  }
};

/**
 * Elimina un propietario
 * DELETE /api/propietarios/:id
 */
const deletePropietario = async (req, res) => {
  try {
    const { id } = req.params;

    const existingPropietario = await prisma.propietario.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingPropietario) {
      return res.status(404).json({
        success: false,
        message: 'Propietario no encontrado'
      });
    }

    await prisma.propietario.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Propietario eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar propietario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el propietario',
      error: error.message
    });
  }
};

module.exports = {
  getPropietarios,
  getPropietarioById,
  createPropietario,
  updatePropietario,
  deletePropietario
};
