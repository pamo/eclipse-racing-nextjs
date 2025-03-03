'use client';

import { PushButton } from '../PushButton';

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
    <div className="mt-4 flex items-center justify-center space-x-2">
      <PushButton
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="bg-white hover:bg-gray-50"
        aria-label="First page"
      >
        &laquo;
      </PushButton>

      <PushButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-white hover:bg-gray-50"
        aria-label="Previous page"
      >
        &lsaquo;
      </PushButton>

      {getPageNumbers().map((pageNumber) => (
        <PushButton
          key={pageNumber}
          onClick={() => pageNumber !== currentPage && onPageChange(pageNumber)}
          className={`${
            pageNumber === currentPage
              ? 'bg-eclipse-green hover:bg-eclipse-green-light'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          {pageNumber}
        </PushButton>
      ))}

      <PushButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-white hover:bg-gray-50"
        aria-label="Next page"
      >
        &rsaquo;
      </PushButton>

      <PushButton
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="bg-white hover:bg-gray-50"
        aria-label="Last page"
      >
        &raquo;
      </PushButton>
    </div>
  );
}
