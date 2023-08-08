import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { OrderItems } from "@/components/Cart/types";

interface OrderDetails {
  value: {
    items: OrderItems;
    grandTotal: number;
    subTotal: number;
  } | null;
}

const initialState: OrderDetails = {
  value: null,
};

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    updateOrder: (
      state,
      action: PayloadAction<{
        items: OrderItems;
        grandTotal: number;
        subTotal: number;
      } | null>
    ) => {
      state.value = action.payload;
    },
    resetOrderDetails: (state) => {
      state.value = null;
    },
  },
});

export const { updateOrder, resetOrderDetails } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
