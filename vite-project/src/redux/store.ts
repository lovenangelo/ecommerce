import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productQueryReducer from "./slices/productQuerySlice";
import orderDetailsReducer from "./slices/orderDetailsSlice";
import orderAddressReducer from "./slices/orderAddressSlice";
import orderPaymentMethodReducer from "./slices/orderPaymentMethodSlice";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import sessionStorage from "redux-persist/es/storage/session";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["user", "orderDetails"],
};

const rootReducer = combineReducers({
  user: userReducer,
  productQuery: productQueryReducer,
  orderDetails: orderDetailsReducer,
  orderAddress: orderAddressReducer,
  orderPaymentMethodReducer: orderPaymentMethodReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
