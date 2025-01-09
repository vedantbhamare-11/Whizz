import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Vendor {
  id: number;
  logo: string;
  name: string;
  location: string;
  category: string;
  dishes: number;
  status: boolean;
}

interface VendorState {
  vendors: Vendor[];
}

const initialState: VendorState = {
  vendors: [
    {
      id: 1,
      logo: "https://via.placeholder.com/40", // Replace with actual image URLs
      name: "Green Leaf",
      location: "Nungambakkam",
      category: "Veg",
      dishes: 25,
      status: true,
    },
    {
      id: 2,
      logo: "https://via.placeholder.com/40",
      name: "Spicy Grill",
      location: "Anna Nagar",
      category: "Non-Veg",
      dishes: 40,
      status: false,
    },
  ],
};

const vendorSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    updateVendor(state, action: PayloadAction<Vendor>) {
      const index = state.vendors.findIndex(
        (vendor) => vendor.id === action.payload.id
      );
      if (index !== -1) {
        state.vendors[index] = action.payload;
      }
    },
    addVendor(state, action: PayloadAction<Vendor>) {
      state.vendors.push(action.payload);
    },
    deleteVendor(state, action: PayloadAction<number>) {
      state.vendors = state.vendors.filter(
        (vendor) => vendor.id !== action.payload
      );
    },
  },
});

export const { updateVendor, addVendor, deleteVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
