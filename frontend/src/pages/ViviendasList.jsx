import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getViviendas, exportViviendasCSV } from '../services/api';
import ViviendaCard from '../components/ViviendaCard';
import Pagination from '../components/Pagination';

const ViviendasList = () => {
  const [viviendas, setViviendas] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtros
  const [filters, setFilters] = useState({
    page: 1,
    limit: 9,
    search: '',
    ciudad: '',
    provincia: '',
    minPrecio: '',
    maxPrecio: '',
    minHabitaciones: '',
    piscina: '',
    tipo: '',
    tipoOperacion: '',
    sort: 'createdAt:desc'
  });

  // Cargar viviendas
  const fetchViviendas = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Limpiar filtros vacíos
      const params = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {});

      const response = await getViviendas(params);
      setViviendas(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      setError('Error al cargar las viviendas. Por favor, intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViviendas();
  }, [filters]);

  // Manejadores de cambio de filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1 // Resetear a la primera página al filtrar
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setFilters({
      page: 1,
      limit: 9,
      search: '',
      ciudad: '',
      provincia: '',
      minPrecio: '',
      maxPrecio: '',
      minHabitaciones: '',
      piscina: '',
      tipo: '',
      tipoOperacion: '',
      sort: 'createdAt:desc'
    });
  };

  // Exportar CSV
  const handleExportCSV = async () => {
    try {
      const params = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== '' && key !== 'page' && key !== 'limit') {
          acc[key] = value;
        }
        return acc;
      }, {});

      const response = await exportViviendasCSV(params);
      
      // Crear un link para descargar
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `viviendas_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Error al exportar CSV');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Viviendas
          </h1>
          <Link to="/vivienda/nuevo" className="btn-primary">
            + Nueva Vivienda
          </Link>
        </div>
      </div>

      <div>
        {/* Filtros */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Filtros de búsqueda</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buscar
              </label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Dirección o descripción..."
                className="input-field"
              />
            </div>

            {/* Ciudad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ciudad
              </label>
              <input
                type="text"
                name="ciudad"
                value={filters.ciudad}
                onChange={handleFilterChange}
                placeholder="Ej: Alicante"
                className="input-field"
              />
            </div>

            {/* Provincia */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Provincia
              </label>
              <input
                type="text"
                name="provincia"
                value={filters.provincia}
                onChange={handleFilterChange}
                placeholder="Ej: Alicante"
                className="input-field"
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <select
                name="tipo"
                value={filters.tipo}
                onChange={handleFilterChange}
                className="input-field"
              >
                <option value="">Todos</option>
                <option value="piso">Piso</option>
                <option value="chalet">Chalet</option>
                <option value="adosado">Adosado</option>
                <option value="estudio">Estudio</option>
                <option value="atico">Ático</option>
                <option value="local">Local</option>
              </select>
            </div>

            {/* Operación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Operación
              </label>
              <select
                name="tipoOperacion"
                value={filters.tipoOperacion}
                onChange={handleFilterChange}
                className="input-field"
              >
                <option value="">Todas</option>
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
                <option value="venta/alquiler">Venta/Alquiler</option>
              </select>
            </div>

            {/* Precio mínimo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio mínimo
              </label>
              <input
                type="number"
                name="minPrecio"
                value={filters.minPrecio}
                onChange={handleFilterChange}
                placeholder="0"
                className="input-field"
              />
            </div>

            {/* Precio máximo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio máximo
              </label>
              <input
                type="number"
                name="maxPrecio"
                value={filters.maxPrecio}
                onChange={handleFilterChange}
                placeholder="999999"
                className="input-field"
              />
            </div>

            {/* Habitaciones mínimas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Habitaciones mín.
              </label>
              <input
                type="number"
                name="minHabitaciones"
                value={filters.minHabitaciones}
                onChange={handleFilterChange}
                placeholder="0"
                className="input-field"
              />
            </div>

            {/* Piscina */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Piscina
              </label>
              <select
                name="piscina"
                value={filters.piscina}
                onChange={handleFilterChange}
                className="input-field"
              >
                <option value="">Indiferente</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Ordenar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ordenar por
              </label>
              <select
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
                className="input-field"
              >
                <option value="createdAt:desc">Más reciente</option>
                <option value="createdAt:asc">Más antiguo</option>
                <option value="precio:asc">Precio: menor a mayor</option>
                <option value="precio:desc">Precio: mayor a menor</option>
                <option value="metrosCuadrados:desc">Más grande</option>
                <option value="metrosCuadrados:asc">Más pequeño</option>
              </select>
            </div>

            {/* Botones */}
            <div className="lg:col-span-2 flex gap-2 items-end">
              <button onClick={handleReset} className="btn-secondary flex-1">
                Limpiar filtros
              </button>
              <button onClick={handleExportCSV} className="btn-primary flex-1">
                📥 Exportar CSV
              </button>
            </div>
          </div>
        </div>

        {/* Resultados */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Cargando viviendas...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {!loading && !error && viviendas.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No se encontraron viviendas</h3>
            <p className="mt-1 text-gray-500">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}

        {!loading && !error && viviendas.length > 0 && (
          <>
            {/* Info de resultados */}
            <div className="mb-4 text-sm text-gray-600">
              Mostrando {viviendas.length} de {pagination.total} viviendas
            </div>

            {/* Grid de tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {viviendas.map((vivienda) => (
                <ViviendaCard key={vivienda.id} vivienda={vivienda} />
              ))}
            </div>

            {/* Paginación */}
            <Pagination pagination={pagination} onPageChange={handlePageChange} />
          </>
        )}
      </div>
    </div>
  );
};

export default ViviendasList;
