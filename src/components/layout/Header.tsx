import React from 'react';
import { FiMenu, FiBell, FiChevronDown, FiUser } from 'react-icons/fi';
import { useAuth } from 'context/AuthContext';
import SmartHomeLogo from 'components/ui/SmartHomeLogo';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white flex items-center justify-between px-2 shadow-sm">
      {/* Left side: Brand Logo and Toggle button */}
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-800 lg:hidden ml-2">
          <FiMenu className="h-6 w-6" />
        </button>

        {/* Brand Logo - 只在桌面版顯示，向左偏移 */}
        <div className="hidden lg:block ml-8">
          <SmartHomeLogo variant="brand-inline" size={48} />
        </div>
      </div>

      {/* Right side: Icons and User profile */}
      <div className="flex items-center space-x-6 mr-4">
        <button className="relative p-2 bg-gradient-to-br from-cyan-50 to-cyan-100 hover:from-cyan-100 hover:to-cyan-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group">
          <FiBell className="h-5 w-5 text-cyan-600 group-hover:text-cyan-700 transition-colors duration-200" />
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
            <span className="text-xs font-bold text-white">3</span>
          </span>
        </button>

        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <FiUser className="h-6 w-6 text-gray-600" />
          </div>
          <span className="font-semibold text-sm text-gray-700">{user?.name || 'yun'}</span>
          <FiChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default Header;