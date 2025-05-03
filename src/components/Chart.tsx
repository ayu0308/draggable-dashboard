
import { BarChart2 } from 'lucide-react';

const Chart = () => {
  return (
    // <div className="bg-white p-6 rounded-xl shadow-sm">
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Revenue Overview</h3>
        <select className="text-sm border rounded-lg px-3 py-2">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>
      <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
        <div className="text-center text-gray-500">
          <BarChart2 className="h-12 w-12 mx-auto mb-2 text-gray-400" />
          <p>Chart placeholder</p>
          <p className="text-sm">Add your preferred charting library here</p>
        </div>
      </div>
      
    </>
    // </div>
  );
};

export default Chart;