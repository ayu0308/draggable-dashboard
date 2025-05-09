import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatItem {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}

export const StatCard: React.FC<StatItem> = ({ id, title, value, change, isPositive, icon: Icon }) => {
  return (
    <div className="flex items-center justify-between animate-fade-in">
      <div className="space-y-1">
        <p className="text-2xl font-semibold mt-1 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          {value}
        </p>
        <div className="flex items-center gap-1.5">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm transition-all duration-200 ${
            isPositive 
              ? 'bg-green-50 text-green-600 hover:bg-green-100' 
              : 'bg-red-50 text-red-600 hover:bg-red-100'
          }`}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4 animate-bounce-subtle" />
            ) : (
              <TrendingDown className="h-4 w-4 animate-bounce-subtle" />
            )}
            <span>{change}</span>
          </div>
          <span className="text-sm text-gray-500">vs last month</span>
        </div>
      </div>
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-md">
        <Icon className="h-6 w-6 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
      </div>
    </div>
  );
}; 