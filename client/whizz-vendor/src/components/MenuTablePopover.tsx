"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical, PenSquare, Trash2, List } from "lucide-react";
import { useState } from "react";
import { MenuItem } from "./MenuTable";
import EditItemModal from "./EditItemModal";

interface MenuTablePopoverProps {
  onEdit: (updatedItem: MenuItem) => void; // Pass updated item to the parent
  onDelete: (id: number) => void;
  onShowDetails: (id: number) => void;
  itemId: number;
  menuItem: MenuItem;
}

export default function MenuTablePopover({
  onEdit,
  onDelete,
  onShowDetails,
  itemId,
}: MenuTablePopoverProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditSave = (updatedItem: MenuItem) => {
    onEdit(updatedItem); // Pass the updated item to the parent
    setIsEditModalOpen(false); // Close the modal
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <MoreVertical size={16} />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-44 p-2 space-y-2">
          {/* Show Details Button */}
          <button
            className="flex items-center gap-2 text-sm w-full p-2 hover:bg-gray-100 rounded"
            onClick={() => onShowDetails(itemId)}
          >
            <List size={16} /> Show Details
          </button>
          <div className="border-t border-gray-200"></div>

          {/* Edit Button */}
          <button
            className="flex items-center gap-2 text-sm w-full p-2 hover:bg-gray-100 rounded"
            onClick={() => setIsEditModalOpen(true)}
          >
            <PenSquare size={16} /> Edit
          </button>
          <div className="border-t border-gray-200"></div>

          {/* Delete Button */}
          <button
            className="flex items-center gap-2 text-sm w-full p-2 hover:bg-red-100 rounded text-red-600"
            onClick={() => onDelete(itemId)}
          >
            <Trash2 size={16} /> Delete
          </button>
        </PopoverContent>
      </Popover>

      {/* Edit Item Modal */}
      {isEditModalOpen && (
        <EditItemModal
          menuItemId={itemId} // Use the `itemId` here
          onSave={handleEditSave}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
}
