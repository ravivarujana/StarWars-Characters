import React from "react";
import { OFFSET } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { handlePagination } from "../store/slices/paginationReducer";

const Pagination = ({ totalCharacters, setPageNumber }) => {
  const value = Math.ceil(parseInt(totalCharacters) / OFFSET);
  const dispatch = useDispatch();
  const pageNumber = useSelector((store) => store.pagination);
  return (
    <div className="pb-12">
      <ul className="flex items-center justify-center">
        {Array.from({ length: value }, (_, index) => index + 1).map((index) => (
          <button
            className="list-none border p-3 cursor-pointer text-white bg-black m-2"
            key={index}
            disabled={pageNumber === index ? true : false}
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
