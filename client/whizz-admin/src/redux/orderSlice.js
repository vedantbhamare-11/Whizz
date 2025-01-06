import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [
    {
      id: 1,
      customerName: "John Doe",
      customerNumber: "+123456789",
      pickup: "123 Main St",
      delivery: "456 Elm St",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      customerNumber: "+987654321",
      pickup: "789 Oak St",
      delivery: "321 Pine St",
    },
  ],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.orders.findIndex((order) => order.id === id);
      if (index !== -1) {
        state.orders[index] = { ...state.orders[index], ...updatedData };
      }
    },
    assignAgent: (state, action) => {
      const { id, agent } = action.payload;
      const index = state.orders.findIndex((order) => order.id === id);
      if (index !== -1) {
        state.orders[index].assignedAgent = agent; // Add assigned agent field dynamically
      }
    },
  },
});

export const { addOrder, updateOrder, assignAgent } = orderSlice.actions;
export default orderSlice.reducer;
