'use client';
import React from 'react';
import Link from 'next/link';

const Pagination = ({ currentPage, totalPages }) => {
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Current page and siblings
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }

    // Always show last page if there is more than one page
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    // Add ellipsis where needed
    return pages.reduce((result, page, index, array) => {
      // Add the page
      result.push(page);

      // Check if we need to add ellipsis
      if (index < array.length - 1 && array[index + 1] - page > 1) {
        result.push('...');
      }

      return result;
    }, []);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="flex space-x-1">
        {/* Previous Page Button */}
        <button
          onClick={() => currentPage > 1 && (window.location.href = `/news?page=${currentPage - 1}`)}
          className={`px-4 py-2 rounded-md ${currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white hover:bg-gray-100 text-gray-700'
            } border border-gray-200 flex items-center`}
          disabled={currentPage === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only sm:not-sr-only sm:ml-1">Previous</span>
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) =>
          page === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className="px-4 py-2 text-gray-500 flex items-center justify-center"
            >
              ...
            </span>
          ) : (
            <Link
              key={`page-${page}`}
              href={`/news?page=${page}`}
              className={`px-4 py-2 rounded-md ${currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white hover:bg-gray-100 text-gray-700'
                } border border-gray-200`}
            >
              {page}
            </Link>
          )
        )}

        {/* Next Page Button */}
        <Link
          href={currentPage < totalPages ? `/news?page=${currentPage + 1}` : '#'}
          className={`px-4 py-2 rounded-md ${currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white hover:bg-gray-100 text-gray-700'
            } border border-gray-200 flex items-center`}
          aria-disabled={currentPage === totalPages}
          onClick={e => currentPage === totalPages && e.preventDefault()}
        >
          <span className="sr-only sm:not-sr-only sm:mr-1">Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Pagination;