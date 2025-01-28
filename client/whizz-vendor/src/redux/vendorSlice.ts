import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Vendor {
  _id: string;
  vendorEmail: string;
  vendorName: string;
  address: string;
  vendorPhone: string;
  area: "Nungambakkam" | "Anna Nagar" | "";
  restaurantType: "VEG" | "NON-VEG" | "MC" | "CAFE" | "";
  availableDays: string[];
  vendorLogo: string;
  startTime: string;
  endTime: string;
  gst: string;
  isOpen: boolean;
  latitude: string;
  longitude: string;
}

interface vendorState {
  vendor: Vendor;
  isAuth: boolean;
}

const initialState: vendorState = {
  vendor: { 
    _id: "",
    vendorEmail: "",
    vendorName: "",
    address: "",
    vendorPhone: "",
    area: "",
    restaurantType: "",
    availableDays: [],
    vendorLogo: "",
    startTime: "",
    endTime: "",
    gst: "",
    isOpen: true,
    latitude: "",
    longitude: ""
   },
   isAuth: false
};

const userSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setVendor: (state, action: PayloadAction<Vendor>) => {
      state.vendor = action.payload;
      state.isAuth = true;
    },
    updateVendor: (state, action: PayloadAction<Partial<Vendor>>) => {
      state.vendor = { ...state.vendor, ...action.payload };
    },
    toggleOpening: (state, action: PayloadAction<boolean>) => {
      state.vendor.isOpen = action.payload; 
    }
  },
});

export const { setVendor, updateVendor, toggleOpening } = userSlice.actions;
export default userSlice.reducer;
