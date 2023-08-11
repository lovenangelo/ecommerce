import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProductQuery {
  value: string;
}

const initialState: ProductQuery = {
  value: "/api/my-products",
};

export const myProductQuerySlice = createSlice({
  name: "productQuery",
  initialState,
  reducers: {
    changeMyProductsQuery: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    resetMyProductsQuery: (state) => {
      state.value = "/api/my-products";
    },
  },
});

export const { changeMyProductsQuery, resetMyProductsQuery } =
  myProductQuerySlice.actions;

export default myProductQuerySlice.reducer;
