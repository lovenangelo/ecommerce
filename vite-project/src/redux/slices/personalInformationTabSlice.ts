import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Tab = "PERSONAL-INFORMATION" | "MY-ORDERS" | "MY-WISHLIST" | "MY-PRODUCTS";

interface OrderAddress {
  value: Tab;
}

const initialState: OrderAddress = {
  value: "PERSONAL-INFORMATION",
};
export const personalInformationTabSlice = createSlice({
  name: "pit-slice",
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<Tab>) => {
      state.value = action.payload;
    },
  },
});

export const { changeTab } = personalInformationTabSlice.actions;

export default personalInformationTabSlice.reducer;
