'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisiblePages);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="First page"
      >
        &laquo;
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        &lsaquo;
      </button>

      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => pageNumber !== currentPage && onPageChange(pageNumber)}
          className={`px-3 py-1 rounded border ${
            pageNumber === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        &rsaquo;
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Last page"
      >
        &raquo;
      </button>
    </div>
  );
}
