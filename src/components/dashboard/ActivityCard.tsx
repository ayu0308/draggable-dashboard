import { Users } from "lucide-react";

export const ActivityCard: React.FC = () => {
  return (
    <div>
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
    </div>
  );
}; 