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
      className={`relative h-full ${isEditMode ? 'cursor-move' : ''}`}
      style={style}
      draggable={isEditMode}
      onDragStart={(e) => onDragStart(e, id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, id)}
      onDragEnd={onDragEnd}
    >
      {isEditMode && (
        <div className="absolute top-2 right-2 flex space-x-2 z-10">
          <button
            className="p-1 bg-gray-200 rounded-full"
            onClick={() => onSettingsClick(id)}
          >
            <Settings className="h-4 w-4" />
          </button>
          <div className="p-1 bg-gray-200 rounded-full">
            <GripVertical className="h-4 w-4 cursor-grab" />
          </div>
        </div>
      )}
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}; 