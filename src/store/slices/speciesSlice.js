import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApiData } from "../../utils/fetchData";

export const fetchAllSpecies = createAsyncThunk(
  "species/fetchAllSpecies",
  async (_, { rejectWithValue }) => {
    try {
      const { allData, totalCount } = await fetchApiData(
        "https://swapi.dev/api/species"
      );
      return { allData, totalCount };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const speciesSlice = createSlice({
  name: "species",
  initialState: {
    totalCount: 0,
    currentCount: 0,
    isError: false,
    isLoading: true,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSpecies.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllSpecies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload.allData;
        state.totalCount = action.payload.totalCount;
        state.currentCount = action.payload.totalCount;
      })
      .addCase(fetchAllSpecies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export default speciesSlice.reducer;
