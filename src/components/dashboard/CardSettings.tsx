import React from 'react';
import { X } from "lucide-react";

interface CardSettingsProps {
  cardId: string;
  title: string;
  onClose: () => void;
  onScaleClick: (dimension: 'width' | 'height', value: number) => void;
  currentScales: {
    width?: number;
    height?: number;
  };
}

export const CardSettings: React.FC<CardSettingsProps> = ({
  cardId,
  title,
  onClose,
  onScaleClick,
  currentScales
}) => {
  const renderScaleButtons = (dimension: 'width' | 'height') => {
    const maxScale = 4;
    const currentScale = currentScales[dimension] || 1;

    return (
      <div className="flex flex-row items-center justify-between gap-2 mb-4 w-full">
        <p className="text-sm font-medium text-gray-700 mb-1">{dimension === 'width' ? 'Width' : 'Height'}</p>
        <div className="flex border border-gray-300 rounded-full overflow-hidden bg-white">
          {Array.from({length: maxScale}, (_, i) => i + 1).map((scale, idx, arr) => (
            <button
              key={scale}
              onClick={() => onScaleClick(dimension, scale)}
              className={`cursor-pointer px-2 py-1 text-base focus:outline-none transition-colors
                ${currentScale === scale ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-800'}
                ${idx === 0 ? 'rounded-l-full' : ''}
                ${idx === arr.length - 1 ? 'rounded-r-full' : ''}
                ${idx !== arr.length - 1 ? 'border-r border-gray-300' : ''}
              `}
              style={{ width: 20 }}
            >
              {scale}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-between p-6 rounded-lg shadow-lg z-10 overflow-y-auto">
      <div className="absolute top-4 right-4">
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      <div className="space-y-6">
        <h2>{title}</h2>
        {renderScaleButtons('width')}
        {renderScaleButtons('height')}
      </div>
    </div>
  );
}; 