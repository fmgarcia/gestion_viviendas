const prisma = require('../services/prismaClient');
const { getPaginationParams, getPaginationMetadata } = require('../utils/pagination');

/**
 * Obtiene todas las viviendas con filtros, búsqueda y paginación
 * GET /api/viviendas
 */
const getViviendas = async (req, res) => {
  try {
    const {
      page,
      limit,
      sort,
      search,
      ciudad,
      provincia,
      minPrecio,
      maxPrecio,
      precioMin, // Alias para compatibilidad
      precioMax, // Alias para compatibilidad
      minHabitaciones,
      piscina,
      tipo,
      tipoOperacion,
      estado
    } = req.query;

    // Configurar paginación
    const { skip, take, page: currentPage, limit: currentLimit } = getPaginationParams(page, limit);

    // Construir filtros dinámicos
    const where = {};

    // Búsqueda en dirección y descripción
    if (search) {
      where.OR = [
        { direccion: { contains: search } },
        { descripcion: { contains: search } }
      ];
    }

    // Filtros específicos
    if (ciudad) where.ciudad = { contains: ciudad };
    if (provincia) where.provincia = { contains: provincia };
    if (tipo) where.tipo = tipo;
    if (tipoOperacion) where.tipoOperacion = tipoOperacion;
    if (estado) where.estado = estado;
    
    // Rango de precio (soporta ambos formatos: minPrecio/maxPrecio y precioMin/precioMax)
    const precioMinimo = minPrecio || precioMin;
    const precioMaximo = maxPrecio || precioMax;
    
    if (precioMinimo || precioMaximo) {
      where.precio = {};
      if (precioMinimo) where.precio.gte = parseFloat(precioMinimo);
      if (precioMaximo) where.precio.lte = parseFloat(precioMaximo);
    }

    // Habitaciones mínimas
    if (minHabitaciones) {
      where.habitaciones = { gte: parseInt(minHabitaciones) };
    }

    // Filtro piscina
    if (piscina !== undefined) {
      where.piscina = piscina === 'true';
    }

    // Configurar ordenamiento
    let orderBy = { createdAt: 'desc' }; // Orden por defecto
    if (sort) {
      const [field, order] = sort.split(':');
      if (['precio', 'metrosCuadrados', 'habitaciones', 'createdAt'].includes(field)) {
        orderBy = { [field]: order === 'asc' ? 'asc' : 'desc' };
      }
    }

    // Ejecutar consultas en paralelo
    const [viviendas, total] = await Promise.all([
      prisma.vivienda.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          propietario: {
            select: {
              id: true,
              nombre: true,
              email: true,
              telefono: true
            }
          }
        }
      }),
      prisma.vivienda.count({ where })
    ]);

    // Calcular metadata de paginación
    const pagination = getPaginationMetadata(total, currentPage, currentLimit);

    res.json({
      success: true,
      data: viviendas,
      pagination
    });
  } catch (error) {
    console.error('Error al obtener viviendas:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener las viviendas',
      error: error.message
    });
  }
};

/**
 * Obtiene una vivienda por ID
 * GET /api/viviendas/:id
 */
const getViviendaById = async (req, res) => {
  try {
    const { id } = req.params;

    const vivienda = await prisma.vivienda.findUnique({
      where: { id: BigInt(id) },
      include: {
        propietario: true
      }
    });

    if (!vivienda) {
      return res.status(404).json({
        success: false,
        message: 'Vivienda no encontrada'
      });
    }

    res.json({
      success: true,
      data: vivienda
    });
  } catch (error) {
    console.error('Error al obtener vivienda:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener la vivienda',
      error: error.message
    });
  }
};

/**
 * Crea una nueva vivienda
 * POST /api/viviendas
 */
const createVivienda = async (req, res) => {
  try {
    const viviendaData = req.body;

    // Convertir tipos específicos si es necesario
    if (viviendaData.propietarioId) {
      viviendaData.propietarioId = parseInt(viviendaData.propietarioId);
    }

    const nuevaVivienda = await prisma.vivienda.create({
      data: viviendaData,
      include: {
        propietario: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Vivienda creada exitosamente',
      data: nuevaVivienda
    });
  } catch (error) {
    console.error('Error al crear vivienda:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear la vivienda',
      error: error.message
    });
  }
};

/**
 * Actualiza una vivienda existente
 * PUT /api/viviendas/:id
 */
const updateVivienda = async (req, res) => {
  try {
    const { id } = req.params;
    const viviendaData = req.body;

    // Verificar si existe
    const existingVivienda = await prisma.vivienda.findUnique({
      where: { id: BigInt(id) }
    });

    if (!existingVivienda) {
      return res.status(404).json({
        success: false,
        message: 'Vivienda no encontrada'
      });
    }

    // Convertir tipos si es necesario
    if (viviendaData.propietarioId) {
      viviendaData.propietarioId = parseInt(viviendaData.propietarioId);
    }

    const viviendaActualizada = await prisma.vivienda.update({
      where: { id: BigInt(id) },
      data: viviendaData,
      include: {
        propietario: true
      }
    });

    res.json({
      success: true,
      message: 'Vivienda actualizada exitosamente',
      data: viviendaActualizada
    });
  } catch (error) {
    console.error('Error al actualizar vivienda:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la vivienda',
      error: error.message
    });
  }
};

/**
 * Elimina una vivienda
 * DELETE /api/viviendas/:id
 */
const deleteVivienda = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si existe
    const existingVivienda = await prisma.vivienda.findUnique({
      where: { id: BigInt(id) }
    });

    if (!existingVivienda) {
      return res.status(404).json({
        success: false,
        message: 'Vivienda no encontrada'
      });
    }

    await prisma.vivienda.delete({
      where: { id: BigInt(id) }
    });

    res.json({
      success: true,
      message: 'Vivienda eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar vivienda:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la vivienda',
      error: error.message
    });
  }
};

/**
 * Exporta viviendas en formato CSV
 * GET /api/viviendas/export
 */
const exportViviendasCSV = async (req, res) => {
  try {
    const {
      search,
      ciudad,
      provincia,
      minPrecio,
      maxPrecio,
      minHabitaciones,
      piscina,
      tipo,
      tipoOperacion,
      estado
    } = req.query;

    // Construir filtros (igual que en getViviendas)
    const where = {};
    if (search) {
      where.OR = [
        { direccion: { contains: search } },
        { descripcion: { contains: search } }
      ];
    }
    if (ciudad) where.ciudad = { contains: ciudad };
    if (provincia) where.provincia = { contains: provincia };
    if (tipo) where.tipo = tipo;
    if (tipoOperacion) where.tipoOperacion = tipoOperacion;
    if (estado) where.estado = estado;
    
    if (minPrecio || maxPrecio) {
      where.precio = {};
      if (minPrecio) where.precio.gte = parseFloat(minPrecio);
      if (maxPrecio) where.precio.lte = parseFloat(maxPrecio);
    }

    if (minHabitaciones) {
      where.habitaciones = { gte: parseInt(minHabitaciones) };
    }

    if (piscina !== undefined) {
      where.piscina = piscina === 'true';
    }

    const viviendas = await prisma.vivienda.findMany({
      where,
      include: {
        propietario: {
          select: {
            nombre: true
          }
        }
      }
    });

    // Crear CSV
    const headers = [
      'ID', 'Referencia', 'Direccion', 'Ciudad', 'Provincia', 'Tipo',
      'Habitaciones', 'Banos', 'MetrosCuadrados', 'Precio', 'TipoOperacion',
      'Estado', 'Piscina', 'Garaje', 'Propietario'
    ];

    const csvRows = [headers.join(',')];

    viviendas.forEach(v => {
      const row = [
        v.id.toString(),
        v.referencia || '',
        `"${v.direccion}"`,
        v.ciudad,
        v.provincia,
        v.tipo,
        v.habitaciones,
        v.banos,
        v.metrosCuadrados || '',
        v.precio.toString(),
        v.tipoOperacion,
        v.estado,
        v.piscina ? 'Si' : 'No',
        v.garaje ? 'Si' : 'No',
        v.propietario ? `"${v.propietario.nombre}"` : ''
      ];
      csvRows.push(row.join(','));
    });

    const csv = csvRows.join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=viviendas.csv');
    res.send('\uFEFF' + csv); // BOM para UTF-8
  } catch (error) {
    console.error('Error al exportar CSV:', error);
    res.status(500).json({
      success: false,
      message: 'Error al exportar CSV',
      error: error.message
    });
  }
};

module.exports = {
  getViviendas,
  getViviendaById,
  createVivienda,
  updateVivienda,
  deleteVivienda,
  exportViviendasCSV
};
