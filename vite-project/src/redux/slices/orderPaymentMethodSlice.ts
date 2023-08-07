import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface OrderPaymentMethod {
  value: "cod" | "card";
}

const initialState: OrderPaymentMethod = {
  value: "card",
};

export const orderPaymentSlice = createSlice({
  name: "orderPayment",
  initialState,
  reducers: {
    updatePaymentMethod: (state, action: PayloadAction<"cod" | "card">) => {
      state.value = action.payload;
    },
  },
});

export const { updatePaymentMethod } = orderPaymentSlice.actions;

export const selectCount = (state: RootState) => state.user.value;

export default orderPaymentSlice.reducer;
