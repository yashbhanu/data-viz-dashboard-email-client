import React from 'react';

const Pagination = ({ currentPage, totalCount, limit, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / limit);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 text-sm font-medium rounded-md ${
          currentPage === 1 ? 'text-borderColor' : 'text-textColor hover:bg-borderColor'
        }`}
      >
        {`< Previous`}
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 text-sm font-medium rounded-md ${
            page === currentPage
              ? 'bg-accent text-white'
              : 'text-gray-700 hover:bg-borderColor'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 text-sm font-medium rounded-md ${
          currentPage === totalPages ? 'text-borderColor' : 'text-textColor hover:bg-borderColor'
        }`}
      >
        {`Next >`}
      </button>
    </div>
  );
};

export default Pagination;
