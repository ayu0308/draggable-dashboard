import React from 'react';
import { Eye, Pencil, Plus } from "lucide-react";

interface DashboardHeaderProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  isEditMode,
  onToggleEditMode
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-amber-200 p-2 rounded-lg">
          <button
            className={`cursor-pointer p-1 rounded ${!isEditMode ? "bg-gray-300" : ""}`}
            onClick={() => onToggleEditMode()}
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            className={`cursor-pointer p-1 rounded ${isEditMode ? "bg-gray-300" : ""}`}
            onClick={onToggleEditMode}
          >
            <Pencil className="h-5 w-5" />
          </button>
        </div>
        <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          <Plus className="h-5 w-5" /> Widgets
        </button>
      </div>
    </div>
  );
}; 