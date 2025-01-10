import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Dish {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  customerName: string;
  customerNumber: string;
  location: string;
  vendorId: string;
  deliveryPersonnel: string;
  dishes: Dish[];
  totalAmount: number;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [
    {
      _id: "1",
      customerName: "John Doe",
      customerNumber: "+91-9876543210",
      location: "Nungambakkam",
      vendorId: "1",
      deliveryPersonnel: "Unassigned",
      dishes: [
        { name: "Paneer Butter Masala", quantity: 2, price: 200 },
        { name: "Butter Naan", quantity: 4, price: 50 },
      ],
      totalAmount: 500,
    },
    {
      _id: "2",
      customerName: "Jane Smith",
      customerNumber: "+91-9876543220",
      location: "Anna Nagar",
      vendorId: "2",
      deliveryPersonnel: "Unassigned",
      dishes: [
        { name: "Chicken Biryani", quantity: 1, price: 300 },
        { name: "Raita", quantity: 1, price: 50 },
      ],
      totalAmount: 350,
    },
    {
      _id: "3",
      customerName: "Alice Brown",
      customerNumber: "+91-9876543230",
      location: "Nungambakkam",
      vendorId: "1",
      deliveryPersonnel: "Unassigned",
      dishes: [
        { name: "Veg Pulao", quantity: 2, price: 150 },
        { name: "Papad", quantity: 2, price: 20 },
      ],
      totalAmount: 340,
    },
  ],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    assignDeliveryPersonnel(
      state,
      action: PayloadAction<{ orderId: string; personnel: string }>
    ) {
      const { orderId, personnel } = action.payload;
      const order = state.orders.find((order) => order._id === orderId);
      if (order) {
        order.deliveryPersonnel = personnel;
      }
    },
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    updateOrder(state, action: PayloadAction<Order>) {
      const index = state.orders.findIndex((order) => order._id === action.payload._id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    deleteOrder(state, action: PayloadAction<string>) {
      state.orders = state.orders.filter((order) => order._id !== action.payload);
    },
  },
});

export const {
  assignDeliveryPersonnel,
  addOrder,
  updateOrder,
  deleteOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
