import React, { useState } from 'react';
import { Eye, Pencil, Plus } from "lucide-react";

interface DashboardHeaderProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onWidgetDrop: (widgetId: string) => void;
  removedWidgets: string[];
  onWidgetRestore: (widgetId: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  isEditMode,
  onToggleEditMode,
  onWidgetDrop,
  removedWidgets,
  onWidgetRestore
}) => {
  const [showWidgetsList, setShowWidgetsList] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-blue-600', 'ring-4', 'ring-blue-300', 'ring-opacity-50');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-blue-600', 'ring-4', 'ring-blue-300', 'ring-opacity-50');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-blue-600', 'ring-4', 'ring-blue-300', 'ring-opacity-50');
    const widgetId = e.dataTransfer.getData('text/plain');
    if (widgetId) {
      onWidgetDrop(widgetId);
    }
  };

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
        <div className="relative">
          <button 
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
            onClick={() => setShowWidgetsList(!showWidgetsList)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Plus className="h-5 w-5" /> Widgets
            {removedWidgets.length > 0 && (
              <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {removedWidgets.length}
              </span>
            )}
          </button>
          
          {showWidgetsList && removedWidgets.length > 0 && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-1000">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="font-medium text-gray-700">Removed Widgets</h3>
              </div>
              {removedWidgets.map((widgetId) => {
                // Get a readable title based on widget ID
                const title = widgetId.startsWith('stat-') 
                  ? `Stat Card ${widgetId.split('-')[1]}`
                  : widgetId === 'chart-1' 
                    ? 'Revenue Overview'
                    : 'Recent Activity';
                
                return (
                  <div
                    key={widgetId}
                    className="px-4 py-2 hover:bg-gray-50 flex items-center justify-between group"
                  >
                    <span className="text-gray-700">{title}</span>
                    <button
                      onClick={() => onWidgetRestore(widgetId)}
                      className="p-1 rounded-full hover:bg-blue-100 text-blue-600 transition-colors"
                      title="Restore widget"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 