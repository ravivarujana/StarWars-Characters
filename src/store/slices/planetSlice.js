import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApiData } from "../../utils/fetchData";

export const fetchAllPlanets = createAsyncThunk(
  "planets/fetchAllPlanets",
  async (_, { rejectWithValue }) => {
    try {
      const { allData, totalCount } = await fetchApiData(
        "https://swapi.dev/api/planets"
      );
      return { allData, totalCount };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const planetsSlice = createSlice({
  name: "planets",
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
      .addCase(fetchAllPlanets.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllPlanets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload.allData;
        state.totalCount = action.payload.totalCount;
        state.currentCount = action.payload.totalCount;
      })
      .addCase(fetchAllPlanets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export default planetsSlice.reducer;
