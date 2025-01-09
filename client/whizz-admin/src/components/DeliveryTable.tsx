"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { deleteDeliveryPerson } from "@/redux/deliverySlice";

const statusVariants: Record<string, string> = {
  "On delivery": "bg-[#FFF1CB] text-[#FDA400]",
  Active: "bg-[#E0FFD1] text-[#3CAE06]",
  Inactive: "bg-[#FFE3E3] text-[#DC2626]",
};

interface DeliveryPerson {
  id: number;
  photo: string;
  name: string;
  employeeId: string;
  region: string;
  ordersDelivered: number;
  status: string;
}

interface DeliveryTableProps {
  personnel: DeliveryPerson[];
}

const DeliveryTable: React.FC<DeliveryTableProps> = ({ personnel }) => {
  const dispatch = useDispatch();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Photo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Employee ID</TableHead>
          <TableHead>Region</TableHead>
          <TableHead>Orders Delivered</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {personnel.map((person) => (
          <TableRow key={person.id}>
            <TableCell>
              <Image
                width={50}
                height={50}
                src={person.photo}
                alt={person.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            </TableCell>
            <TableCell className="font-medium">{person.name}</TableCell>
            <TableCell>{person.employeeId}</TableCell>
            <TableCell>{person.region}</TableCell>
            <TableCell>{person.ordersDelivered}</TableCell>
            <TableCell>
              <Badge className={`rounded-full px-2 py-1 ${statusVariants[person.status]}`}>
                {person.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                onClick={() => dispatch(deleteDeliveryPerson(person.id))}
              >
                <MoreVertical size={20} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DeliveryTable;
