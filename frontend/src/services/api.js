import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

// ========== VIVIENDAS ==========

/**
 * Obtiene todas las viviendas con filtros y paginación
 * @param {Object} params - Parámetros de búsqueda y filtros
 * @returns {Promise}
 */
export const getViviendas = (params = {}) => {
  return api.get('/viviendas', { params });
};

/**
 * Obtiene una vivienda por ID
 * @param {number|string} id - ID de la vivienda
 * @returns {Promise}
 */
export const getVivienda = (id) => {
  return api.get(`/viviendas/${id}`);
};

/**
 * Crea una nueva vivienda
 * @param {Object} data - Datos de la vivienda
 * @returns {Promise}
 */
export const createVivienda = (data) => {
  return api.post('/viviendas', data);
};

/**
 * Actualiza una vivienda existente
 * @param {number|string} id - ID de la vivienda
 * @param {Object} data - Datos actualizados
 * @returns {Promise}
 */
export const updateVivienda = (id, data) => {
  return api.put(`/viviendas/${id}`, data);
};

/**
 * Elimina una vivienda
 * @param {number|string} id - ID de la vivienda
 * @returns {Promise}
 */
export const deleteVivienda = (id) => {
  return api.delete(`/viviendas/${id}`);
};

/**
 * Exporta viviendas en formato CSV
 * @param {Object} params - Parámetros de filtrado
 * @returns {Promise}
 */
export const exportViviendasCSV = (params = {}) => {
  return api.get('/viviendas/export', {
    params,
    responseType: 'blob'
  });
};

// ========== PROPIETARIOS ==========

/**
 * Obtiene todos los propietarios
 * @returns {Promise}
 */
export const getPropietarios = () => {
  return api.get('/propietarios');
};

/**
 * Obtiene un propietario por ID
 * @param {number|string} id - ID del propietario
 * @returns {Promise}
 */
export const getPropietario = (id) => {
  return api.get(`/propietarios/${id}`);
};

// Alias para compatibilidad
export const getPropietarioById = getPropietario;

/**
 * Crea un nuevo propietario
 * @param {Object} data - Datos del propietario
 * @returns {Promise}
 */
export const createPropietario = (data) => {
  return api.post('/propietarios', data);
};

/**
 * Actualiza un propietario existente
 * @param {number|string} id - ID del propietario
 * @param {Object} data - Datos actualizados
 * @returns {Promise}
 */
export const updatePropietario = (id, data) => {
  return api.put(`/propietarios/${id}`, data);
};

/**
 * Elimina un propietario
 * @param {number|string} id - ID del propietario
 * @returns {Promise}
 */
export const deletePropietario = (id) => {
  return api.delete(`/propietarios/${id}`);
};

export default api;
