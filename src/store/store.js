import { configureStore } from "@reduxjs/toolkit";
import characterDataReducer from "./slices/characterDataSlice";
import paginationReducer from "./slices/paginationReducer";
import planetsReducer from "./slices/planetSlice";
import speciesReducer from "./slices/speciesSlice";
import filmsReducer from "./slices/filmsSlice";

const store = configureStore({
  reducer: {
    characterData: characterDataReducer,
    pagination: paginationReducer,
    planets: planetsReducer,
    species: speciesReducer,
    films: filmsReducer,
  },
});

export default store;
