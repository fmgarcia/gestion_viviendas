import React from 'react';

/**
 * Componente de paginación
 */
const Pagination = ({ pagination, onPageChange }) => {
  const { page, totalPages, hasNextPage, hasPrevPage } = pagination;

  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Primera página
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="dots1" className="px-2">...</span>);
      }
    }

    // Páginas del rango
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 border rounded ${
            i === page
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-gray-300 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }

    // Última página
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="dots2" className="px-2">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 my-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevPage}
        className={`px-4 py-2 border rounded ${
          hasPrevPage
            ? 'border-gray-300 hover:bg-gray-100'
            : 'border-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Anterior
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
        className={`px-4 py-2 border rounded ${
          hasNextPage
            ? 'border-gray-300 hover:bg-gray-100'
            : 'border-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
