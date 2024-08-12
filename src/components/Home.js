import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import PersonCard from "./PersonCard";
import Header from "./Header";
import { fetchAllPeople } from "../store/slices/characterDataSlice";
import Shimmer from "./Shimmer";
import DropDownComponent from "./DropDownComponent";
import NoResultFound from "./NoResultFound";
import { DROPDOWN_CONSTANTS } from "../utils/constants";
import { fetchAllSpecies } from "../store/slices/speciesSlice";
import { fetchAllPlanets } from "../store/slices/planetSlice";
import { fetchAllFilms } from "../store/slices/filmsSlice";

const Home = () => {
  const [searchState, setSearchState] = useState({
    searchText: "",
    lastSearchText: "",
  });

  const [selectedFilters, setSelectedFilters] = useState({
    homeworld: null,
    species: null,
    films: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPeople());
  }, [dispatch]);

  const { data, isLoading } = useSelector((store) => store.characterData);
  const pageNumber = useSelector((store) => store.pagination.pageNumber);

  const handleSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      lastSearchText: prev.searchText,
    }));
  };

  const handleClearFilter = () => {
    setSearchState({ searchText: "", lastSearchText: "" });
    setSelectedFilters({ homeworld: null, species: null, films: null });
  };

  const handleFilterChange = (type, selectedOption) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: selectedOption ? selectedOption.value : null,
    }));
  };

  const filteredData = useMemo(() => {
    return data.filter((char) => {
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
  }, [data, searchState.lastSearchText, selectedFilters]);

  const paginatedData = useMemo(() => {
    const startIndex = (pageNumber - 1) * 10;
    return filteredData.slice(startIndex, startIndex + 10);
  }, [filteredData, pageNumber]);

  const dropdownOptions = {
    homeworld: [
      { value: "https://swapi.dev/api/planets/1/", label: "Tatooine" },
      { value: "https://swapi.dev/api/planets/2/", label: "Alderaan" },
    ],
    species: [
      { value: "https://swapi.dev/api/species/1/", label: "Human" },
      { value: "https://swapi.dev/api/species/2/", label: "Droid" },
    ],
    films: [
      { value: "https://swapi.dev/api/films/1/", label: "A New Hope" },
      {
        value: "https://swapi.dev/api/films/2/",
        label: "The Empire Strikes Back",
      },
    ],
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
