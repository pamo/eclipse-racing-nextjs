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

const buttonStyles =
  'relative px-4 py-1 text-black font-bold text-lg rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-shadow disabled:opacity-50 disabled:cursor-not-allowed';
return (
  <div className="mt-4 flex items-center justify-center space-x-2">
    <button
      onClick={() => onPageChange(1)}
      disabled={currentPage === 1}
      className={`${buttonStyles} hover:bg-gray-50`}
      aria-label="First page"
    >
      &laquo;
    </button>

    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`${buttonStyles} hover:bg-gray-50`}
      // className="rounded border bg-white px-3 py-1 text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Previous page"
    >
      &lsaquo;
    </button>

    {getPageNumbers().map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => pageNumber !== currentPage && onPageChange(pageNumber)}
        className={`${buttonStyles} ${
          pageNumber === currentPage
            ? 'bg-eclipse-green hover:bg-eclipse-green-light'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        {pageNumber}
      </button>
    ))}

    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`${buttonStyles} hover:bg-gray-50`}
      aria-label="Next page"
    >
      &rsaquo;
    </button>

    <button
      onClick={() => onPageChange(totalPages)}
      disabled={currentPage === totalPages}
      className={`${buttonStyles} hover:bg-gray-50`}
      aria-label="Last page"
    >
      &raquo;
    </button>
  </div>
);
}
