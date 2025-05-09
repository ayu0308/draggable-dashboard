import React, { useState } from 'react';
import { Eye, Pencil, Plus, X } from 'lucide-react';

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
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const widgetId = e.dataTransfer.getData('text/plain');
    if (widgetId) {
      onWidgetDrop(widgetId);
    }
  };

  return (
    <div className="flex items-center justify-between mb-6 animate-fade-in">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        Dashboard
      </h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-amber-100 p-2 rounded-lg shadow-sm">
          <button
            className={`cursor-pointer p-1.5 rounded-full transition-all duration-200 ${
              !isEditMode 
                ? "bg-white shadow-sm hover:shadow-md" 
                : "hover:bg-amber-200"
            }`}
            onClick={() => onToggleEditMode()}
          >
            <Eye className="h-5 w-5 text-amber-600" />
          </button>
          <button
            className={`cursor-pointer p-1.5 rounded-full transition-all duration-200 ${
              isEditMode 
                ? "bg-white shadow-sm hover:shadow-md" 
                : "hover:bg-amber-200"
            }`}
            onClick={onToggleEditMode}
          >
            <Pencil className="h-5 w-5 text-amber-600" />
          </button>
        </div>
        <div className="relative">
          <button 
            className={`flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md ${
              isDraggingOver ? 'ring-2 ring-blue-300 ring-offset-2' : ''
            }`}
            onClick={() => setShowWidgetsList(!showWidgetsList)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Plus className="h-5 w-5" /> Widgets
            {removedWidgets.length > 0 && (
              <span className="bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium animate-scale-in">
                {removedWidgets.length}
              </span>
            )}
          </button>
          
          {showWidgetsList && removedWidgets.length > 0 && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-1000 animate-slide-down">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="font-medium text-gray-800">Removed Widgets</h3>
              </div>
              {removedWidgets.map((widgetId) => {
                const title = widgetId.startsWith('stat-') 
                  ? `Stat Card ${widgetId.split('-')[1]}`
                  : widgetId === 'chart-1' 
                    ? 'Revenue Overview'
                    : 'Recent Activity';
                
                return (
                  <div
                    key={widgetId}
                    className="px-4 py-2 hover:bg-gray-50 flex items-center justify-between group transition-colors duration-200"
                  >
                    <span className="text-gray-700">{title}</span>
                    <button
                      onClick={() => onWidgetRestore(widgetId)}
                      className="p-1.5 rounded-full hover:bg-blue-50 text-blue-600 transition-all duration-200 hover:scale-110"
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