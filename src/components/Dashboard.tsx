/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { Users, DollarSign, ShoppingCart, TrendingUp, Eye, Pencil, Plus, Settings, X, LucideIcon, GripVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { saveCardDimensions, getCardDimensions, getAllCardDimensions } from '../utils/localStorage';

interface StatItem {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  id: string;
}

interface CardScale {
  width?: number;
  height?: number;
}

interface CardScales {
  [key: string]: CardScale;
}

interface CardPosition {
  [key: string]: { order: number };
}

function DashboardCard({ title, value, change, isPositive, icon: Icon }: StatItem) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          <div className={`flex items-center mt-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            <span>{change}</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
          <Icon className="h-6 w-6 text-blue-500" />
        </div>
      </div>
    </div>
  );
}

function Chart() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-400">Chart visualization goes here</p>
      </div>
    </div>
  );
}

function Dashboard() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [cardScales, setCardScales] = useState<CardScales>({
    "stat-1": { width: 1, height: 1 },
    "stat-2": { width: 1, height: 1 },
    "stat-3": { width: 1, height: 1 },
    "stat-4": { width: 1, height: 1 },
    "chart-1": { width: 2, height: 1 },
    "activity-1": { width: 2, height: 1 }
  });
  
  const [cardPositions, setCardPositions] = useState<CardPosition>({
    "stat-1": { order: 0 },
    "stat-2": { order: 1 },
    "stat-3": { order: 2 },
    "stat-4": { order: 3 },
    "chart-1": { order: 4 },
    "activity-1": { order: 5 }
  });

  const dragItem = useRef<string | null>(null);
  const dragOverItem = useRef<string | null>(null);

  // Load saved dimensions from localStorage on component mount
  useEffect(() => {
    const savedDimensions = getAllCardDimensions();
    if (Object.keys(savedDimensions).length > 0) {
      setCardScales(prev => ({
        ...prev,
        ...savedDimensions
      }));
    }
  }, []);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
    if (activeCard) {
      setActiveCard(null);
    }
  };

  const handleSettingsClick = (cardId: string) => {
    setActiveCard(cardId);
  };

  const closeOverlay = () => {
    setActiveCard(null);
  };

  const handleScaleClick = (dimension: 'width' | 'height', value: number) => {
    if (!activeCard) return;
    
    const newScales = {
      ...cardScales,
      [activeCard]: {
        ...cardScales[activeCard],
        [dimension]: value
      }
    };
    
    setCardScales(newScales);
    // Save to localStorage
    saveCardDimensions(activeCard, {
      width: newScales[activeCard].width || 1,
      height: newScales[activeCard].height || 1
    });
  };

  const stats: StatItem[] = [
    {
      id: "stat-1",
      title: "Total Revenue",
      value: "$54,239",
      change: "+12.5%",
      isPositive: true,
      icon: DollarSign,
    },
    {
      id: "stat-2",
      title: "Active Users",
      value: "2,345",
      change: "+18.2%",
      isPositive: true,
      icon: Users,
    },
    {
      id: "stat-3",
      title: "Total Sales",
      value: "1,235",
      change: "-3.1%",
      isPositive: false,
      icon: ShoppingCart,
    },
    {
      id: "stat-4",
      title: "Conversion Rate",
      value: "3.15%",
      change: "+5.4%",
      isPositive: true,
      icon: TrendingUp,
    },
  ];

  const getCardStyle = (id: string): React.CSSProperties => {
    const scale = cardScales[id] || { width: 1, height: 1 };
    const position = cardPositions[id] || { order: 0 };
    
    return {
      gridColumn: `span ${scale.width || 1}`,
      gridRow: `span ${scale.height || 1}`,
      minHeight: `${(scale.height || 1) * 200}px`,
      order: position.order,
    };
  };

  const renderScaleButtons = (dimension: 'width' | 'height', cardId: string) => {
    const maxScale = 4;
    const currentScale = cardScales[cardId]?.[dimension] || 1;

    return (
      <div className="flex flex-row items-center justify-between gap-2 mb-4 w-full">
        <p className="text-sm font-medium text-gray-700 mb-1">{dimension === 'width' ? 'Width' : 'Height'}</p>
        <div className="flex border border-gray-300 rounded-full overflow-hidden bg-white">
          {Array.from({length: maxScale}, (_, i) => i + 1).map((scale, idx, arr) => (
            <button
              key={scale}
              onClick={() => handleScaleClick(dimension, scale)}
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

  const renderOverlay = (cardId: string, title: string) => (
    <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-between p-6 rounded-lg shadow-lg z-10 overflow-y-auto">
      <div className="absolute top-4 right-4">
        <button onClick={closeOverlay} className="p-1 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      <div className="space-y-6">
        <h2>{title}</h2>
        {renderScaleButtons('width', cardId)}
        {renderScaleButtons('height', cardId)}
      </div>
    </div>
  );

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    if (!isEditMode) return;
    dragItem.current = id;
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    if (!isEditMode) return;
    dragOverItem.current = id;
    e.preventDefault();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isEditMode) return;
    e.preventDefault();
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isEditMode || !dragItem.current || !dragOverItem.current) {
      e.currentTarget.classList.remove('opacity-50');
      return;
    }

    // Reorder the cards
    const newPositions = { ...cardPositions };
    const draggedItemOrder = newPositions[dragItem.current].order;
    const dragOverItemOrder = newPositions[dragOverItem.current].order;

    // Update all affected positions
    Object.keys(newPositions).forEach(key => {
      const currentOrder = newPositions[key].order;
      
      if (draggedItemOrder < dragOverItemOrder) {
        // Moving down
        if (currentOrder > draggedItemOrder && currentOrder <= dragOverItemOrder) {
          newPositions[key].order -= 1;
        } else if (key === dragItem.current) {
          newPositions[key].order = dragOverItemOrder;
        }
      } else if (draggedItemOrder > dragOverItemOrder) {
        // Moving up
        if (currentOrder < draggedItemOrder && currentOrder >= dragOverItemOrder) {
          newPositions[key].order += 1;
        } else if (key === dragItem.current) {
          newPositions[key].order = dragOverItemOrder;
        }
      }
    });

    setCardPositions(newPositions);
    e.currentTarget.classList.remove('opacity-50');
    
    // Save to localStorage
    localStorage.setItem('dashboardCardPositions', JSON.stringify(newPositions));
    localStorage.setItem('dashboardCardScales', JSON.stringify(cardScales));
    
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Sort all widgets by their order
  const sortedStats = [...stats].sort((a, b) => 
    (cardPositions[a.id]?.order || 0) - (cardPositions[b.id]?.order || 0)
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-amber-200 p-2 rounded-lg">
            <button
              className={`cursor-pointer p-1 rounded ${!isEditMode ? "bg-gray-300" : ""}`}
              onClick={() => setIsEditMode(false)}
            >
              <Eye className="h-5 w-5" />
            </button>
            <button
              className={`cursor-pointer p-1 rounded ${isEditMode ? "bg-gray-300" : ""}`}
              onClick={toggleEditMode}
            >
              <Pencil className="h-5 w-5" />
            </button>
          </div>
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            <Plus className="h-5 w-5" /> Widgets
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-4 auto-rows-min gap-6">
          {sortedStats.map((stat) => (
            <div 
              key={stat.id} 
              className={`relative h-full ${isEditMode ? 'cursor-move' : ''}`}
              style={getCardStyle(stat.id)}
              draggable={isEditMode}
              onDragStart={(e) => handleDragStart(e, stat.id)}
              onDragEnter={(e) => handleDragEnter(e, stat.id)}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              onDragLeave={handleDragLeave}
              onDrop={(e) => e.preventDefault()}
            >
              {isEditMode && (
                <div className="absolute top-2 right-2 flex space-x-2 z-10">
                  <button
                    className="p-1 bg-gray-200 rounded-full"
                    onClick={() => handleSettingsClick(stat.id)}
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                  <div className="p-1 bg-gray-200 rounded-full">
                    <GripVertical className="h-4 w-4 cursor-grab" />
                  </div>
                </div>
              )}
              <DashboardCard {...stat} />
              {activeCard === stat.id && renderOverlay(stat.id, stat.title)}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 auto-rows-min gap-6">
          <div 
            className={`relative bg-white p-6 rounded-xl shadow-sm h-full ${isEditMode ? 'cursor-move' : ''}`}
            style={getCardStyle("chart-1")}
            draggable={isEditMode}
            onDragStart={(e) => handleDragStart(e, "chart-1")}
            onDragEnter={(e) => handleDragEnter(e, "chart-1")}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragLeave={handleDragLeave}
            onDrop={(e) => e.preventDefault()}
          >
            {isEditMode && (
              <div className="absolute top-2 right-2 flex space-x-2 z-10">
                <button
                  className="p-1 bg-gray-200 rounded-full"
                  onClick={() => handleSettingsClick("chart-1")}
                >
                  <Settings className="h-4 w-4" />
                </button>
                <div className="p-1 bg-gray-200 rounded-full">
                  <GripVertical className="h-4 w-4 cursor-grab" />
                </div>
              </div>
            )}
            <Chart />
            {activeCard === "chart-1" && renderOverlay("chart-1", "Revenue Overview")}
          </div>

          <div 
            className={`relative bg-white p-6 rounded-xl shadow-sm h-full ${isEditMode ? 'cursor-move' : ''}`}
            style={getCardStyle("activity-1")}
            draggable={isEditMode}
            onDragStart={(e) => handleDragStart(e, "activity-1")}
            onDragEnter={(e) => handleDragEnter(e, "activity-1")}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragLeave={handleDragLeave}
            onDrop={(e) => e.preventDefault()}
          >
            {isEditMode && (
              <div className="absolute top-2 right-2 flex space-x-2 z-10">
                <button
                  className="p-1 bg-gray-200 rounded-full"
                  onClick={() => handleSettingsClick("activity-1")}
                >
                  <Settings className="h-4 w-4" />
                </button>
                <div className="p-1 bg-gray-200 rounded-full">
                  <GripVertical className="h-4 w-4 cursor-grab" />
                </div>
              </div>
            )}
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New user registered</p>
                    <p className="text-xs text-gray-500">{i} hour ago</p>
                  </div>
                </div>
              ))}
            </div>
            {activeCard === "activity-1" && renderOverlay("activity-1", "Recent Activity")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;