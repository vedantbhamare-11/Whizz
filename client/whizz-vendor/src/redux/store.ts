import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./orderSlice";
import menuReducer from './menuSlice';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    menu: menuReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
