import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeliveryPerson {
  id: number;
  photo: string;
  name: string;
  employeeId: string;
  region: string;
  ordersDelivered: number;
  status: string; // Can be "On delivery", "Active", or "Inactive"
}

interface DeliveryState {
  personnel: DeliveryPerson[];
}

const initialState: DeliveryState = {
  personnel: [
    {
      id: 1,
      photo: "https://via.placeholder.com/40",
      name: "John Doe",
      employeeId: "WHIZZ001",
      region: "Nungambakkam",
      ordersDelivered: 120,
      status: "On delivery",
    },
    {
      id: 2,
      photo: "https://via.placeholder.com/40",
      name: "Jane Smith",
      employeeId: "WHIZZ002",
      region: "Anna Nagar",
      ordersDelivered: 95,
      status: "Active",
    },
    {
      id: 3,
      photo: "https://via.placeholder.com/40",
      name: "Richard Roe",
      employeeId: "WHIZZ003",
      region: "Anna Nagar",
      ordersDelivered: 60,
      status: "Inactive",
    },
  ],
};

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    updateDeliveryPerson(state, action: PayloadAction<DeliveryPerson>) {
      const index = state.personnel.findIndex(
        (person) => person.id === action.payload.id
      );
      if (index !== -1) {
        state.personnel[index] = action.payload;
      }
    },
    addDeliveryPerson(state, action: PayloadAction<DeliveryPerson>) {
      state.personnel.push(action.payload);
    },
    deleteDeliveryPerson(state, action: PayloadAction<number>) {
      state.personnel = state.personnel.filter(
        (person) => person.id !== action.payload
      );
    },
  },
});

export const {
  updateDeliveryPerson,
  addDeliveryPerson,
  deleteDeliveryPerson,
} = deliverySlice.actions;

export default deliverySlice.reducer;
