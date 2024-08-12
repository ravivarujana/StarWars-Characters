import React from "react";
import { OFFSET } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { handlePagination } from "../store/slices/paginationReducer";

// Pagination component for displaying page numbers and handling pagination
const Pagination = ({ totalCharacters, setPageNumber }) => {
  // Calculate the total number of pages
  const value = Math.ceil(parseInt(totalCharacters) / OFFSET);
  const dispatch = useDispatch();
  // Get the current page number from Redux store
  const pageNumber = useSelector((store) => store.pagination);

  return (
    <div className="pb-12">
      <ul className="flex items-center justify-center">
        {/* Generate an array of page numbers and map over them */}
        {Array.from({ length: value }, (_, index) => index + 1).map((index) => (
          <button
            className="list-none border p-3 cursor-pointer text-white bg-black m-2"
            key={index}
            // Disable the button if it's the current page
            disabled={pageNumber === index ? true : false}
            // Dispatch the handlePagination action when clicked
            onClick={() => dispatch(handlePagination(index))}
          >
            {index}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
