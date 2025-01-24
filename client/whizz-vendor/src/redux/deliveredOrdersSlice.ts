import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Dish {
  name: string;
  price: number;
  quantity: number;
}

export interface DeliveredOrder {
  orderId: string;
  dishes: Dish[];
  deliveryTime: string;
  deliveredBy: {
    name: string;
    phone: string;
    profilePic: string;
  };
}

interface DeliveredOrdersState {
  deliveredOrders: DeliveredOrder[];
}

const initialState: DeliveredOrdersState = {
  deliveredOrders: [
    {
      orderId: "Order #201",
      dishes: [
        { name: "Chicken Biryani", price: 250, quantity: 1 },
        { name: "Butter Chicken", price: 300, quantity: 2 },
      ],
      deliveryTime: "12:30 PM",
      deliveredBy: {
        name: "Alice Smith",
        phone: "+1234567891",
        profilePic:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D",
      },
    },
    {
      orderId: "Order #202",
      dishes: [
        { name: "Paneer Tikka", price: 200, quantity: 1 },
        { name: "Garlic Naan", price: 50, quantity: 3 },
      ],
      deliveryTime: "01:15 PM",
      deliveredBy: {
        name: "Bob Johnson",
        phone: "+1234567892",
        profilePic:
          "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D",
      },
    },
  ],
};

const deliveredOrdersSlice = createSlice({
  name: "deliveredOrders",
  initialState,
  reducers: {
    setDeliveredOrders: (state, action: PayloadAction<DeliveredOrder[]>) => {
      state.deliveredOrders = action.payload;
    },
    addDeliveredOrder: (state, action: PayloadAction<DeliveredOrder>) => {
      state.deliveredOrders.push(action.payload);
    },
    removeDeliveredOrder: (state, action: PayloadAction<string>) => {
      state.deliveredOrders = state.deliveredOrders.filter(
        (order) => order.orderId !== action.payload
      );
    },
  },
});

export const { setDeliveredOrders, addDeliveredOrder, removeDeliveredOrder } =
  deliveredOrdersSlice.actions;
export default deliveredOrdersSlice.reducer;
