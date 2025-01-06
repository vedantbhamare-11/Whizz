"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { assignAgent } from "@/redux/orderSlice";
import { updateAgentStatus } from "@/redux/agentSlice";

export default function Dashboard() {
  const orders = useSelector((state) => state.orders.orders);
  const agents = useSelector((state) => state.agents.agents);
  const dispatch = useDispatch();

  const handleAssignAgent = (orderId, agentId) => {
    // Assign agent to order
    dispatch(assignAgent({ id: orderId, agent: agentId }));

    // Update agent's status to "assigned"
    dispatch(updateAgentStatus({ id: agentId, status: "assigned" }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Order Info</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Customer Number</TableHead>
            <TableHead>Pickup</TableHead>
            <TableHead>Delivery</TableHead>
            <TableHead>Order Details</TableHead>
            <TableHead>Assigned Agent</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.customerNumber}</TableCell>
              <TableCell>{order.pickup}</TableCell>
              <TableCell>{order.delivery}</TableCell>
              <TableCell>
                <Button variant="outline">View Details</Button>
              </TableCell>
              <TableCell>
                <Select
                  onValueChange={(value) => handleAssignAgent(order.id, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents
                      .filter((agent) => agent.is_available) // Only available agents
                      .map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>
                          {agent.agent_name} ({agent.covered_area})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button variant="outline">Assign</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
