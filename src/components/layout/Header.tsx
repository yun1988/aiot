import React from 'react';
import { FiMenu, FiBell, FiChevronDown, FiUser } from 'react-icons/fi';
import { useAuth } from 'context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">
      {/* Left side: Toggle button for mobile */}
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-800 lg:hidden">
          <FiMenu className="h-6 w-6" />
        </button>
      </div>

      {/* Right side: Icons and User profile */}
      <div className="flex items-center space-x-6">
        <button className="text-gray-500 hover:text-gray-800 relative">
          <FiBell className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <FiUser className="h-6 w-6 text-gray-600" />
          </div>
          <span className="font-semibold text-sm text-gray-700">{user?.name || 'Alex John'}</span>
          <FiChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default Header; 