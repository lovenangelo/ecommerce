import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

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

export const selectCount = (state: RootState) => state.user.value;

export default productQuerySlice.reducer;
