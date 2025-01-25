import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./orderSlice";
import menuReducer from './menuSlice';
import dashboardReducer from './dashboardSlice'; 
import vendorReducer from './vendorSlice';
import deliveredOrdersReducer from "./deliveredOrdersSlice";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    menu: menuReducer,
    dashboard: dashboardReducer,
    vendor: vendorReducer,
    deliveredOrders: deliveredOrdersReducer, // Include the reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
