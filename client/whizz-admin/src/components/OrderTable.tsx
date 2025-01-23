import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Button } from "@/components/ui/button";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import OrderDetailsDialog from "@/components/OrderDetailsDialog";
  import { useState } from "react";
  
  interface Order {
    _id: string;
    customerName: string;
    customerNumber: string;
    location: string;
    vendorId: string;
    deliveryPersonnel: string;
    dishes?: { dishName: string; quantity: number; price: number }[];
  }
  
  interface Vendor {
    _id: string;
    vendorName: string;
    area: string;
  }
  
  interface DeliveryPersonnel {
    id: number;
    name: string;
  }
  
  interface OrderTableProps {
    orders: Order[];
    vendors: Vendor[];
    deliveryPersonnel: DeliveryPersonnel[];
    onAssign: (id: string, personnel: string) => void;
    isAssignedTab?: boolean;
  }
  
  const OrderTable: React.FC<OrderTableProps> = ({
    orders,
    vendors,
    deliveryPersonnel,
    onAssign,
    isAssignedTab = false,
  }) => {
    // Local state to temporarily store selected personnel for each order
    const [selectedPersonnel, setSelectedPersonnel] = useState<Record<string, string>>({});
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Customer Number</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Vendor Name</TableHead>
            <TableHead>Order Details</TableHead>
            <TableHead>Delivery Personnel</TableHead>
            {!isAssignedTab && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.customerNumber}</TableCell>
              <TableCell>{order.location}</TableCell>
              <TableCell>
                {vendors.find((vendor) => vendor._id === order.vendorId)?.vendorName ||
                  "Unknown"}
              </TableCell>
              <TableCell>
                <OrderDetailsDialog
                  orderId={order._id}
                  vendorName={
                    vendors.find((vendor) => vendor._id === order.vendorId)?.vendorName ||
                    "Unknown"
                  }
                  vendorLocation={
                    vendors.find((vendor) => vendor._id === order.vendorId)
                      ?.area || "Unknown"
                  }
                  dishes={order.dishes || []}
                  totalPrice={
                    order.dishes?.reduce(
                      (total, dish) => total + dish.price * dish.quantity,
                      0
                    ) || 0
                  }
                />
              </TableCell>
              <TableCell>
                {isAssignedTab ? (
                  order.deliveryPersonnel
                ) : (
                  <Select
                    defaultValue={selectedPersonnel[order._id] || "Unassigned"}
                    onValueChange={(value) =>
                      setSelectedPersonnel((prev) => ({
                        ...prev,
                        [order._id]: value,
                      }))
                    }
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select Personnel" />
                    </SelectTrigger>
                    <SelectContent>
                      {deliveryPersonnel.map((person) => (
                        <SelectItem key={person.id} value={person.name}>
                          {person.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </TableCell>
              {!isAssignedTab && (
                <TableCell>
                  <Button
                    variant="default"
                    onClick={() =>
                      onAssign(order._id, selectedPersonnel[order._id] || "Unassigned")
                    }
                    className="bg-[#3CAE06] text-white hover:bg-[#36A205]"
                  >
                    Assign
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  
  export default OrderTable;
  