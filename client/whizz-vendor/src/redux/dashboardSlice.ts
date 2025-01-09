import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  { fetchDashboardCountsApi }  from "../app/API/dashboard";

// Define the state structure
interface DashboardState {
  todayOrders: number;
  revenue: number;
  activeMenuItems: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: DashboardState = {
  todayOrders: 0,
  revenue: 0,
  activeMenuItems: 0,
  status: "idle",
  error: null,
};

// Async thunk to fetch mock dashboard data
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async () => {
    // Simulating a delay to mimic an API call
    try {
      const dashboardData = await fetchDashboardCountsApi();

      if (dashboardData) {
        return dashboardData;
      }
    } catch (error) {
      console.log(error);
    };
  }
);

// Slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.todayOrders = action.payload.todayOrders;
        state.revenue = action.payload.revenue;
        state.activeMenuItems = action.payload.activeMenuItems;
        state.status = "succeeded";
      })
      .addCase(fetchDashboardData.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to load dashboard data";
      });
  },
});

export default dashboardSlice.reducer;
