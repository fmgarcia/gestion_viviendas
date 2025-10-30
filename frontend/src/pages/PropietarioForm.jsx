import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPropietario, updatePropietario, getPropietarioById } from '../services/api';

const PropietarioForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    email: '',
    telefono: '',
    direccion: ''
  });

  const [errors, setErrors] = useState({});

  // Cargar datos del propietario si estamos editando
  useEffect(() => {
    if (isEditMode) {
      loadPropietario();
    }
  }, [id]);

  const loadPropietario = async () => {
    try {
      const response = await getPropietarioById(id);
      const propietario = response.data.data;
      setFormData({
        nombre: propietario.nombre || '',
        dni: propietario.dni || '',
        email: propietario.email || '',
        telefono: propietario.telefono || '',
        direccion: propietario.direccion || ''
      });
    } catch (err) {
      setError('Error al cargar los datos del propietario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (formData.telefono && !/^\d{9,15}$/.test(formData.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = 'El teléfono debe tener entre 9 y 15 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Limpiar campos vacíos
      const dataToSubmit = Object.entries(formData).reduce((acc, [key, value]) => {
        if (value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {});

      if (isEditMode) {
        await updatePropietario(id, dataToSubmit);
      } else {
        await createPropietario(dataToSubmit);
      }

      navigate('/propietarios');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar el propietario');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
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
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Editar Propietario' : 'Nuevo Propietario'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditMode ? 'Modifica los datos del propietario' : 'Completa el formulario para añadir un nuevo propietario'}
          </p>
        </div>

        {/* Error general */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.nombre ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: Juan Pérez García"
            />
            {errors.nombre && (
              <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
            )}
          </div>

          {/* DNI */}
          <div>
            <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-2">
              DNI / NIE
            </label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.dni ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: 12345678A"
              maxLength={9}
            />
            {errors.dni && (
              <p className="mt-1 text-sm text-red-600">{errors.dni}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: juan.perez@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.telefono ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: 612345678"
            />
            {errors.telefono && (
              <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>
            )}
          </div>

          {/* Dirección */}
          <div>
            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">
              Dirección
            </label>
            <textarea
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.direccion ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: Calle Mayor, 123, 28001 Madrid"
            />
            {errors.direccion && (
              <p className="mt-1 text-sm text-red-600">{errors.direccion}</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/propietarios')}
              className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
              disabled={submitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitting}
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </span>
              ) : (
                isEditMode ? 'Actualizar' : 'Crear Propietario'
              )}
            </button>
          </div>
        </form>

        {/* Nota */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex">
            <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-medium">Campos obligatorios</p>
              <p className="mt-1">Los campos marcados con <span className="text-red-500">*</span> son obligatorios.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropietarioForm;
