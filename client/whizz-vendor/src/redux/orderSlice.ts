import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Dish {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  orderId: string;
  timeAgo: string;
  dishes: Dish[];
  status: "orderQueue" | "inProgress" | "readyForPickup" | "outForDelivery";
  agentInfo?: {
    name: string;
    phone: string;
    profilePic: string;
  };
}

interface OrdersState {
  orders: {
    orderQueue: Order[];
    inProgress: Order[];
    readyForPickup: Order[];
    outForDelivery: Order[];
  };
}

const initialState: OrdersState = {
  orders: {
    orderQueue: [
      {
        orderId: "Order #101",
        timeAgo: "5 min ago",
        dishes: [
          { name: "Zahoor Special Biriyani", price: 200, quantity: 2 },
          { name: "Paneer Butter Masala", price: 250, quantity: 1 },
        ],
        status: "orderQueue",
      },
    ],
    inProgress: [
      {
        orderId: "Order #102",
        timeAgo: "10 min ago",
        dishes: [
          { name: "Chicken Tikka", price: 300, quantity: 1 },
          { name: "Butter Naan", price: 50, quantity: 3 },
        ],
        status: "inProgress",
      },
    ],
    readyForPickup: [
      {
        orderId: "Order #103",
        timeAgo: "15 min ago",
        dishes: [
          { name: "Tandoori Roti", price: 40, quantity: 5 },
          { name: "Veg Fried Rice", price: 180, quantity: 1 },
        ],
        status: "readyForPickup",
      },
    ],
    outForDelivery: [
      {
        orderId: "Order #104",
        timeAgo: "20 min ago",
        dishes: [
          { name: "Mutton Rogan Josh", price: 350, quantity: 1 },
          { name: "Garlic Naan", price: 60, quantity: 2 },
        ],
        agentInfo: {
          name: "John Doe",
          phone: "+1234567890",
          profilePic: "https://via.placeholder.com/40",
        },
        status: "outForDelivery",
      },
    ],
  },
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<OrdersState["orders"]>) => {
      state.orders = action.payload;
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ orderId: string; newStatus: Order["status"] }>
    ) => {
      const { orderId, newStatus } = action.payload;
      let foundOrder: Order | undefined;
      let currentStatus: keyof OrdersState["orders"] | undefined;

      // Find the order and its current status
      for (const status in state.orders) {
        const key = status as keyof OrdersState["orders"];
        foundOrder = state.orders[key].find((order) => order.orderId === orderId);
        if (foundOrder) {
          currentStatus = key;
          break;
        }
      }

      // Update the order's status if found
      if (foundOrder && currentStatus) {
        state.orders[currentStatus] = state.orders[currentStatus].filter(
          (order) => order.orderId !== orderId
        );
        state.orders[newStatus].push({ ...foundOrder, status: newStatus });
      }
    },
  },
});

export const { setOrders, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
