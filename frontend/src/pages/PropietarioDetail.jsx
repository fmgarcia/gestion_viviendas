import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getPropietarioById, deletePropietario } from '../services/api';

const PropietarioDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [propietario, setPropietario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    loadPropietario();
  }, [id]);

  const loadPropietario = async () => {
    try {
      const response = await getPropietarioById(id);
      setPropietario(response.data.data);
    } catch (err) {
      setError('Error al cargar los datos del propietario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePropietario(id);
      navigate('/propietarios');
    } catch (err) {
      alert('Error al eliminar el propietario. Puede que tenga viviendas asociadas.');
      console.error(err);
      setDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando propietario...</p>
        </div>
      </div>
    );
  }

  if (error || !propietario) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Propietario no encontrado'}</p>
          <button
            onClick={() => navigate('/propietarios')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Volver al listado
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/propietarios')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al listado
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{propietario.nombre}</h1>
              <p className="text-gray-600 mt-2">Información detallada del propietario</p>
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/propietarios/${id}/editar`}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar
              </Link>
              <button
                onClick={() => setDeleteConfirm(true)}
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar
              </button>
            </div>
          </div>
        </div>

        {/* Información del propietario */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Datos Personales</h2>
          </div>
          <div className="px-6 py-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Nombre completo</label>
                <p className="text-base text-gray-900">{propietario.nombre}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">DNI / NIE</label>
                <p className="text-base text-gray-900">{propietario.dni || 'No especificado'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                <p className="text-base text-gray-900">
                  {propietario.email ? (
                    <a href={`mailto:${propietario.email}`} className="text-blue-600 hover:underline">
                      {propietario.email}
                    </a>
                  ) : (
                    'No especificado'
                  )}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Teléfono</label>
                <p className="text-base text-gray-900">
                  {propietario.telefono ? (
                    <a href={`tel:${propietario.telefono}`} className="text-blue-600 hover:underline">
                      {propietario.telefono}
                    </a>
                  ) : (
                    'No especificado'
                  )}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-500 mb-1">Dirección</label>
                <p className="text-base text-gray-900">{propietario.direccion || 'No especificada'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Viviendas del propietario */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Viviendas ({propietario.viviendas?.length || 0})
            </h2>
          </div>
          <div className="px-6 py-4">
            {propietario.viviendas?.length > 0 ? (
              <div className="space-y-4">
                {propietario.viviendas.map((vivienda) => (
                  <Link
                    key={vivienda.id}
                    to={`/vivienda/${vivienda.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{vivienda.titulo}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {vivienda.direccion}, {vivienda.ciudad} ({vivienda.provincia})
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                            {vivienda.tipo}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            {vivienda.tipoOperacion}
                          </span>
                          <span className="text-xs text-gray-600">
                            {vivienda.habitaciones} hab. • {vivienda.banos} baños • {vivienda.superficie} m²
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-lg font-bold text-blue-600">
                          {new Intl.NumberFormat('es-ES', {
                            style: 'currency',
                            currency: 'EUR',
                            minimumFractionDigits: 0
                          }).format(vivienda.precio)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <p className="text-gray-600">Este propietario no tiene viviendas registradas</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Confirmar eliminación</h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que quieres eliminar a <strong>{propietario.nombre}</strong>? 
              {propietario.viviendas?.length > 0 && (
                <span className="block mt-2 text-red-600">
                  Este propietario tiene {propietario.viviendas.length} vivienda(s) asociada(s). No podrás eliminarlo hasta que reasignes o elimines sus viviendas.
                </span>
              )}
            </p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropietarioDetail;
