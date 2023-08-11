import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SearchQuery {
  value: string | null;
}

const initialState: SearchQuery = {
  value: null,
};

export const myProductQuerySlice = createSlice({
  name: "productQuery",
  initialState,
  reducers: {
    changeSearchQuery: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    resetSearchQuery: (state) => {
      state.value = null;
    },
  },
});

export const { changeSearchQuery, resetSearchQuery } =
  myProductQuerySlice.actions;

export default myProductQuerySlice.reducer;
