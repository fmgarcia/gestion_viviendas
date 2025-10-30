import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ViviendasList from './pages/ViviendasList';
import ViviendaDetail from './pages/ViviendaDetail';
import ViviendaForm from './pages/ViviendaForm';
import PropietariosList from './pages/PropietariosList';
import PropietarioDetail from './pages/PropietarioDetail';
import PropietarioForm from './pages/PropietarioForm';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Rutas de Viviendas */}
          <Route path="/" element={<ViviendasList />} />
          <Route path="/vivienda/nuevo" element={<ViviendaForm />} />
          <Route path="/vivienda/:id" element={<ViviendaDetail />} />
          <Route path="/vivienda/:id/editar" element={<ViviendaForm />} />
          
          {/* Rutas de Propietarios */}
          <Route path="/propietarios" element={<PropietariosList />} />
          <Route path="/propietarios/nuevo" element={<PropietarioForm />} />
          <Route path="/propietarios/:id" element={<PropietarioDetail />} />
          <Route path="/propietarios/:id/editar" element={<PropietarioForm />} />
          
          {/* Ruta 404 */}
          <Route path="*" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-4">Página no encontrada</p>
                <a href="/" className="btn-primary">
                  Volver al inicio
                </a>
              </div>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
