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
import { RootState } from "@/redux/store"; // RootState type from Redux store
import { assignAgent } from "@/redux/orderSlice";
import { updateAgentStatus } from "@/redux/agentSlice";
import { useState } from "react";

export default function Dashboard() {
  // Access orders and agents from Redux store with proper types
  const orders = useSelector((state: RootState) => state.orders.orders);
  const agents = useSelector((state: RootState) => state.agents.agents);
  const dispatch = useDispatch();

  const [selectedAgents, setSelectedAgents] = useState<{ [key: number]: string }>({});

  // Type the parameters for handleAssignAgent
  const handleAssignAgent = (orderId: number, agentId: string) => {
    // Dispatch assignAgent with type-safe payload
    dispatch(assignAgent({ id: orderId, agent: Number(agentId) }));

    // Dispatch updateAgentStatus with type-safe payload
    dispatch(updateAgentStatus({ id: Number(agentId), status: "assigned" }));

    // Update the local state for selected agents
    const agent = agents.find((agent) => agent.id.toString() === agentId);
    if (agent) {
      setSelectedAgents((prevState) => ({
        ...prevState,
        [orderId]: agent.agent_name,
      }));
    }
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
                    <SelectValue
                      placeholder="Select Agent"
                      defaultValue={selectedAgents[order.id] || ""}
                    >
                      {selectedAgents[order.id] || "Select Agent"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {agents
                      .filter((agent) => agent.is_available) // Only available agents
                      .map((agent) => (
                        <SelectItem key={agent.id} value={agent.id.toString()}>
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
