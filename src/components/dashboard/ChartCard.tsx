import React from 'react';
import { Card } from "../ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const revenueData = [
  {
    name: "Jan",
    revenue: 4000,
  },
  {
    name: "Feb",
    revenue: 3000,
  },
  {
    name: "Mar",
    revenue: 5000,
  },
  {
    name: "Apr",
    revenue: 2780,
  },
  {
    name: "May",
    revenue: 1890,
  },
  {
    name: "Jun",
    revenue: 2390,
  },
  {
    name: "Jul",
    revenue: 3490,
  },
];

const radarData = [
  { subject: 'Sales', A: 120, fullMark: 150 },
  { subject: 'Marketing', A: 98, fullMark: 150 },
  { subject: 'Development', A: 86, fullMark: 150 },
  { subject: 'Customer Support', A: 99, fullMark: 150 },
  { subject: 'IT', A: 85, fullMark: 150 },
  { subject: 'Admin', A: 65, fullMark: 150 },
];

export const ChartCard: React.FC = () => {
  return (
    <div className="h-full space-y-6">
      
      <div className="h-[300px] animate-fade-in">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="rgba(0,0,0,0.1)" />
            <PolarAngleAxis 
              dataKey="subject" 
              stroke="rgba(0,0,0,0.5)"
              tick={{ fill: 'rgba(0,0,0,0.7)', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 150]} 
              stroke="rgba(0,0,0,0.1)"
              tick={{ fill: 'rgba(0,0,0,0.5)', fontSize: 10 }}
            />
            <Radar
              name="Performance"
              dataKey="A"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
              animationDuration={1500}
              animationBegin={0}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="p-3 shadow-lg border border-gray-100 bg-white/95 backdrop-blur-sm">
                      <p className="text-sm font-medium text-gray-800">{payload[0].payload.subject}</p>
                      <p className="text-sm text-blue-600 font-medium">
                        {payload[0].value} / {payload[0].payload.fullMark}
                      </p>
                    </Card>
                  );
                }
                return null;
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 