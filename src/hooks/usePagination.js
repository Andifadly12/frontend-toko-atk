import { useState } from "react";

const usePagination = (data = [], itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = data.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage(prev => {
      if (prev >= totalPages) return prev;
      return prev + 1;
    });
  };

  const prevPage = () => {
    setCurrentPage(prev => {
      if (prev <= 1) return prev;
      return prev - 1;
    });
  };

  const goToPage = page => {
    if (page < 1) return;
    if (page > totalPages) return;

    setCurrentPage(page);
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    totalItems,
    paginatedData,
    nextPage,
    prevPage,
    goToPage,
    resetPage,
  };
};

export default usePagination;
