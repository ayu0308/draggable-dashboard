import React from 'react';
import { Settings, GripVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface DashboardCardProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isEditMode: boolean;
  onSettingsClick: (id: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  style: React.CSSProperties;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  id,
  title,
  children,
  isEditMode,
  onSettingsClick,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  style
}) => {
  return (
    <div
      className={`relative h-full group transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg ${
        isEditMode ? 'cursor-move' : ''
      }`}
      style={style}
      draggable={isEditMode}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', id);
        onDragStart(e, id);
      }}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, id)}
      onDragEnd={onDragEnd}
    >
      {isEditMode && (
        <div className="absolute top-2 right-2 flex space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white hover:shadow-md transition-all duration-200"
            onClick={() => onSettingsClick(id)}
          >
            <Settings className="h-4 w-4 text-gray-600" />
          </button>
          <div className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white hover:shadow-md transition-all duration-200">
            <GripVertical className="h-4 w-4 text-gray-600 cursor-grab active:cursor-grabbing" />
          </div>
        </div>
      )}
      <Card className="h-full bg-white/95 backdrop-blur-sm border border-gray-100 hover:border-gray-200 transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}; 