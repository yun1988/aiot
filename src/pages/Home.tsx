import React, { useState, useEffect } from 'react';
import { 
  FiThermometer, FiDroplet, FiWind, FiSun, FiMoon, FiHome, FiUsers, FiClock, 
  FiZap, FiWifi, FiSettings, FiSearch, FiToggleLeft, FiToggleRight, FiChevronRight,
  FiCheckCircle, FiAlertCircle, FiBattery, FiCpu, FiHardDrive, FiTrendingUp
} from 'react-icons/fi';
import { 
  deviceAPI, hubAPI, roomAPI, eventAPI, systemAPI,
  Device, Hub, RoomStats, Event, SystemStats
} from '../services/api';

const Dashboard: React.FC = () => {
  // 狀態管理
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [standaloneDevices, setStandaloneDevices] = useState<Device[]>([]);
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [rooms, setRooms] = useState<RoomStats[]>([]);
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 載入數據
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 並行載入所有數據
        const [statsData, standaloneData, hubsData, roomsData, eventsData] = await Promise.all([
          systemAPI.getOverallStats(),
          deviceAPI.getStandalone(),
          hubAPI.getAll(),
          roomAPI.getStats(),
          eventAPI.getRecent(4)
        ]);

        setSystemStats(statsData);
        setStandaloneDevices(standaloneData);
        setHubs(hubsData);
        setRooms(roomsData);
        setRecentEvents(eventsData);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
        setError('載入數據失敗，請稍後重試');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // 載入中狀態
  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">載入中...</div>
        </div>
      </div>
    );
  }

  // 錯誤狀態
  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  // 天氣卡片組件
  const WeatherCard = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">今日天氣</h3>
        <FiSun className="text-2xl text-yellow-500" />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-800">24°C</span>
          <span className="text-sm text-gray-600">晴朗</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-1">
            <FiDroplet className="text-blue-500" />
            <span>65%</span>
          </div>
          <div className="flex items-center space-x-1">
            <FiWind className="text-gray-500" />
            <span>12 km/h</span>
          </div>
          <div className="flex items-center space-x-1">
            <FiThermometer className="text-red-500" />
            <span>28°/18°</span>
          </div>
        </div>
      </div>
    </div>
  );

  // 系統統計組件
  const OverallStats = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">系統總覽</h3>
        <FiHome className="text-2xl text-blue-500" />
      </div>
      {systemStats && (
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{systemStats.totalDevices}</div>
            <div className="text-sm text-gray-600">設備</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{systemStats.totalHubs}</div>
            <div className="text-sm text-gray-600">網關</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{systemStats.totalSchedules}</div>
            <div className="text-sm text-gray-600">排程</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{systemStats.todayTasks}</div>
            <div className="text-sm text-gray-600">今日執行任務</div>
          </div>
        </div>
      )}
    </div>
  );

  // 快速控制組件
  const QuickControls = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">快速控制場景</h3>
        <FiZap className="text-2xl text-yellow-500" />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
          <span className="font-medium text-red-800">全部電源</span>
          <FiToggleLeft className="text-2xl text-red-600 cursor-pointer hover:text-red-700" />
        </div>
        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
          <span className="font-medium text-red-800">全部燈光</span>
          <FiToggleLeft className="text-2xl text-red-600 cursor-pointer hover:text-red-700" />
        </div>
        <div className="text-xs text-red-600 mt-2">
          主控開關 - 一鍵關閉所有設備
        </div>
      </div>
    </div>
  );

  // 獨立設備組件
  const StandaloneDevices = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">獨立連接設備</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">查看全部</button>
      </div>
      
      <div className="mb-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜尋設備..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {standaloneDevices.slice(0, 4).map((device) => (
          <div key={device.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="text-sm text-gray-600">
                {device.status === 'on' || device.status === 'active' ? '開啟' : '關閉'}
              </div>
              <div className="cursor-pointer">
                {device.status === 'on' || device.status === 'active' ? (
                  <FiToggleRight className="text-2xl text-green-500" />
                ) : (
                  <FiToggleLeft className="text-2xl text-gray-400" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-center mb-3">
              <div className="text-3xl text-blue-500">
                {getDeviceIcon(device.icon)}
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-800">{device.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 智能網關組件
  const SmartGateways = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">智能網關</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">查看全部</button>
      </div>
      
      <div className="space-y-4">
        {hubs.map((hub) => (
          <div key={hub.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiCpu className="text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">{hub.name}</div>
                  <div className="text-sm text-gray-600">{hub.brand} • {hub.protocol}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${hub.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">{hub.status === 'online' ? '在線' : '離線'}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>設備: {hub.deviceCount}</span>
              <span>運行: {hub.uptime}</span>
              <span>版本: {hub.version}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 房間組件
  const Rooms = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">房間</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">查看全部</button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {rooms.slice(0, 4).map((room) => (
          <div key={room.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl">{getDeviceIcon(room.icon)}</div>
              <div className="text-sm text-gray-600">{room.deviceCount}個設備</div>
            </div>
            <div className="mb-2">
              <div className="font-medium text-gray-800">{room.name}</div>
              <div className="text-sm text-gray-600">{room.status}</div>
            </div>
            <div className="text-sm text-gray-600">
              {room.temperature}°C • {room.humidity}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 近期活動組件
  const RecentActivities = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">近期活動</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">查看全部</button>
      </div>
      
      <div className="space-y-3">
        {recentEvents.map((event) => (
          <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
            <div className={`p-2 rounded-lg ${event.bgColor}`}>
              {getEventIcon(event.icon, event.color)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800">{event.title}</div>
              <div className="text-sm text-gray-600">{event.description}</div>
              <div className="text-xs text-gray-500 mt-1">
                {formatEventTime(event.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 智能場景控制組件
  const SmartSceneControl = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">智能場景控制</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">查看全部</button>
      </div>
      
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">8</div>
          <div className="text-xs text-gray-600">排程任務</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">5</div>
          <div className="text-xs text-gray-600">條件觸發</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">3</div>
          <div className="text-xs text-gray-600">場景模式</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{systemStats?.todayTasks || 0}</div>
          <div className="text-xs text-gray-600">今日執行</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FiSun className="text-yellow-500" />
              <div>
                <div className="font-medium text-gray-800">早安場景</div>
                <div className="text-sm text-gray-600">每日 7:00 自動執行</div>
              </div>
            </div>
            <FiChevronRight className="text-gray-400" />
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FiMoon className="text-blue-500" />
              <div>
                <div className="font-medium text-gray-800">睡眠模式</div>
                <div className="text-sm text-gray-600">22:00 + 感測器觸發</div>
              </div>
            </div>
            <FiChevronRight className="text-gray-400" />
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FiHome className="text-green-500" />
              <div>
                <div className="font-medium text-gray-800">離家模式</div>
                <div className="text-sm text-gray-600">地理圍欄觸發</div>
              </div>
            </div>
            <FiChevronRight className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );

  // 工具函數
  const getDeviceIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'FiZap': <FiZap />,
      'FiThermometer': <FiThermometer />,
      'FiDroplet': <FiDroplet />,
      'FiWifi': <FiWifi />,
      'FiSettings': <FiSettings />,
      'FiHome': <FiHome />,
      'FiUsers': <FiUsers />,
      'FiClock': <FiClock />,
      'FiCpu': <FiCpu />,
      'FiHardDrive': <FiHardDrive />,
      'FiBattery': <FiBattery />,
      '🏠': '🏠',
      '🛏️': '🛏️',
      '🍳': '🍳',
      '📚': '📚',
      '🍽️': '🍽️',
      '🚪': '🚪',
      '🚶': '🚶',
      '🌿': '🌿'
    };
    return iconMap[iconName] || <FiSettings />;
  };

  const getEventIcon = (iconName: string, colorClass: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'FiAlertCircle': <FiAlertCircle className={colorClass} />,
      'FiCheckCircle': <FiCheckCircle className={colorClass} />,
      'FiUsers': <FiUsers className={colorClass} />,
      'FiWifi': <FiWifi className={colorClass} />,
      'FiClock': <FiClock className={colorClass} />,
      'FiBattery': <FiBattery className={colorClass} />
    };
    return iconMap[iconName] || <FiSettings className={colorClass} />;
  };

  const formatEventTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}分鐘前`;
    } else if (hours < 24) {
      return `${hours}小時前`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}天前`;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-12 gap-6">
        {/* 左側欄位 (3列) */}
        <div className="col-span-3 space-y-6">
          <WeatherCard />
          <OverallStats />
          <QuickControls />
        </div>

        {/* 中間欄位 (5列) */}
        <div className="col-span-5 space-y-6">
          <StandaloneDevices />
          <SmartGateways />
        </div>

        {/* 右側欄位 (4列) */}
        <div className="col-span-4 space-y-6">
          <Rooms />
          <RecentActivities />
          <SmartSceneControl />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;