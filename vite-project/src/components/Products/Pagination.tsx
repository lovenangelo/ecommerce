import React, { useState } from "react";
import PaginationButton from "./PaginationButton";

interface PaginationProps {
  pages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pages,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const numberedButtons = pageNumbers.map((number) => (
    <li>
      <PaginationButton display={number} />
    </li>
  ));

  return (
    <ul className="flex space-x-2 w-full justify-center items-center mt-4">
      <li>
        <PaginationButton display={"Prev"} />
      </li>
      {numberedButtons}
      <li>
        <PaginationButton display={"Next"} />
      </li>
    </ul>
  );
};

export default Pagination;
