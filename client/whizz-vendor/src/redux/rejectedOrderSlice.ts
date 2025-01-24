import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Dish {
  name: string;
  price: number;
  quantity: number;
}

export interface RejectedOrder {
  orderId: string;
  dishes: Dish[];
  rejectionReason: string;
}

interface RejectedOrdersState {
  rejectedOrders: RejectedOrder[];
}

const initialState: RejectedOrdersState = {
  rejectedOrders: [
    {
      orderId: "Order #201",
      dishes: [
        { name: "Chicken Biryani", price: 250, quantity: 1 },
        { name: "Tandoori Chicken", price: 300, quantity: 1 },
      ],
      rejectionReason: "Customer canceled the order."
    },
    {
      orderId: "Order #202",
      dishes: [
        { name: "Paneer Butter Masala", price: 200, quantity: 2 },
        { name: "Butter Naan", price: 50, quantity: 4 },
      ],
      rejectionReason: "Payment failed."
    },
  ],
};

const rejectedOrdersSlice = createSlice({
  name: "rejectedOrders",
  initialState,
  reducers: {
    setRejectedOrders: (state, action: PayloadAction<RejectedOrder[]>) => {
      state.rejectedOrders = action.payload;
    },
    addRejectedOrder: (state, action: PayloadAction<RejectedOrder>) => {
      state.rejectedOrders.push(action.payload);
    },
    removeRejectedOrder: (state, action: PayloadAction<string>) => {
      state.rejectedOrders = state.rejectedOrders.filter(
        (order) => order.orderId !== action.payload
      );
    },
  },
});

export const { setRejectedOrders, addRejectedOrder, removeRejectedOrder } =
  rejectedOrdersSlice.actions;
export default rejectedOrdersSlice.reducer;
