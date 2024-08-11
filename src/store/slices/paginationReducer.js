import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    pageNumber: 1,
  },
  reducers: {
    handlePagination: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
});

export const { handlePagination } = paginationSlice.actions;
export default paginationSlice.reducer;
