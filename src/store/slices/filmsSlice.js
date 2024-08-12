import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApiData } from "../../utils/fetchData";
import { FILMS_URL } from "../../utils/constants";

export const fetchAllFilms = createAsyncThunk(
  "films/fetchAllFilms",
  async (_, { rejectWithValue }) => {
    try {
      const { allData, totalCount } = await fetchApiData(FILMS_URL);
      return { allData, totalCount };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const filmsSlice = createSlice({
  name: "films",
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
      .addCase(fetchAllFilms.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllFilms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload.allData;
        state.totalCount = action.payload.totalCount;
        state.currentCount = action.payload.totalCount;
      })
      .addCase(fetchAllFilms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export default filmsSlice.reducer;
