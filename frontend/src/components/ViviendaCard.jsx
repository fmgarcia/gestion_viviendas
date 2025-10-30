import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente de tarjeta de vivienda
 */
const ViviendaCard = ({ vivienda }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: vivienda.moneda || 'EUR'
    }).format(price);
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      {/* Imagen */}
      <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
        {vivienda.imagenPrincipal ? (
          <img
            src={vivienda.imagenPrincipal}
            alt={vivienda.direccion}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <p className="text-sm">Sin imagen</p>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Referencia y tipo */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-gray-500 uppercase">
            {vivienda.referencia || 'Sin ref.'}
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 capitalize">
            {vivienda.tipo}
          </span>
        </div>

        {/* Dirección */}
        <h3 className="font-bold text-lg mb-1 text-gray-900 line-clamp-2">
          {vivienda.direccion}
        </h3>
        
        {/* Ciudad y provincia */}
        <p className="text-sm text-gray-600 mb-3">
          {vivienda.ciudad}, {vivienda.provincia}
        </p>

        {/* Características */}
        <div className="flex gap-4 mb-3 text-sm text-gray-700">
          <div className="flex items-center gap-1" title="Habitaciones">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>{vivienda.habitaciones}</span>
          </div>
          
          <div className="flex items-center gap-1" title="Baños">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
            <span>{vivienda.banos}</span>
          </div>
          
          {vivienda.metrosCuadrados && (
            <div className="flex items-center gap-1" title="Metros cuadrados">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>{vivienda.metrosCuadrados}m²</span>
            </div>
          )}
        </div>

        {/* Iconos de características */}
        <div className="flex gap-2 mb-4">
          {vivienda.piscina && (
            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded" title="Piscina">
              🏊 Piscina
            </span>
          )}
          {vivienda.garaje && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded" title="Garaje">
              🚗 Garaje
            </span>
          )}
          {vivienda.terraza && (
            <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded" title="Terraza">
              🌿 Terraza
            </span>
          )}
        </div>

        {/* Precio y acción */}
        <div className="flex justify-between items-center pt-3 border-t">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {formatPrice(vivienda.precio)}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {vivienda.tipoOperacion}
            </p>
          </div>
          
          <Link
            to={`/vivienda/${vivienda.id}`}
            className="btn-primary text-sm"
          >
            Ver detalles
          </Link>
        </div>

        {/* Estado */}
        {vivienda.estado !== 'disponible' && (
          <div className="mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              vivienda.estado === 'reservado' 
                ? 'bg-yellow-100 text-yellow-800' 
                : vivienda.estado === 'vendido' || vivienda.estado === 'alquilado'
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {vivienda.estado.toUpperCase()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViviendaCard;
