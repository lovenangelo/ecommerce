import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
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
  name: "productQuery",
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
    resetOrder: (state) => {
      state.value = null;
    },
  },
});

export const { updateOrder, resetOrder } = orderDetailsSlice.actions;

export const selectCount = (state: RootState) => state.user.value;

export default orderDetailsSlice.reducer;
