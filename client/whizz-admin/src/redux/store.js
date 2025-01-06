import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice";
import agentReducer from "./agentSlice";

export const store = configureStore({
  reducer: {
    orders: orderReducer,
    agents: agentReducer,
  },
});
