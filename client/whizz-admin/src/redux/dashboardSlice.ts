import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  totalVendors: number;
  deliveryPersonnel: number;
  totalCustomers: number;
  activeOrders: number;
}

const initialState: DashboardState = {
    totalVendors: 0,
    deliveryPersonnel: 0,
    totalCustomers: 0,
    activeOrders: 0,
  };
  

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardData(state, action: PayloadAction<DashboardState>) {
      state.totalVendors = action.payload.totalVendors;
      state.deliveryPersonnel = action.payload.deliveryPersonnel;
      state.totalCustomers = action.payload.totalCustomers;
      state.activeOrders = action.payload.activeOrders;
    },
    resetDashboardData(state) {
      state.totalVendors = 0;
      state.deliveryPersonnel = 0;
      state.totalCustomers = 0;
      state.activeOrders = 0;
    },
  },
});

export const { setDashboardData, resetDashboardData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
