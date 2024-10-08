import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import PersonCard from "./PersonCard";
import Header from "./Header";
import { fetchAllPeople } from "../store/slices/characterDataSlice";
import Shimmer from "./Shimmer";
import DropDownComponent from "./DropDownComponent";
import NoResultFound from "./NoResultFound";
import { DROPDOWN_CONSTANTS, OFFSET } from "../utils/constants";
import { fetchAllSpecies } from "../store/slices/speciesSlice";
import { fetchAllPlanets } from "../store/slices/planetSlice";
import { fetchAllFilms } from "../store/slices/filmsSlice";
import { createdDropDownList } from "../utils/dropDownList";

// Main component for the Home page
const Home = () => {
  // State for search functionality
  const [searchState, setSearchState] = useState({
    searchText: "",
    lastSearchText: "",
  });

  // State for filter functionality
  const [selectedFilters, setSelectedFilters] = useState({
    homeworld: null,
    species: null,
    films: null,
  });

  const dispatch = useDispatch();

  // Fetch all characters on component mount
  useEffect(() => {
    dispatch(fetchAllPeople());
  }, [dispatch]);

  // Select character data and loading state from Redux store
  const { data: characters, isLoading } = useSelector(
    (store) => store.characterData
  );
  const pageNumber = useSelector((store) => store.pagination.pageNumber);

  // Handler for search button click
  const handleSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      lastSearchText: prev.searchText,
    }));
  };

  // Handler for clearing all filters and search
  const handleClearFilter = () => {
    setSearchState({ searchText: "", lastSearchText: "" });
    setSelectedFilters({ homeworld: null, species: null, films: null });
  };

  // Handler for changing individual filters
  const handleFilterChange = (type, selectedOption) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: selectedOption ? selectedOption.value : null,
    }));
  };

  // Memoized filtered data based on search and filter criteria
  const filteredData = useMemo(() => {
    return characters.filter((char) => {
      const matchesSearch = searchState.lastSearchText
        ? char.name
            .toLowerCase()
            .includes(searchState.lastSearchText.toLowerCase())
        : true;

      const matchesHomeworld = selectedFilters.homeworld
        ? char.homeworld === selectedFilters.homeworld
        : true;

      const matchesSpecies = selectedFilters.species
        ? char.species.includes(selectedFilters.species)
        : true;

      const matchesFilms = selectedFilters.films
        ? char.films.includes(selectedFilters.films)
        : true;

      return (
        matchesSearch && matchesHomeworld && matchesSpecies && matchesFilms
      );
    });
  }, [characters, searchState.lastSearchText, selectedFilters]);

  // Memoized paginated data based on current page number
  const paginatedData = useMemo(() => {
    const startIndex = (pageNumber - 1) * OFFSET;
    return filteredData.slice(startIndex, startIndex + OFFSET);
  }, [filteredData, pageNumber]);

  // Select species, films, and homeworld data from Redux store
  const species = useSelector((store) => store.species);
  const films = useSelector((store) => store.films);
  const homeworld = useSelector((store) => store.planets);

  // Create dropdown lists for filters
  const speciesDropDownList = species.data
    ? createdDropDownList(species.data)
    : [];
  const filmsDropDownList = films.data ? createdDropDownList(films.data) : [];
  const homeworldDropDownList = homeworld.data
    ? createdDropDownList(homeworld.data)
    : [];

  const dropdownOptions = {
    homeworld: homeworldDropDownList,
    species: speciesDropDownList,
    films: filmsDropDownList,
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Main content container */}
      <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-between pt-16 pb-16 mb-6">
        {/* Search and Filter Container */}
        <div className="flex flex-col mb-6 md:mb-0">
          <div className="flex flex-col sm:flex-row items-center">
            <input
              value={searchState.searchText}
              className="py-2 px-6 mb-4 sm:mb-0 sm:mr-4 rounded-3xl w-[20rem] border-2 border-black"
              placeholder="Search Character"
              onChange={(e) =>
                setSearchState((prev) => ({
                  ...prev,
                  searchText: e.target.value,
                }))
              }
            />
            <button
              className="py-2 px-6 rounded-3xl bg-black text-white"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Display active search filter */}
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
        <div className="flex flex-col md:flex-row items-center gap-2 justify-center">
          <h1 className="font-semibold px-4 text-center md:text-left">
            Advance Filters
          </h1>
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Dropdown components for advanced filtering */}
            <DropDownComponent
              options={dropdownOptions.homeworld}
              placeholder={DROPDOWN_CONSTANTS.HOMETOWN}
              onChange={(option) => handleFilterChange("homeworld", option)}
              dispatchAction={() => fetchAllPlanets()}
            />
            <DropDownComponent
              options={dropdownOptions.species}
              placeholder={DROPDOWN_CONSTANTS.SPECIES}
              onChange={(option) => handleFilterChange("species", option)}
              dispatchAction={() => fetchAllSpecies()}
            />
            <DropDownComponent
              options={dropdownOptions.films}
              placeholder={DROPDOWN_CONSTANTS.FILMS}
              onChange={(option) => handleFilterChange("films", option)}
              dispatchAction={() => fetchAllFilms()}
            />
          </div>
        </div>
      </div>

      {/* Character grid and pagination */}
      <div>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pb-12 gap-6 sm:gap-8 md:gap-10 group mx-6">
            {/* Display shimmer effect while loading, otherwise show character cards */}
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <Shimmer key={index} />
                ))
              : paginatedData.map((char, index) => (
                  <div key={index} className="p-2 hover:bg-gray-500 rounded-md">
                    <PersonCard
                      name={char.name}
                      key={char.name}
                      index={index}
                    />
                  </div>
                ))}
          </div>
        </div>
        {/* Show "No Results Found" or Pagination based on search results */}
        {searchState.lastSearchText && paginatedData.length === 0 ? (
          <NoResultFound />
        ) : (
          <Pagination totalCharacters={filteredData.length} />
        )}
      </div>
    </div>
  );
};

export default Home;
