/* eslint-disable @typescript-eslint/no-unused-vars */

import { Home, BarChart2,  ChevronLeft, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: BarChart2, label: 'Components', path: '/components' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

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
      <nav className="flex flex-col h-[calc(100%-8rem)]">
        <div className="flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg w-full transition-colors ${
                isOpen ? 'px-4 py-3' : 'p-3 justify-center'
              } ${location.pathname === item.path ? 'bg-gray-800 text-white' : ''}`}
              title={!isOpen ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg w-full transition-colors ${
            isOpen ? 'px-4 py-3' : 'p-3 justify-center'
          }`}
          title={!isOpen ? 'Logout' : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {isOpen && <span>Logout</span>}
        </button>
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