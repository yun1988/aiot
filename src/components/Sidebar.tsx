import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  RiDashboardLine, RiPieChartLine, RiComputerLine, RiSettings3Line, RiBarChartLine, RiInformationLine, RiLogoutBoxRLine, RiMenuFoldLine, RiMenuUnfoldLine, RiFlashlightFill 
} from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { icon: RiDashboardLine, name: '儀表板', path: '/dashboard' },
    { icon: RiPieChartLine, name: '房間', path: '/rooms' },
    { icon: RiComputerLine, name: '設備', path: '/devices' },
    { icon: RiSettings3Line, name: '設定', path: '/settings' },
    { icon: RiBarChartLine, name: '分析', path: '/analytics' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Fragment>
       <div 
        className={`fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      ></div>

      <aside className={`fixed top-0 left-0 h-full bg-white flex flex-col shadow-lg transition-all duration-300 z-40 ${isSidebarOpen ? 'w-60' : 'w-20'} transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center p-4 h-20">
            <div
              className={`flex items-center gap-5`}
            >
              <div className="bg-primary p-2 rounded-lg">
                <RiFlashlightFill className="text-white text-2xl" />
              </div>
              {isSidebarOpen && (
                <span className="text-xl font-bold">AIoT</span>
              )}
            </div>
          </div>

          <hr className="mx-4 border-gray-200" />

          <nav className="flex-1 px-4 mt-4">
            <ul>
              {navItems.map((item) => (
                <li key={item.name} className="mb-2">
                  <Link
                    to={item.path}
                    className={`flex items-center py-3 rounded-lg transition-colors duration-200 group ${isSidebarOpen ? 'px-4' : 'justify-center'} ${isActive(item.path) ? 'text-primary font-semibold' : 'text-gray-500 hover:text-primary hover:bg-primary/10'}`}
                  >
                    <item.icon className="h-6 w-6 flex-shrink-0" />
                    <span className={`ml-4 text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-4 py-6 space-y-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`w-full flex items-center py-3 rounded-lg transition-colors duration-200 group ${isSidebarOpen ? 'px-4 bg-primary/10 text-primary font-semibold' : 'justify-center text-gray-500 hover:text-primary hover:bg-primary/10'}`}
            >
              {isSidebarOpen ? <RiMenuFoldLine className="h-6 w-6 flex-shrink-0" /> : <RiMenuUnfoldLine className="h-6 w-6 flex-shrink-0" />}
              <span className={`ml-4 text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>收合</span>
            </button>
            <hr className="mx-4 border-gray-200" />
             <Link
                to="/about"
                className={`flex items-center py-3 rounded-lg transition-colors duration-200 group ${isSidebarOpen ? 'px-4' : 'justify-center'} ${isActive('/about') ? 'text-primary font-semibold' : 'text-gray-500 hover:text-primary hover:bg-primary/10'}`}
              >
                <RiInformationLine className="h-6 w-6 flex-shrink-0" />
                <span className={`ml-4 text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>關於</span>
              </Link>
            <button
              onClick={logout}
              className={`w-full flex items-center py-3 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 group ${isSidebarOpen ? 'px-4' : 'justify-center'}`}
            >
              <RiLogoutBoxRLine className="h-6 w-6 flex-shrink-0" />
              <span className={`ml-4 text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>登出</span>
            </button>
          </div>
        </div>
      </aside>
    </Fragment>
  );
};

export default Sidebar; 