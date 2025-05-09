import React from 'react';
import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { saveCardDimensions, getAllCardDimensions } from '../utils/localStorage';
import { DashboardCard } from './dashboard/DashboardCard';
import { StatCard, StatItem } from './dashboard/StatCard';
import { ChartCard } from './dashboard/ChartCard';
import { ActivityCard } from './dashboard/ActivityCard';
import { CardSettings } from './dashboard/CardSettings';
import { DashboardHeader } from './dashboard/DashboardHeader';

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

function Dashboard() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [removedWidgets, setRemovedWidgets] = useState<string[]>(() => {
    // Load removed widgets from localStorage on initial render
    const savedRemovedWidgets = localStorage.getItem('dashboardRemovedWidgets');
    return savedRemovedWidgets ? JSON.parse(savedRemovedWidgets) : [];
  });
  const [cardScales, setCardScales] = useState<CardScales>({
    "stat-1": { width: 1, height: 1 },
    "stat-2": { width: 1, height: 1 },
    "stat-3": { width: 1, height: 1 },
    "stat-4": { width: 1, height: 1 },
    "chart-1": { width: 2, height: 2 },
    "activity-1": { width: 2, height: 2 }
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

  useEffect(() => {
    const savedDimensions = getAllCardDimensions();
    if (Object.keys(savedDimensions).length > 0) {
      setCardScales(prev => ({
        ...prev,
        ...savedDimensions
      }));
    }

    // Load saved card positions from localStorage
    const savedPositions = localStorage.getItem('dashboardCardPositions');
    if (savedPositions) {
      setCardPositions(JSON.parse(savedPositions));
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
      height: `${(scale.height || 1) * 200}px`,
      order: position.order,
      alignSelf: 'start',
    };
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    if (!isEditMode) return;
    dragItem.current = id;
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isEditMode) return;
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    if (!isEditMode || !dragItem.current) return;

    const newPositions = { ...cardPositions };
    const draggedItemOrder = newPositions[dragItem.current].order;
    const targetItemOrder = newPositions[targetId].order;

    newPositions[dragItem.current].order = targetItemOrder;
    newPositions[targetId].order = draggedItemOrder;

    setCardPositions(newPositions);
    localStorage.setItem('dashboardCardPositions', JSON.stringify(newPositions));
    
    e.currentTarget.classList.remove('opacity-50');
    dragItem.current = null;
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('opacity-50');
    dragItem.current = null;
  };

  const sortedStats = [...stats]
    .filter(stat => !removedWidgets.includes(stat.id))
    .sort((a, b) => (cardPositions[a.id]?.order || 0) - (cardPositions[b.id]?.order || 0));

  const handleWidgetDrop = (widgetId: string) => {
    setRemovedWidgets(prev => {
      const newRemovedWidgets = [...prev, widgetId];
      // Save to localStorage whenever removed widgets change
      localStorage.setItem('dashboardRemovedWidgets', JSON.stringify(newRemovedWidgets));
      return newRemovedWidgets;
    });
    const newPositions = { ...cardPositions };
    const newScales = { ...cardScales };
    delete newPositions[widgetId];
    delete newScales[widgetId];
    setCardPositions(newPositions);
    setCardScales(newScales);
    localStorage.setItem('dashboardCardPositions', JSON.stringify(newPositions));
  };

  const handleWidgetRestore = (widgetId: string) => {
    setRemovedWidgets(prev => {
      const newRemovedWidgets = prev.filter(id => id !== widgetId);
      // Save to localStorage whenever removed widgets change
      localStorage.setItem('dashboardRemovedWidgets', JSON.stringify(newRemovedWidgets));
      return newRemovedWidgets;
    });
    const newPositions = { ...cardPositions };
    const newScales = { ...cardScales };
    const maxOrder = Math.max(...Object.values(cardPositions).map(pos => pos.order));
    newPositions[widgetId] = { order: maxOrder + 1 };
    newScales[widgetId] = { width: 1, height: 1 };
    setCardPositions(newPositions);
    setCardScales(newScales);
    localStorage.setItem('dashboardCardPositions', JSON.stringify(newPositions));
  };

  return (
    <div className="mx-auto p-4 md:p-6 min-h-screen">
      <DashboardHeader 
        isEditMode={isEditMode}
        onToggleEditMode={toggleEditMode}
        onWidgetDrop={handleWidgetDrop}
        removedWidgets={removedWidgets}
        onWidgetRestore={handleWidgetRestore}
      />

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-min gap-4 md:gap-6 items-start">
          {sortedStats.map((stat) => (
            <DashboardCard
              key={stat.id}
              id={stat.id}
              title={stat.title}
              isEditMode={isEditMode}
              onSettingsClick={handleSettingsClick}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              style={getCardStyle(stat.id)}
            >
              <StatCard {...stat} />
              {activeCard === stat.id && (
                <CardSettings
                  cardId={stat.id}
                  title={stat.title}
                  onClose={closeOverlay}
                  onScaleClick={handleScaleClick}
                  currentScales={cardScales[stat.id]}
                />
              )}
            </DashboardCard>
          ))}

          {!removedWidgets.includes("chart-1") && (
            <DashboardCard
              id="chart-1"
              title="Revenue Overview"
              isEditMode={isEditMode}
              onSettingsClick={handleSettingsClick}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              style={getCardStyle("chart-1")}
            >
              <ChartCard />
              {activeCard === "chart-1" && (
                <CardSettings
                  cardId="chart-1"
                  title="Revenue Overview"
                  onClose={closeOverlay}
                  onScaleClick={handleScaleClick}
                  currentScales={cardScales["chart-1"] || {}}
                />
              )}
            </DashboardCard>
          )}

          {!removedWidgets.includes("activity-1") && (
            <DashboardCard
              id="activity-1"
              title="Recent Activity"
              isEditMode={isEditMode}
              onSettingsClick={handleSettingsClick}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              style={getCardStyle("activity-1")}
            >
              <ActivityCard />
              {activeCard === "activity-1" && (
                <CardSettings
                  cardId="activity-1"
                  title="Recent Activity"
                  onClose={closeOverlay}
                  onScaleClick={handleScaleClick}
                  currentScales={cardScales["activity-1"] || {}}
                />
              )}
            </DashboardCard>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;