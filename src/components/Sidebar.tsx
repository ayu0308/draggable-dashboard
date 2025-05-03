
import { Home, Users, Settings, BarChart2, Mail, Bell, ChevronLeft } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: BarChart2, label: 'Analytics' },
    { icon: Users, label: 'Customers' },
    { icon: Mail, label: 'Messages' },
    { icon: Bell, label: 'Notifications' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div 
      className={`fixed left-0 h-screen bg-gray-900 text-white p-4 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className={`flex items-center gap-2 mb-8 px-2 ${!isOpen && 'justify-center'}`}>
        <BarChart2 className="h-8 w-8 text-blue-500 shrink-0" />
        {isOpen && <span className="text-xl font-bold">Analytics Pro</span>}
      </div>
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg w-full transition-colors ${
              isOpen ? 'px-4 py-3' : 'p-3 justify-center'
            }`}
            title={!isOpen ? item.label : undefined}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {isOpen && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
      <button
        onClick={onToggle}
        className={`absolute top-[4%] -right-3 cursor-pointer bg-gray-900 text-white p-1 rounded-full hover:bg-gray-800 transition-transform ${
          !isOpen && 'rotate-180'
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Sidebar;