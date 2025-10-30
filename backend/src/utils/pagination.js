/**
 * Calcula los valores de paginación para Prisma
 * @param {number} page - Número de página actual (default: 1)
 * @param {number} limit - Cantidad de elementos por página (default: 10)
 * @returns {Object} - Objeto con skip, take, page y limit
 */
function getPaginationParams(page = 1, limit = 10) {
  const pageNum = Math.max(1, parseInt(page) || 1);
  const limitNum = Math.max(1, Math.min(100, parseInt(limit) || 10)); // Máximo 100 items por página
  
  return {
    skip: (pageNum - 1) * limitNum,
    take: limitNum,
    page: pageNum,
    limit: limitNum
  };
}

/**
 * Calcula la metadata de paginación basándose en el total de registros
 * @param {number} total - Total de registros en la base de datos
 * @param {number} page - Página actual
 * @param {number} limit - Límite por página
 * @returns {Object} - Objeto con información de paginación
 */
function getPaginationMetadata(total, page, limit) {
  const totalPages = Math.ceil(total / limit);
  
  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
}

module.exports = {
  getPaginationParams,
  getPaginationMetadata
};
