import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface ProductQuery {
  value: string;
}

// Define the initial state using that type
const initialState: ProductQuery = {
  value: "/api/products",
};

export const productQuerySlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
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

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.value;

export default productQuerySlice.reducer;
