import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Dish {
  _id?: string;
  dishName: string;
  price: number;
  quantity: number;
}

export interface Order {
  whizzOrderId: string;
  timeAgo?: string;
  createdTime: string;
  acceptOrRejectTime?: string;
  readyForPickupTime?:string;
  outForDeliveryTime?:string;
  pickupTime?: string;
  deliveredTime?: string;
  dishes: Dish[];
  status: "orderQueue" | "inProgress" | "readyForPickup" | "outForDelivery" | "delivered" | "rejected";
  agentInfo?: {
    name: string;
    phone: string;
    profilePic: string;
  };
  rejectedReason?: string;
}

interface OrdersState {
  orders: {
    orderQueue: Order[];
    inProgress: Order[];
    readyForPickup: Order[];
    outForDelivery: Order[];
    delivered: Order[];
    rejected: Order[];
  };
}

const initialState: OrdersState = {
  orders: {
    orderQueue: [],
    inProgress: [],
    readyForPickup: [],
    outForDelivery: [],
    delivered: [],
    rejected: [],
  }
};

// const initialState: OrdersState = {
//   orders: {
//     orderQueue: [
//       {
//         whizzOrderId: "Order #101",
//         createdTime: "5 min ago",
//         dishes: [
//           { dishName: "Zahoor Special Biriyani", price: 200, quantity: 2 },
//           { dishName: "Paneer Butter Masala", price: 250, quantity: 1 },
//         ],
//         status: "orderQueue",
//       },
//     ],
//     inProgress: [
//       {
//         whizzOrderId: "Order #102",
//         createdTime: "10 min ago",
//         dishes: [
//           { dishName: "Chicken Tikka", price: 300, quantity: 1 },
//           { dishName: "Butter Naan", price: 50, quantity: 3 },
//         ],
//         status: "inProgress",
//       },
//     ],
//     readyForPickup: [
//       {
//         whizzOrderId: "Order #103",
//         createdTime: "15 min ago",
//         dishes: [
//           { dishName: "Tandoori Roti", price: 40, quantity: 5 },
//           { dishName: "Veg Fried Rice", price: 180, quantity: 1 },
//         ],
//         status: "readyForPickup",
//       },
//     ],
//     outForDelivery: [
//       {
//         whizzOrderId: "Order #104",
//         createdTime: "20 min ago",
//         dishes: [
//           { dishName: "Mutton Rogan Josh", price: 350, quantity: 1 },
//           { dishName: "Garlic Naan", price: 60, quantity: 2 },
//         ],
//         agentInfo: {
//           name: "John Doe",
//           phone: "+1234567890",
//           profilePic: "https://via.placeholder.com/40",
//         },
//         status: "outForDelivery",
//       },
//     ],
//   },
// };

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
        foundOrder = state.orders[key].find((order) => order.whizzOrderId === orderId);
        if (foundOrder) {
          currentStatus = key;
          break;
        }
      }

      // Update the order's status if found
      if (foundOrder && currentStatus) {
        state.orders[currentStatus] = state.orders[currentStatus].filter(
          (order) => order.whizzOrderId !== orderId
        );
        state.orders[newStatus].push({ ...foundOrder, status: newStatus });
      }
    },
  },
});

export const { setOrders, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
