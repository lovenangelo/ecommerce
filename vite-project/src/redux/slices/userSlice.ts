import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  remember_me: boolean;
} | null;

// Define a type for the slice state
interface UserState {
  value: User;
}

// Define the initial state using that type
const initialState: UserState = {
  value: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
    removeUser: (state) => {
      state.value = null;
    },
    updateAvatar: (state, action: PayloadAction<string>) => {
      console.log(action.payload);

      if (state.value) state.value.avatar = action.payload;
    },
  },
});

export const { setUser, removeUser, updateAvatar } = userSlice.actions;

export default userSlice.reducer;
