import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMenuApi } from "../app/API/menu";

// Define the updated MenuItem interface
interface MenuItem {
  _id: string;
  image: string;
  dishName: string;
  description?: string; // New field
  price: number;
  category: string;
  subcategory: string;
  startTime?: string; // New field
  endTime?: string; // New field
  availableDays?: string[]; // New field
  isAvailable: boolean;
}

interface MenuState {
  items: MenuItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: MenuState = {
  items: [],
  status: "idle",
};

// Async thunk to fetch menu items
export const fetchMenuItems = createAsyncThunk("menu/fetchMenuItems", async () => {
  const response = await fetchMenuApi();
  return response.dishes;
});

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addMenuItem(state, action: PayloadAction<MenuItem>) {
      state.items.unshift(action.payload);
    },
    toggleAvailability(state, action: PayloadAction<{ id: string; isAvailable: boolean }>) {
      const { id, isAvailable } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        item.isAvailable = isAvailable;
      }
    },
    changeCategory(state, action: PayloadAction<{ id: string; category: string }>) {
      const { id, category } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        item.category = category;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenuItems.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchMenuItems.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addMenuItem, toggleAvailability, changeCategory } = menuSlice.actions;
export default menuSlice.reducer;
