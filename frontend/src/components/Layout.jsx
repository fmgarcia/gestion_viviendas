import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra de navegación */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-xl font-bold text-gray-900">Gestión Inmobiliaria</span>
              </Link>

              <div className="hidden md:flex space-x-4">
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/') && !location.pathname.includes('/propietarios')
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Viviendas
                </Link>
                <Link
                  to="/propietarios"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/propietarios')
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Propietarios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
