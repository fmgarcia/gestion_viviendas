import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getVivienda, deleteVivienda } from '../services/api';

const ViviendaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vivienda, setVivienda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVivienda();
  }, [id]);

  const fetchVivienda = async () => {
    try {
      const response = await getVivienda(id);
      setVivienda(response.data.data);
    } catch (err) {
      setError('Error al cargar la vivienda');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta vivienda?')) {
      try {
        await deleteVivienda(id);
        alert('Vivienda eliminada correctamente');
        navigate('/');
      } catch (err) {
        alert('Error al eliminar la vivienda');
        console.error(err);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: vivienda?.moneda || 'EUR'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !vivienda) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Vivienda no encontrada
          </h2>
          <Link to="/" className="btn-primary">
            Volver al listado
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al listado
            </Link>
            <div className="flex gap-2">
              <Link
                to={`/vivienda/${id}/editar`}
                className="btn-secondary"
              >
                ✏️ Editar
              </Link>
              <button
                onClick={handleDelete}
                className="btn-danger"
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Imagen */}
          <div className="h-96 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
            {vivienda.imagenPrincipal ? (
              <img
                src={vivienda.imagenPrincipal}
                alt={vivienda.direccion}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <svg className="w-32 h-32 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <p className="text-xl">Sin imagen disponible</p>
              </div>
            )}
          </div>

          {/* Contenido */}
          <div className="p-8">
            {/* Encabezado */}
            <div className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm font-semibold text-gray-500 uppercase">
                    {vivienda.referencia || 'Sin referencia'}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mt-1">
                    {vivienda.direccion}
                  </h1>
                  <p className="text-lg text-gray-600 mt-1">
                    {vivienda.ciudad}, {vivienda.provincia}
                    {vivienda.codigoPostal && ` - ${vivienda.codigoPostal}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-blue-600">
                    {formatPrice(vivienda.precio)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 capitalize">
                    {vivienda.tipoOperacion}
                  </p>
                </div>
              </div>

              {/* Estado y tipo */}
              <div className="flex gap-2 mt-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                  {vivienda.tipo}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  vivienda.estado === 'disponible' 
                    ? 'bg-green-100 text-green-800'
                    : vivienda.estado === 'reservado'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {vivienda.estado.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Características principales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <p className="text-2xl font-bold text-gray-900">{vivienda.habitaciones}</p>
                <p className="text-sm text-gray-600">Habitaciones</p>
              </div>
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
                <p className="text-2xl font-bold text-gray-900">{vivienda.banos}</p>
                <p className="text-sm text-gray-600">Baños</p>
              </div>
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <p className="text-2xl font-bold text-gray-900">
                  {vivienda.metrosCuadrados || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">m² construidos</p>
              </div>
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <p className="text-2xl font-bold text-gray-900">
                  {vivienda.anoConstruccion || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">Año construcción</p>
              </div>
            </div>

            {/* Descripción */}
            {vivienda.descripcion && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Descripción</h2>
                <p className="text-gray-700 leading-relaxed">
                  {vivienda.descripcion}
                </p>
              </div>
            )}

            {/* Características adicionales */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Características</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {vivienda.planta !== null && (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded">
                    <span className="text-gray-700">📍 Planta:</span>
                    <span className="font-semibold">{vivienda.planta}</span>
                  </div>
                )}
                <div className={`flex items-center gap-2 p-3 rounded ${vivienda.piscina ? 'bg-blue-50 text-blue-800' : 'bg-gray-50 text-gray-500'}`}>
                  <span>🏊</span>
                  <span className="font-semibold">Piscina</span>
                  <span>{vivienda.piscina ? '✓' : '✗'}</span>
                </div>
                <div className={`flex items-center gap-2 p-3 rounded ${vivienda.garaje ? 'bg-blue-50 text-blue-800' : 'bg-gray-50 text-gray-500'}`}>
                  <span>🚗</span>
                  <span className="font-semibold">Garaje</span>
                  <span>{vivienda.garaje ? '✓' : '✗'}</span>
                </div>
                <div className={`flex items-center gap-2 p-3 rounded ${vivienda.trastero ? 'bg-blue-50 text-blue-800' : 'bg-gray-50 text-gray-500'}`}>
                  <span>📦</span>
                  <span className="font-semibold">Trastero</span>
                  <span>{vivienda.trastero ? '✓' : '✗'}</span>
                </div>
                <div className={`flex items-center gap-2 p-3 rounded ${vivienda.terraza ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-500'}`}>
                  <span>🌿</span>
                  <span className="font-semibold">Terraza</span>
                  <span>{vivienda.terraza ? '✓' : '✗'}</span>
                </div>
                <div className={`flex items-center gap-2 p-3 rounded ${vivienda.ascensor ? 'bg-blue-50 text-blue-800' : 'bg-gray-50 text-gray-500'}`}>
                  <span>🛗</span>
                  <span className="font-semibold">Ascensor</span>
                  <span>{vivienda.ascensor ? '✓' : '✗'}</span>
                </div>
                {vivienda.calefaccion && (
                  <div className="flex items-center gap-2 p-3 bg-orange-50 text-orange-800 rounded">
                    <span>🔥</span>
                    <span className="font-semibold capitalize">{vivienda.calefaccion.replace('_', ' ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Propietario */}
            {vivienda.propietario && (
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Propietario</h2>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">Nombre:</span> {vivienda.propietario.nombre}
                  </p>
                  {vivienda.propietario.email && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Email:</span>{' '}
                      <a href={`mailto:${vivienda.propietario.email}`} className="text-blue-600 hover:underline">
                        {vivienda.propietario.email}
                      </a>
                    </p>
                  )}
                  {vivienda.propietario.telefono && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Teléfono:</span>{' '}
                      <a href={`tel:${vivienda.propietario.telefono}`} className="text-blue-600 hover:underline">
                        {vivienda.propietario.telefono}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Coordenadas */}
            {(vivienda.lat || vivienda.lng) && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Ubicación</h2>
                <p className="text-gray-700">
                  Coordenadas: {vivienda.lat}, {vivienda.lng}
                </p>
              </div>
            )}

            {/* Información adicional */}
            <div className="text-sm text-gray-500 border-t pt-4">
              <p>ID: {vivienda.id}</p>
              <p>Creada: {new Date(vivienda.createdAt).toLocaleDateString('es-ES')}</p>
              {vivienda.updatedAt && (
                <p>Actualizada: {new Date(vivienda.updatedAt).toLocaleDateString('es-ES')}</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViviendaDetail;
