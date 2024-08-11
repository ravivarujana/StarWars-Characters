import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch all people data from the API
export const fetchAllPeople = createAsyncThunk(
  "characterData/fetchAllPeople",
  async (_, { rejectWithValue }) => {
    let allData = [];
    let currentCount = 0;
    let totalCount = 0;
    let nextUrl = "https://swapi.dev/api/people";

    try {
      // Loop until there are no more pages (nextUrl becomes null)
      while (nextUrl) {
        // Fetch data from the current URL
        const response = await axios.get(nextUrl);

        const { count, next, results } = response.data;

        // Set totalCount only once from the first response
        if (totalCount === 0) {
          totalCount = count;
        }

        // Add the results to the accumulated data
        allData = [...allData, ...results];

        // Update the current count of fetched results
        currentCount += results.length;

        // Update nextUrl to fetch the next set of data
        nextUrl = next; // next is dynamically updated by the API response
      }

      return { allData, totalCount };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const characterDataSlice = createSlice({
  name: "characterData",
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
      .addCase(fetchAllPeople.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllPeople.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload.allData;
        state.totalCount = action.payload.totalCount;
        state.currentCount = action.payload.totalCount;
      })
      .addCase(fetchAllPeople.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export default characterDataSlice.reducer;
