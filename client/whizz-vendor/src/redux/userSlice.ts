import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Vendor {
  name: string;
  address: string;
  phone: string;
  area: "Nungambakkam" | "Anna Nagar" | "";
  type: "Veg" | "Non-Veg" | "Multicuisine" | "Cafe" | "";
  daysAvailability: string[];
  logo: string;
  opensAt: string;
  closesAt: string;
}

interface UserState {
  user: Vendor;
}

const initialState: UserState = {
  user: {
    name: "My Restaurant",
    address: "123 Main St",
    phone: "555-555-5555",
    area: "Nungambakkam",
    type: "Veg",
    daysAvailability: ["Monday", "Tuesday", "Wednesday"],
    logo: "https://images.unsplash.com/photo-1612222869049-d8ec83637a3c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D",
    opensAt: "10:00 AM",
    closesAt: "10:00 PM",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Vendor>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<Vendor>>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
