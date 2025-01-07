import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure for an Order
interface Order {
  id: number;
  customerName: string;
  customerNumber: string;
  pickup: string;
  delivery: string;
  assignedAgent?: string; // Optional field for the assigned agent
}

// Define the structure for the slice's state
interface OrderState {
  orders: Order[];
}

// Initial state adhering to the OrderState type
const initialState: OrderState = {
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
    // Add a new order
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },

    // Update an existing order
    updateOrder: (
      state,
      action: PayloadAction<{ id: number; updatedData: Partial<Order> }>
    ) => {
      const { id, updatedData } = action.payload;
      const index = state.orders.findIndex((order) => order.id === id);
      if (index !== -1) {
        state.orders[index] = { ...state.orders[index], ...updatedData };
      }
    },

    // Assign an agent to an order
   // Update the type of `agent` in the assignAgent action payload
assignAgent: (
  state,
  action: PayloadAction<{ id: number; agent: number }>
) => {
  const { id, agent } = action.payload;
  const index = state.orders.findIndex((order) => order.id === id);
  if (index !== -1) {
    state.orders[index].assignedAgent = agent.toString(); // Convert to string if needed
  }
},

  },
});

export const { addOrder, updateOrder, assignAgent } = orderSlice.actions;
export default orderSlice.reducer;
