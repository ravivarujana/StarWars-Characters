import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import PersonCard from "./PersonCard";
import Header from "./Header";
import { fetchAllPeople } from "../store/slices/characterDataSlice";
import Shimmer from "./Shimmer";
import Select from "react-select";
import DropDownComponent from "./DropDownComponent";

const Home = () => {
  const [searchState, setSearchState] = useState({
    searchText: "",
    lastSearchText: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPeople());
  }, [dispatch]);

  const { data, isLoading } = useSelector((store) => store.characterData);

  const pageNumber = useSelector((store) => store.pagination.pageNumber);

  const handleSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      lastSearchText: prevState.searchText,
    }));
  };

  const handleClearFilter = () => {
    setSearchState({ searchText: "", lastSearchText: "" });
  };

  const filteredData = useMemo(() => {
    if (!searchState.lastSearchText) return data;

    return data.filter((char) =>
      char.name.toLowerCase().includes(searchState.lastSearchText.toLowerCase())
    );
  }, [data, searchState.lastSearchText]);

  const paginatedData = useMemo(() => {
    const startIndex = (pageNumber - 1) * 10;
    return filteredData.slice(startIndex, startIndex + 10);
  }, [filteredData, pageNumber]);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  console.log(data);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Flex container to align both sections horizontally */}
      <div className="flex justify-between pt-32 pb-16 mb-6 px-12">
        {/* Search and Filter Container */}
        <div className="">
          <div className="">
            <input
              value={searchState.searchText}
              className="py-2 px-6 rounded-3xl w-[20rem] border-2 border-black"
              placeholder="Search Character"
              onChange={(e) =>
                setSearchState({ ...searchState, searchText: e.target.value })
              }
            />
            <button
              className="py-2 px-6 ml-4 rounded-3xl bg-black text-white"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {searchState.lastSearchText && (
            <div className="flex py-4">
              <div className="bg-gray-200 px-4 py-2 rounded-full flex items-center">
                <span>{searchState.lastSearchText}</span>
                <button
                  className="ml-2 text-red-500"
                  onClick={handleClearFilter}
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Advanced Filters Container */}
        <div className="flex items-center">
          <h1 className="font-semibold px-4">Advance Filters</h1>
          <div className="flex gap-2">
            <DropDownComponent options={options} />
            <Select className="w-38" options={options} placeholder="Species" />
            <Select className="w-38" options={options} placeholder="Films" />
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-center">
          <div className="grid grid-cols-5 pb-12 gap-12 group mx-6">
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <Shimmer key={index} />
                ))
              : paginatedData.map((char, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-500 rounded-md "
                  >
                    <PersonCard
                      name={char.name}
                      key={char.name}
                      index={index}
                    />
                  </div>
                ))}
          </div>
        </div>
        {paginatedData.length === 0 ? (
          <h1 className="text-center font-bold text-3xl">
            No Records Found !!
          </h1>
        ) : (
          <Pagination totalCharacters={filteredData.length} />
        )}
      </div>
    </div>
  );
};

export default Home;
