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
    logo: "https://imgs.search.brave.com/YD6n1WJWcRgrmMG5o4RD7Yy9GxdhyfTtg-pNQ6ZrFUA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzMyLzIwLzAz/LzM2MF9GXzUzMjIw/MDM1NV9vZEtOOU91/M1dCNmlIV0pURklF/bEZ0SmJUdXpKc3BZ/Ni5qcGc",
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
