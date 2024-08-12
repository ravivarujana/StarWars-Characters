import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchApiData } from "../../utils/fetchData";
import { CHARACTERS_URL } from "../../utils/constants";

// Async thunk to fetch all people data from the API
export const fetchAllPeople = createAsyncThunk(
  "characterData/fetchAllPeople",
  async (_, { rejectWithValue }) => {
    try {
      const { allData, totalCount } = await fetchApiData(CHARACTERS_URL);
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
