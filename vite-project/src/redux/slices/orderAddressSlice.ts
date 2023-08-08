import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Address = {
  fullname: string;
  mobile_number: string;
  zip_code: string;
  street_address: string;
  city: string;
  state: string;
  id: number;
};

interface OrderAddress {
  value: Address | null;
}

const initialState: OrderAddress = {
  value: null,
};

export const orderDetailsSlice = createSlice({
  name: "orderAddress",
  initialState,
  reducers: {
    updateAddress: (state, action: PayloadAction<Address | null>) => {
      state.value = action.payload;
    },
    resetOrderAddress: (state) => {
      state.value = null;
    },
  },
});

export const { updateAddress, resetOrderAddress } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
