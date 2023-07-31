import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface OrderPaymentMethod {
  value: "cod" | "card";
}

const initialState: OrderPaymentMethod = {
  value: "card",
};

export const orderDetailsSlice = createSlice({
  name: "productQuery",
  initialState,
  reducers: {
    updatePaymentMethod: (state, action: PayloadAction<"cod" | "card">) => {
      state.value = action.payload;
    },
  },
});

export const { updatePaymentMethod } = orderDetailsSlice.actions;

export const selectCount = (state: RootState) => state.user.value;

export default orderDetailsSlice.reducer;
