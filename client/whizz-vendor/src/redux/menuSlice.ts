import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface MenuItem {
  id: number;
  image: string;
  name: string;
  price: number;
  category: string;
  subCategory: string;
  available: boolean;
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
  // Replace this mock data with an actual API call
  const response = await new Promise<MenuItem[]>((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "Paneer Butter Masala",
          price: 250,
          category: "Veg",
          subCategory: "Main Course",
          available: true,
        },
        {
          id: 2,
          image: "https://plus.unsplash.com/premium_photo-1726862849231-a967a16fa8f1?q=80&w=2701&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "Chicken Biryani",
          price: 300,
          category: "Non-Veg",
          subCategory: "Rice",
          available: false,
        },
      ]);
    }, 1000)
  );
  return response;
});

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addMenuItem(state, action: PayloadAction<MenuItem>) {
      state.items.push(action.payload);
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

export const { addMenuItem } = menuSlice.actions;
export default menuSlice.reducer;
