import { Home, BarChart2, ChevronLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/dashform_blue_icon.png';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: BarChart2, label: 'Forms', path: '/forms' },
  ];

  return (
    <div 
      className={`fixed left-0 h-screen bg-gray-900 text-white p-4 transition-all duration-300 z-30 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className={`flex items-center gap-3 mb-8 ${!isOpen ? 'justify-center' : 'px-2'}`}>
        <img 
          src={logo} 
          alt="DashForm Logo" 
          className={`h-10 w-10 object-contain transition-all duration-300 ${
            isOpen ? 'h-10 w-10' : 'h-8 w-8'
          }`}
        />
        {isOpen && (
          <span className="text-xl font-bold whitespace-nowrap overflow-hidden">
            DashForm
          </span>
        )}
      </div>
      <nav className="flex flex-col h-[calc(100%-8rem)]">
        <div className="flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center mb-1 gap-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg w-full transition-colors ${
                isOpen ? 'px-3 py-2' : 'p-2 justify-center'
              } ${location.pathname === item.path ? 'bg-gray-800 text-white' : ''}`}
              title={!isOpen ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
      </nav>
      <button
        onClick={onToggle}
        className={`z-10 absolute top-[4%] -right-3 cursor-pointer bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-md border border-gray-200 dark:border-gray-700 ${
          !isOpen && 'rotate-180'
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Sidebar;