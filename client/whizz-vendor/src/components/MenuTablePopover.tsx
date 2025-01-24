"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical, PenSquare, Trash2, List } from "lucide-react";

interface MenuTablePopoverProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onShowDetails: (id: string) => void;
  itemId: string;
}

export default function MenuTablePopover({
  onEdit,
  onDelete,
  onShowDetails,
  itemId,
}: MenuTablePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-2 rounded-md hover:bg-gray-100">
          <MoreVertical size={16} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-44 p-2 space-y-2">
        <button
          className="flex items-center gap-2 text-sm w-full p-2 hover:bg-gray-100 rounded"
          onClick={() => onShowDetails(itemId)}
        >
          <List size={16} /> Show Details
        </button>
        <div className="border-t border-gray-200"></div> {/* Separator */}
        <button
          className="flex items-center gap-2 text-sm w-full p-2 hover:bg-gray-100 rounded"
          onClick={() => onEdit(itemId)}
        >
          <PenSquare size={16} /> Edit
        </button>
        <div className="border-t border-gray-200"></div> {/* Separator */}
        <button
          className="flex items-center gap-2 text-sm w-full p-2 hover:bg-red-100 rounded text-red-600"
          onClick={() => onDelete(itemId)}
        >
          <Trash2 size={16} /> Delete
        </button>
      </PopoverContent>
    </Popover>
  );
}
