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
};

interface subcategory {
  subcategory: string;
}

interface MenuState {
  items: MenuItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  subcategories: subcategory[]
}

const initialState: MenuState = {
  items: [],
  status: "idle",
  subcategories: []
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
    setSubcategories(state, action: PayloadAction<subcategory[]>) {
      state.subcategories = action.payload;
    },
    changeSubcategory(state, action: PayloadAction<{ id: string; subcategory: string }>) {
      const { id, subcategory } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        item.subcategory = subcategory;
      }
    },
    addNewSubcategory(state, action: PayloadAction<string>) {
      state.subcategories.push({ subcategory: action.payload });
    },
    updateMenuItem(state, action: PayloadAction<MenuItem>) {
      const item = state.items.find((item) => item._id === action.payload._id);
      if (item) {
        item.image = action.payload.image;
        item.dishName = action.payload.dishName;
        item.description = action.payload.description;
        item.price = action.payload.price;
        item.category = action.payload.category;
        item.subcategory = action.payload.subcategory;
        item.startTime = action.payload.startTime;
        item.endTime = action.payload.endTime;
        item.availableDays = action.payload.availableDays;
        item.isAvailable = action.payload.isAvailable
      }
      state.status = "idle";
    },
    deleteMenuItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    setStatus(state, action: PayloadAction<"idle" | "loading" | "succeeded" | "failed">) {
      state.status = action.payload;
    }
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

export const { addMenuItem, updateMenuItem, toggleAvailability, changeCategory, changeSubcategory, setSubcategories, addNewSubcategory, deleteMenuItem, setStatus } = menuSlice.actions;
export default menuSlice.reducer;
