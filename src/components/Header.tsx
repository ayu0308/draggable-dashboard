import { Search, User, LogOut, ChevronDown, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Then check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    // Apply the theme class to the document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save the theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className=" dark:bg-gray-800 h-16 px-6 flex items-center justify-between border-b dark:border-gray-700 shadow-sm z-10 relative">
      <div className="flex items-center flex-1 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border dark:border-gray-600 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <span className="text-sm font-medium dark:text-white">
              {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}
            </span>
            <div className="flex items-center gap-1">
              <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-700">
                <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </div>
              <ChevronDown className={`h-4 w-4 text-gray-600 dark:text-gray-300 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>
          
          {isProfileOpen && (
            <div className="z-50 absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
              <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b dark:border-gray-700">
                <p className="font-medium cursor-pointer">
                  {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-gray-500 dark:text-gray-400 cursor-pointer">{currentUser?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center cursor-pointer gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;