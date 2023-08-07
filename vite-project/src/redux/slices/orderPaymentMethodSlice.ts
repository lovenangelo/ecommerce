import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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

export default orderPaymentSlice.reducer;
