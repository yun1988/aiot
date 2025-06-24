import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  RiDashboardLine, RiPieChartLine, RiComputerLine, RiSettings3Line, RiBarChartLine, RiInformationLine, RiLogoutBoxRLine, RiMenuFoldLine, RiMenuUnfoldLine, RiFlashlightFill, RiHomeLine 
} from 'react-icons/ri';
import { useAuth } from 'context/AuthContext';
import SmartHomeLogo from 'components/ui/SmartHomeLogo';

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

      <aside className={`fixed top-0 left-0 h-full bg-white flex flex-col shadow-lg transition-all duration-300 z-40 ${isSidebarOpen ? 'w-52' : 'w-16'} transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-hidden`}>
        <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center h-16">
            {isSidebarOpen ? (
                <div className="w-full px-4">
                  <Link to="/dashboard" className="flex items-center h-12 px-4 rounded-lg relative">
                                          <div className="w-6 flex items-center justify-center">
                        <div className="bg-primary p-1 rounded-lg">
                          <SmartHomeLogo variant="icon" size={20} className="text-white" />
                        </div>
                      </div>
                                          <div className="overflow-hidden">
                        <span className={`ml-3 text-lg font-semibold whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} block`}>Smart Home</span>
                      </div>
                  </Link>
                </div>
              ) : (
                <div className="w-16 flex items-center justify-center">
                  <Link to="/dashboard" className="bg-primary p-1 rounded-lg flex items-center justify-center">
                    <SmartHomeLogo variant="icon" size={20} className="text-white" />
                  </Link>
                </div>
              )}
          </div>



          <nav className={`flex-1 flex flex-col items-center`}>
            {isSidebarOpen ? (
              <ul className="w-full space-y-1 px-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`flex items-center h-12 px-4 rounded-lg transition-colors duration-200 group ${isActive(item.path) ? 'text-primary font-semibold' : 'text-gray-500 hover:text-primary hover:bg-primary/10'}`}
                    >
                      <div className="w-6 flex items-center justify-center">
                        <item.icon className="h-6 w-6 flex-shrink-0" />
                      </div>
                      <div className="overflow-hidden">
                        <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} block`}>{item.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-2 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center justify-center w-12 h-12 rounded-lg transition-colors duration-200 group ${isActive(item.path) ? 'text-primary font-semibold bg-primary/10' : 'text-gray-500 hover:text-primary hover:bg-primary/10'}`}
                  >
                    <item.icon className="h-6 w-6 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            )}
          </nav>

          <div className={`py-4 ${isSidebarOpen ? 'px-4 space-y-2' : 'flex flex-col items-center space-y-2'}`}>
            {isSidebarOpen ? (
              <>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="w-full flex items-center px-4 h-12 rounded-lg transition-colors duration-200 group bg-primary/10 text-primary font-semibold"
                >
                                      <div className="w-6 flex items-center justify-center">
                      <RiMenuFoldLine className="h-6 w-6 flex-shrink-0" />
                    </div>
                    <div className="overflow-hidden">
                      <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} block`}>收合</span>
                    </div>
                </button>

                <Link
                  to="/about"
                  className={`flex items-center w-full px-4 h-12 rounded-lg transition-colors duration-200 group ${isActive('/about') ? 'text-primary font-semibold' : 'text-gray-500 hover:text-primary hover:bg-primary/10'}`}
                >
                                      <div className="w-6 flex items-center justify-center">
                      <RiInformationLine className="h-6 w-6 flex-shrink-0" />
                    </div>
                    <div className="overflow-hidden">
                      <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} block`}>關於</span>
                    </div>
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center px-4 h-12 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 group"
                >
                                      <div className="w-6 flex items-center justify-center">
                      <RiLogoutBoxRLine className="h-6 w-6 flex-shrink-0" />
                    </div>
                    <div className="overflow-hidden">
                      <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} block`}>登出</span>
                    </div>
                </button>
              </>
            ) : (
              <>
                <div className="px-2 space-y-1">
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="flex items-center justify-center w-12 h-12 rounded-lg transition-colors duration-200 group text-gray-500 hover:text-primary hover:bg-primary/10"
                  >
                    <RiMenuUnfoldLine className="h-6 w-6 flex-shrink-0" />
                  </button>

                  <Link
                    to="/about"
                    className={`flex items-center justify-center w-12 h-12 rounded-lg transition-colors duration-200 group ${isActive('/about') ? 'text-primary font-semibold bg-primary/10' : 'text-gray-500 hover:text-primary hover:bg-primary/10'}`}
                  >
                    <RiInformationLine className="h-6 w-6 flex-shrink-0" />
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center justify-center w-12 h-12 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 group"
                  >
                    <RiLogoutBoxRLine className="h-6 w-6 flex-shrink-0" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>
    </Fragment>
  );
};

export default Sidebar; 