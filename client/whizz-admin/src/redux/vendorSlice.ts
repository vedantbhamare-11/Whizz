import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Vendor {
  _id: string;
  logo: string;
  vendorName: string;
  area: string;
  restaurantType: string;
  dishes: number;
  isOpen: boolean;
}

interface VendorState {
  vendors: Vendor[];
}

const initialState: VendorState = {
  vendors: [],
};

const vendorSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    setVendor(state, action: PayloadAction<Vendor[]>) {
      state.vendors = action.payload;
    },
    updateVendorOpen(state, action: PayloadAction<{
      vendorId: string,
      isOpen: boolean
    }>) {
      const { vendorId, isOpen } = action.payload;
      const vendor = state.vendors.find((vendor) => vendor._id === vendorId);
      if (vendor){
        vendor.isOpen = isOpen;
      }
    },
    updateVendorCategory(state, action: PayloadAction<{
      vendorId: string,
      category: string,
    }>) {
      const { vendorId, category } = action.payload;
      const vendor = state.vendors.find((vendor) => vendor._id === vendorId);
      if (vendor){
        vendor.restaurantType = category;
      }
    },
    addVendor(state, action: PayloadAction<Vendor>) {
      state.vendors.push(action.payload);
    },
    deleteVendor(state, action: PayloadAction<string>) {
      state.vendors = state.vendors.filter(
        (vendor) => vendor._id !== action.payload
      );
    },
  },
});

export const { setVendor, updateVendorOpen, addVendor, deleteVendor, updateVendorCategory } = vendorSlice.actions;
export default vendorSlice.reducer;
