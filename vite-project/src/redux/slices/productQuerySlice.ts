import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProductQuery {
  value: string;
}

const initialState: ProductQuery = {
  value: "/api/products",
};

export const productQuerySlice = createSlice({
  name: "productQuery",
  initialState,
  reducers: {
    changeQuery: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    resetQuery: (state) => {
      state.value = "/api/products";
    },
  },
});

export const { changeQuery, resetQuery } = productQuerySlice.actions;

export default productQuerySlice.reducer;
