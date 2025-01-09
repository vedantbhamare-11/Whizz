import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice";
import agentReducer from "./agentSlice";
import dashboardReducer from "./dashboardSlice";
import vendorReducer from "./vendorSlice";
import deliveryReducer from "./deliverySlice";

// Configure the store
const store = configureStore({
  reducer: {
    orders: orderReducer,
    agents: agentReducer,
    dashboard: dashboardReducer,
    vendors: vendorReducer,
    delivery: deliveryReducer,

  },
});

// Define RootState type (represents the entire state structure)
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type (useful for type-safe dispatch)
export type AppDispatch = typeof store.dispatch;

export default store;
