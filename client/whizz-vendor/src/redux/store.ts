import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./orderSlice";
import menuReducer from './menuSlice';
import dashboardReducer from './dashboardSlice'; 
import userReducer from './vendorSlice';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    menu: menuReducer,
    dashboard: dashboardReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
