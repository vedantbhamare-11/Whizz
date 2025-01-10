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
    id: number;
    customerName: string;
    customerNumber: string;
    location: string;
    vendorId: number;
    deliveryPersonnel: string;
    dishes?: { name: string; quantity: number; price: number }[];
  }
  
  interface Vendor {
    id: number;
    name: string;
    location: string;
  }
  
  interface DeliveryPersonnel {
    id: number;
    name: string;
  }
  
  interface OrderTableProps {
    orders: Order[];
    vendors: Vendor[];
    deliveryPersonnel: DeliveryPersonnel[];
    onAssign: (id: number, personnel: string) => void;
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
    const [selectedPersonnel, setSelectedPersonnel] = useState<Record<number, string>>({});
  
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
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.customerNumber}</TableCell>
              <TableCell>{order.location}</TableCell>
              <TableCell>
                {vendors.find((vendor) => vendor.id === order.vendorId)?.name ||
                  "Unknown"}
              </TableCell>
              <TableCell>
                <OrderDetailsDialog
                  orderId={order.id}
                  vendorName={
                    vendors.find((vendor) => vendor.id === order.vendorId)?.name ||
                    "Unknown"
                  }
                  vendorLocation={
                    vendors.find((vendor) => vendor.id === order.vendorId)
                      ?.location || "Unknown"
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
                    defaultValue={selectedPersonnel[order.id] || "Unassigned"}
                    onValueChange={(value) =>
                      setSelectedPersonnel((prev) => ({
                        ...prev,
                        [order.id]: value,
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
                      onAssign(order.id, selectedPersonnel[order.id] || "Unassigned")
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
  