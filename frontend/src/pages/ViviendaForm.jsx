import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getVivienda, createVivienda, updateVivienda, getPropietarios } from '../services/api';

const ViviendaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [propietarios, setPropietarios] = useState([]);
  const [formData, setFormData] = useState({
    referencia: '',
    direccion: '',
    ciudad: '',
    provincia: '',
    codigoPostal: '',
    tipo: 'piso',
    habitaciones: 1,
    banos: 1,
    metrosCuadrados: '',
    anoConstruccion: '',
    planta: '',
    piscina: false,
    garaje: false,
    trastero: false,
    terraza: false,
    ascensor: false,
    calefaccion: 'ninguna',
    precio: '',
    moneda: 'EUR',
    tipoOperacion: 'venta',
    estado: 'disponible',
    lat: '',
    lng: '',
    descripcion: '',
    imagenPrincipal: '',
    propietarioId: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadPropietarios();
    if (isEditMode) {
      loadVivienda();
    }
  }, [id]);

  const loadPropietarios = async () => {
    try {
      const response = await getPropietarios();
      setPropietarios(response.data.data);
    } catch (err) {
      console.error('Error al cargar propietarios:', err);
    }
  };

  const loadVivienda = async () => {
    try {
      setLoading(true);
      const response = await getVivienda(id);
      const vivienda = response.data.data;
      
      // Convertir los datos para el formulario
      setFormData({
        referencia: vivienda.referencia || '',
        direccion: vivienda.direccion || '',
        ciudad: vivienda.ciudad || '',
        provincia: vivienda.provincia || '',
        codigoPostal: vivienda.codigoPostal || '',
        tipo: vivienda.tipo || 'piso',
        habitaciones: vivienda.habitaciones || 1,
        banos: vivienda.banos || 1,
        metrosCuadrados: vivienda.metrosCuadrados || '',
        anoConstruccion: vivienda.anoConstruccion || '',
        planta: vivienda.planta !== null ? vivienda.planta : '',
        piscina: vivienda.piscina || false,
        garaje: vivienda.garaje || false,
        trastero: vivienda.trastero || false,
        terraza: vivienda.terraza || false,
        ascensor: vivienda.ascensor || false,
        calefaccion: vivienda.calefaccion || 'ninguna',
        precio: vivienda.precio || '',
        moneda: vivienda.moneda || 'EUR',
        tipoOperacion: vivienda.tipoOperacion || 'venta',
        estado: vivienda.estado || 'disponible',
        lat: vivienda.lat || '',
        lng: vivienda.lng || '',
        descripcion: vivienda.descripcion || '',
        imagenPrincipal: vivienda.imagenPrincipal || '',
        propietarioId: vivienda.propietarioId || ''
      });
    } catch (err) {
      alert('Error al cargar la vivienda');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es obligatoria';
    }
    if (!formData.ciudad.trim()) {
      newErrors.ciudad = 'La ciudad es obligatoria';
    }
    if (!formData.provincia.trim()) {
      newErrors.provincia = 'La provincia es obligatoria';
    }
    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      newErrors.precio = 'El precio debe ser mayor a 0';
    }
    if (formData.habitaciones < 0) {
      newErrors.habitaciones = 'Las habitaciones no pueden ser negativas';
    }
    if (formData.banos < 0) {
      newErrors.banos = 'Los baños no pueden ser negativos';
    }
    if (formData.metrosCuadrados && parseFloat(formData.metrosCuadrados) <= 0) {
      newErrors.metrosCuadrados = 'Los metros cuadrados deben ser positivos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      alert('Por favor, corrige los errores en el formulario');
      return;
    }

    setLoading(true);

    try {
      // Preparar datos para enviar
      const dataToSend = {
        ...formData,
        habitaciones: parseInt(formData.habitaciones) || 0,
        banos: parseInt(formData.banos) || 0,
        metrosCuadrados: formData.metrosCuadrados ? parseInt(formData.metrosCuadrados) : null,
        anoConstruccion: formData.anoConstruccion ? parseInt(formData.anoConstruccion) : null,
        planta: formData.planta !== '' ? parseInt(formData.planta) : null,
        precio: parseFloat(formData.precio),
        lat: formData.lat ? parseFloat(formData.lat) : null,
        lng: formData.lng ? parseFloat(formData.lng) : null,
        propietarioId: formData.propietarioId ? parseInt(formData.propietarioId) : null,
        referencia: formData.referencia || null,
        codigoPostal: formData.codigoPostal || null,
        descripcion: formData.descripcion || null,
        imagenPrincipal: formData.imagenPrincipal || null
      };

      if (isEditMode) {
        await updateVivienda(id, dataToSend);
        alert('Vivienda actualizada correctamente');
        navigate(`/vivienda/${id}`);
      } else {
        const response = await createVivienda(dataToSend);
        alert('Vivienda creada correctamente');
        navigate(`/vivienda/${response.data.data.id}`);
      }
    } catch (err) {
      console.error('Error al guardar:', err);
      alert(
        err.response?.data?.message || 
        'Error al guardar la vivienda. Por favor, revisa los datos.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
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
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditMode ? 'Editar Vivienda' : 'Nueva Vivienda'}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
          {/* Información básica */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
              Información básica
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Referencia
                </label>
                <input
                  type="text"
                  name="referencia"
                  value={formData.referencia}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="REF-0001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo <span className="text-red-500">*</span>
                </label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="piso">Piso</option>
                  <option value="chalet">Chalet</option>
                  <option value="adosado">Adosado</option>
                  <option value="estudio">Estudio</option>
                  <option value="atico">Ático</option>
                  <option value="local">Local</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className={`input-field ${errors.direccion ? 'border-red-500' : ''}`}
                  placeholder="C/ Gran Vía 12, 3ºA"
                  required
                />
                {errors.direccion && (
                  <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ciudad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  className={`input-field ${errors.ciudad ? 'border-red-500' : ''}`}
                  placeholder="Alicante"
                  required
                />
                {errors.ciudad && (
                  <p className="text-red-500 text-sm mt-1">{errors.ciudad}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Provincia <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleChange}
                  className={`input-field ${errors.provincia ? 'border-red-500' : ''}`}
                  placeholder="Alicante"
                  required
                />
                {errors.provincia && (
                  <p className="text-red-500 text-sm mt-1">{errors.provincia}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código Postal
                </label>
                <input
                  type="text"
                  name="codigoPostal"
                  value={formData.codigoPostal}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="03001"
                />
              </div>
            </div>
          </div>

          {/* Características */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
              Características
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Habitaciones <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="habitaciones"
                  value={formData.habitaciones}
                  onChange={handleChange}
                  className={`input-field ${errors.habitaciones ? 'border-red-500' : ''}`}
                  min="0"
                  required
                />
                {errors.habitaciones && (
                  <p className="text-red-500 text-sm mt-1">{errors.habitaciones}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Baños <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="banos"
                  value={formData.banos}
                  onChange={handleChange}
                  className={`input-field ${errors.banos ? 'border-red-500' : ''}`}
                  min="0"
                  required
                />
                {errors.banos && (
                  <p className="text-red-500 text-sm mt-1">{errors.banos}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Metros Cuadrados
                </label>
                <input
                  type="number"
                  name="metrosCuadrados"
                  value={formData.metrosCuadrados}
                  onChange={handleChange}
                  className={`input-field ${errors.metrosCuadrados ? 'border-red-500' : ''}`}
                  min="0"
                  placeholder="95"
                />
                {errors.metrosCuadrados && (
                  <p className="text-red-500 text-sm mt-1">{errors.metrosCuadrados}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Año de Construcción
                </label>
                <input
                  type="number"
                  name="anoConstruccion"
                  value={formData.anoConstruccion}
                  onChange={handleChange}
                  className="input-field"
                  min="1800"
                  max={new Date().getFullYear()}
                  placeholder="2005"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Planta
                </label>
                <input
                  type="number"
                  name="planta"
                  value={formData.planta}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calefacción
                </label>
                <select
                  name="calefaccion"
                  value={formData.calefaccion}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="ninguna">Ninguna</option>
                  <option value="central">Central</option>
                  <option value="individual_gas">Individual Gas</option>
                  <option value="individual_electrica">Individual Eléctrica</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {/* Checkboxes */}
              <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="piscina"
                    checked={formData.piscina}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">🏊 Piscina</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="garaje"
                    checked={formData.garaje}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">🚗 Garaje</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="trastero"
                    checked={formData.trastero}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">📦 Trastero</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="terraza"
                    checked={formData.terraza}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">🌿 Terraza</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="ascensor"
                    checked={formData.ascensor}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">🛗 Ascensor</label>
                </div>
              </div>
            </div>
          </div>

          {/* Precio y operación */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
              Precio y operación
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  className={`input-field ${errors.precio ? 'border-red-500' : ''}`}
                  min="0"
                  step="0.01"
                  placeholder="220000.00"
                  required
                />
                {errors.precio && (
                  <p className="text-red-500 text-sm mt-1">{errors.precio}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Moneda
                </label>
                <select
                  name="moneda"
                  value={formData.moneda}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Operación <span className="text-red-500">*</span>
                </label>
                <select
                  name="tipoOperacion"
                  value={formData.tipoOperacion}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="venta">Venta</option>
                  <option value="alquiler">Alquiler</option>
                  <option value="venta/alquiler">Venta/Alquiler</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="disponible">Disponible</option>
                  <option value="reservado">Reservado</option>
                  <option value="vendido">Vendido</option>
                  <option value="alquilado">Alquilado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
              Descripción
            </h2>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="input-field"
              rows="5"
              placeholder="Describe la vivienda..."
            />
          </div>

          {/* Ubicación */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
              Ubicación y multimedia
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Latitud
                </label>
                <input
                  type="number"
                  name="lat"
                  value={formData.lat}
                  onChange={handleChange}
                  className="input-field"
                  step="any"
                  placeholder="38.3452"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longitud
                </label>
                <input
                  type="number"
                  name="lng"
                  value={formData.lng}
                  onChange={handleChange}
                  className="input-field"
                  step="any"
                  placeholder="-0.4810"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Imagen Principal
                </label>
                <input
                  type="text"
                  name="imagenPrincipal"
                  value={formData.imagenPrincipal}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
            </div>
          </div>

          {/* Propietario */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
              Propietario
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seleccionar Propietario
              </label>
              <select
                name="propietarioId"
                value={formData.propietarioId}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Sin propietario</option>
                {propietarios.map(prop => (
                  <option key={prop.id} value={prop.id}>
                    {prop.nombre} {prop.email && `(${prop.email})`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Guardando...' : isEditMode ? '✓ Actualizar' : '+ Crear Vivienda'}
            </button>
            <Link
              to={isEditMode ? `/vivienda/${id}` : '/'}
              className="btn-secondary flex-1 text-center"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ViviendaForm;
