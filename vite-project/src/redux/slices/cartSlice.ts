import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/components/Products/types/product-item";

type CartItem = { product: Product; quantity: number; id: string };

interface Cart {
  value: CartItem[] | [];
}

const initialState: Cart = {
  value: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addItem: (state, action: PayloadAction<ProductItem>) => {
    //   state.value = [...state.value, action.payload];
    // },
    removeItem: (state, action: PayloadAction<string>) => {
      if (state.value.length !== 0)
        state.value = state.value.filter(
          (value: CartItem) => value.id !== action.payload
        );
    },
    updateItems: (state, action: PayloadAction<CartItem[] | []>) => {
      state.value = action.payload;
    },
    resetCartItemList: (state) => {
      state.value = [];
    },
  },
});

export const { removeItem, updateItems, resetCartItemList } = cartSlice.actions;

export default cartSlice.reducer;
