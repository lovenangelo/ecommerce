import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

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
  name: "productQuery",
  initialState,
  reducers: {
    updateAddress: (state, action: PayloadAction<Address | null>) => {
      state.value = action.payload;
    },
  },
});

export const { updateAddress } = orderDetailsSlice.actions;

export const selectCount = (state: RootState) => state.user.value;

export default orderDetailsSlice.reducer;
