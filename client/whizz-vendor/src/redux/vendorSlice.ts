import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Vendor {
  _id: string;
  vendorEmail: string;
  vendorName: string;
  address: string;
  vendorPhone: string;
  area: "Nungambakkam" | "Anna Nagar" | "";
  restaurantType: "VEG" | "NON-VEG" | "MC" | "Cafe" | "";
  availableDays: string[];
  vendorLogo: string;
  startTime: string;
  endTime: string;
  gst: string;
  isOpen: boolean;
  latitude: number;
  longitude: number;
}

interface UserState {
  user: Vendor;
}

const initialState: UserState = {
  user: { 
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
    latitude: 0,
    longitude: 0
   },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setVendor: (state, action: PayloadAction<Vendor>) => {
      state.user = action.payload;
    },
    updateVendor: (state, action: PayloadAction<Partial<Vendor>>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setVendor, updateVendor } = userSlice.actions;
export default userSlice.reducer;
