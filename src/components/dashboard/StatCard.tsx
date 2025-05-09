import { LucideIcon } from "lucide-react";

export interface StatItem {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  id: string;
}

export const StatCard: React.FC<StatItem> = ({ title, value, change, isPositive, icon: Icon }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
     
        <p className="text-2xl font-semibold mt-1">{value}</p>
        <div className={`flex items-center mt-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          <span>{change}</span>
        </div>
      </div>
      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
        <Icon className="h-6 w-6 text-blue-500" />
      </div>
    </div>
  );
}; 