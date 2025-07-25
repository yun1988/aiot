import React, { useState, useEffect } from 'react';
import { IconType } from 'react-icons';
import { 
  FiCloud, FiWind, FiCpu, FiUsers, FiHardDrive, FiSun, FiThermometer, FiZap, FiPlus, 
  FiSearch, FiWifi, FiBattery, FiMoreVertical, FiChevronRight, FiChevronLeft, FiMapPin,
  FiHome, FiActivity, FiSettings, FiAlertCircle, FiCheckCircle, FiClock, FiShield, FiBookOpen,
  FiLock, FiCamera, FiMoon
} from 'react-icons/fi';
import { IoBedOutline } from 'react-icons/io5';
import { MdOutlineKitchen } from 'react-icons/md';
import { BsDropletFill, BsSnow, BsCloudSun } from 'react-icons/bs';
import { FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';
import { RiInputMethodLine, RiFlowChart, RiDeviceLine, RiCalendarScheduleLine } from 'react-icons/ri';
import { MdOutlineDeviceHub } from 'react-icons/md';

interface StatCardProps {
  icon: IconType;
  title: string;
  value: string;
  change: string;
  color: string;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, change, color, bgColor }) => (
  <div className={`p-4 rounded-2xl flex flex-col items-center justify-center ${bgColor}`}>
    <div className={`p-3 rounded-full mb-3 ${color} bg-white shadow-sm`}>
      <Icon className={`h-6 w-6 ${color}`} />
    </div>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-xs font-medium text-gray-700 mt-2 text-center whitespace-nowrap">{title}</p>
    <p className="text-xs text-gray-500 mt-1 whitespace-nowrap">{change}</p>
  </div>
);

interface DataChipProps {
  icon?: IconType;
  value: string;
  unit: string;
}

const DataChip: React.FC<DataChipProps> = ({ icon: Icon, value, unit }) => (
  <div className="bg-primary/10 p-2 text-center rounded-lg flex flex-col justify-center items-center h-full">
    {Icon && <Icon className="mx-auto mb-1 text-primary" size={20} />}
    <p className="font-bold text-gray-800 text-sm">{value}</p>
    {unit && <p className="text-xs text-gray-500">{unit}</p>}
  </div>
);

interface TemperatureTrackerCardProps {
  name: string;
  id: string;
}

const TemperatureTrackerCard: React.FC<TemperatureTrackerCardProps> = ({ name, id }) => (
  <div className="bg-slate-50 p-4 rounded-xl">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="font-semibold text-gray-700">{name}</p>
        <p className="text-sm text-gray-600">Device {id}</p>
      </div>
      <div className="flex items-center space-x-2 text-gray-500">
        <FiWifi size={14} />
        <FiBattery size={14} />
      </div>
    </div>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
          <p className="font-bold text-primary text-xs">100%</p>
        </div>
        <div>
            <p className="font-semibold text-gray-700 text-sm">Device {id}</p>
            <p className="text-xs text-gray-400">Battery Health</p>
        </div>
      </div>
       <div className="w-14 h-14 bg-slate-200 rounded-lg shrink-0"></div> {/* Image Placeholder */}
    </div>
    <div className="grid grid-cols-4 gap-2">
        <DataChip value="76.1" unit="°F" />
        <DataChip icon={BsSnow} value="4" unit="°C" />
        <DataChip icon={BsDropletFill} value="51.1" unit="" />
        <DataChip value="100" unit="ppm" />
    </div>
    <div className="flex justify-center items-center mt-3 space-x-1">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
    </div>
  </div>
);

// Counter Animation Hook
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [end, duration]);

  return count;
};

// Weather Card Component
const WeatherCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div 
      className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg min-h-[280px] flex flex-col justify-between cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="font-bold text-lg">週一</p>
          <p className="text-sm opacity-80">2024年7月22日</p>
        </div>
        <div className={`transform transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`}>
          <FiSettings className="h-5 w-5 opacity-70" />
        </div>
      </div>
      
      <div className="text-center my-6">
        <div className={`transform transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
          <BsCloudSun className="h-16 w-16 text-white/80 mx-auto mb-2" />
        </div>
        <p className="text-3xl font-bold">32°C</p>
        <div className="flex items-center justify-center space-x-1 mt-2">
          <FiMapPin className="h-4 w-4" />
          <p className="font-medium text-sm">台北市</p>
        </div>
      </div>

      {showDetails && (
        <div className="mb-4 space-y-2 animate-fade-in">
          <div className="flex justify-between text-xs opacity-90">
            <span>體感溫度</span>
            <span>35°C</span>
          </div>
          <div className="flex justify-between text-xs opacity-90">
            <span>紫外線指數</span>
            <span>中等</span>
          </div>
          <div className="flex justify-between text-xs opacity-90">
            <span>能見度</span>
            <span>10km</span>
          </div>
        </div>
      )}
      
      <div className="flex justify-between text-sm">
        <div className="flex items-center space-x-2">
          <BsDropletFill className={`transform transition-transform duration-300 ${isHovered ? 'scale-125' : ''}`} />
          <span>48% 濕度</span>
        </div>
        <div className="flex items-center space-x-2">
          <FiWind className={`transform transition-transform duration-300 ${isHovered ? 'scale-125' : ''}`} />
          <span>11.02 風速</span>
        </div>
      </div>
    </div>
  );
};

// Overall Stats Component
const OverallStats = () => {
  const deviceCount = useCountUp(18, 1500);
  const scheduleCount = useCountUp(8, 1800);
  const gatewayCount = useCountUp(3, 1200);
  const executedCount = useCountUp(6, 2000);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm min-h-[200px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800">系統總覽</h3>
        <div className="flex items-center space-x-2 bg-cyan-50 px-3 py-2 rounded-lg">
          <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
            <FiCheckCircle className="h-4 w-4 text-white" />
          </div>
          <p className="text-sm font-medium text-cyan-700">本日已執行 <span className="text-lg font-bold text-cyan-800">{executedCount}</span></p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center group cursor-pointer">
          <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
            <RiDeviceLine className="h-6 w-6 text-cyan-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{deviceCount}</p>
          <p className="text-xs text-gray-600">設備</p>
        </div>
        <div className="text-center group cursor-pointer">
          <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
            <RiCalendarScheduleLine className="h-6 w-6 text-cyan-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{scheduleCount}</p>
          <p className="text-xs text-gray-600">排程</p>
        </div>
        <div className="text-center group cursor-pointer">
          <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
            <MdOutlineDeviceHub className="h-6 w-6 text-cyan-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{gatewayCount}</p>
          <p className="text-xs text-gray-600">網關</p>
        </div>
      </div>
    </div>
  );
};

// Quick Controls Component
const QuickControls = () => {
  const [deviceStates, setDeviceStates] = useState<Record<string, boolean>>({
    '全部燈光': true,
    '全部電源': true,
    '離家模式': false,
    '睡眠模式': false,
  });

  const quickDevices = [
    { name: '全部燈光', icon: FiSun, status: '開啟', type: 'master' },
    { name: '全部電源', icon: FiZap, status: '開啟', type: 'master' },
    { name: '離家模式', icon: FiShield, status: '關閉', type: 'scene' },
    { name: '睡眠模式', icon: FiMoon, status: '關閉', type: 'scene' },
  ];

  const handleToggle = (deviceName: string) => {
    setDeviceStates(prev => ({ ...prev, [deviceName]: !prev[deviceName] }));
  };

  const handleMasterControl = (controlType: string) => {
    const newState = !deviceStates[controlType];
    setDeviceStates(prev => ({ ...prev, [controlType]: newState }));
    
    // 顯示操作提示
    const action = newState ? '開啟' : '關閉';
    let target = '';
    
    switch(controlType) {
      case '全部電源':
        target = '所有電源設備';
        break;
      case '全部燈光':
        target = '所有燈光設備';
        break;
      case '離家模式':
        target = '離家安全模式';
        break;
      case '睡眠模式':
        target = '睡眠環境模式';
        break;
    }
    
    console.log(`${action} ${target}`);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-[420px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800">快速控制場景</h3>
        <a href="#" className="text-sm text-primary font-medium">更多場景</a>
      </div>
      <div className="space-y-5 flex-1 overflow-y-auto">
        {quickDevices.slice(0, 4).map(device => {
          const isOn = deviceStates[device.name];
          const Icon = device.icon;
          const isMasterControl = device.type === 'master';
          const isScene = device.type === 'scene';
          
          return (
            <div key={device.name} className={`flex items-center justify-between p-3 rounded-xl group ${
              isMasterControl ? 'bg-cyan-50 border border-cyan-100' : 
              isScene ? 'bg-cyan-50 border border-cyan-100' : 'bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                  isOn ? (isMasterControl ? 'bg-cyan-500 text-white' : 
                         isScene ? 'bg-cyan-500 text-white' : 'bg-primary text-white') : 'bg-gray-300 text-gray-600'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className={`font-medium ${
                    isMasterControl ? 'text-cyan-700' : 
                    isScene ? 'text-cyan-700' : 'text-gray-800'
                  }`}>
                    {device.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isOn ? device.status : (isMasterControl ? '全部關閉' : '關閉')}
                  </p>
                </div>
              </div>
        <button
                onClick={() => handleMasterControl(device.name)}
                className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors ${
                  isOn ? (isMasterControl ? 'bg-cyan-500 justify-end' : 
                         isScene ? 'bg-cyan-500 justify-end' : 'bg-primary justify-end') : 'bg-gray-200 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
        </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};

// Connected Standalone Devices Component
const ConnectedStandalone = () => {
  const standaloneDevices = [
    { name: '智慧門鎖', status: '已鎖定', battery: '85%', icon: FiLock, color: 'green' },
    { name: '煙霧偵測器', status: '正常', battery: '92%', icon: FiAlertCircle, color: 'green' },
    { name: '智慧攝影機', status: '錄影中', battery: '78%', icon: FiCamera, color: 'blue' },
    { name: '溫濕度感測器', status: '24°C 65%', battery: '88%', icon: FiThermometer, color: 'orange' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-[480px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800">獨立連接設備</h3>
        <a href="#" className="text-sm text-primary font-medium">查看全部</a>
      </div>
      <div className="relative mb-4">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="搜尋設備..." className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 focus:outline-none"/>
      </div>
      <div className="space-y-3">
        {standaloneDevices.map((device, index) => {
          const Icon = device.icon;
          const colorClass = 'bg-cyan-500 text-white';
          return (
            <div key={index} className="flex items-center justify-between p-4 bg-cyan-50 rounded-xl hover:bg-cyan-100 cursor-pointer group">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">{device.name}</p>
                  <p className="text-sm text-gray-500">{device.status}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">{device.battery}</p>
                <div className="flex items-center space-x-1">
                  <FiBattery className="h-3 w-3 text-cyan-500" />
                  <FiWifi className="h-3 w-3 text-green-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Connected Hubs Component
const ConnectedHubs = () => {
  const hubDevices = [
    { 
      name: 'Home Assistant', 
      brand: 'HA Core', 
      status: '6個設備', 
      version: 'v2024.7.2', 
      icon: FiHome,
      protocol: 'HTTP/MQTT',
      uptime: '7天 14小時'
    },
    { 
      name: 'Tuya Gateway', 
      brand: 'Smart Life', 
      status: '4個設備', 
      version: 'v3.2.1', 
      icon: FiWifi,
      protocol: 'Zigbee 3.0',
      uptime: '3天 8小時'
    },
    { 
      name: 'Philips Hue Bridge', 
      brand: 'Philips', 
      status: '4個燈具', 
      version: 'v1.56.0', 
      icon: FiZap,
      protocol: 'Zigbee Light',
      uptime: '15天 2小時'
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-[480px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800">智能網關</h3>
        <a href="#" className="text-sm text-primary font-medium">查看全部</a>
      </div>
      <div className="relative mb-4">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="搜尋網關..." className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 focus:outline-none"/>
      </div>
      
      <div className="space-y-3 flex-1">
        {hubDevices.map((hub, index) => {
          const Icon = hub.icon;
          return (
            <div key={index} className="flex items-center justify-between p-4 bg-cyan-50 rounded-xl hover:bg-cyan-100 cursor-pointer transition-colors group">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">{hub.name}</p>
                  <p className="text-xs text-gray-500">{hub.brand}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full">
                      {hub.protocol}
                    </span>
                    <span className="text-xs text-gray-400">
                      {hub.version}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">{hub.status}</p>
                <p className="text-xs text-gray-400 mt-1">運行 {hub.uptime}</p>
                <div className="flex items-center justify-end space-x-1 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">線上</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      

    </div>
  );
};

// Rooms Component  
const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(0);
  
  const rooms = [
    { name: '客廳', devices: 5, icon: FiHome, status: '3個開啟', temperature: '24°C' },
    { name: '臥室', devices: 4, icon: IoBedOutline, status: '2個開啟', temperature: '22°C' },
    { name: '廚房', devices: 3, icon: MdOutlineKitchen, status: '1個開啟', temperature: '26°C' },
    { name: '書房', devices: 2, icon: FiBookOpen, status: '全部關閉', temperature: '23°C' },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-3">
          <h3 className="font-bold text-lg text-gray-800">房間</h3>
          <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs font-medium rounded-full">
            {rooms.length} 間
          </span>
        </div>
        <a href="#" className="text-sm text-primary font-medium">查看全部</a>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {rooms.map((room, index) => {
          const Icon = room.icon;
          const isSelected = selectedRoom === index;
          return (
            <div 
              key={room.name} 
              onClick={() => setSelectedRoom(index)}
              className={`p-3 rounded-xl cursor-pointer transition-all h-24 group ${
                isSelected ? 'bg-primary/10 border-2 border-primary' : 'bg-slate-50 hover:bg-slate-100'
              }`}
            >
              {/* 頂部：Icon 左上 + 名稱右上 */}
              <div className="flex justify-between items-start mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                  isSelected ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <p className={`font-semibold text-sm ${
                  isSelected ? 'text-primary' : 'text-gray-800'
                }`}>
                  {room.name}
                </p>
              </div>

              {/* 底部：設備數量左下 + 狀態和溫度右下 */}
              <div className="flex justify-between items-end">
                <p className="text-xs text-gray-500">{room.devices} 個設備</p>
                <div className="text-right">
                  <p className={`text-xs font-medium ${
                    room.status.includes('關閉') ? 'text-gray-600' : 'text-green-600'
                  }`}>
                    {room.status}
                  </p>
                  <p className="text-xs font-medium text-gray-700">{room.temperature}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

// Automation Stats Component
const AutomationStats = () => {
  const [activeScene, setActiveScene] = useState<string | null>('回家模式');
  const availableScenes = useCountUp(4, 1200);
  const activeSceneCount = useCountUp(1, 800);
  const controlDevices = useCountUp(18, 1500);

  const scenes = [
    {
      name: '回家模式',
      icon: FiHome,
      color: 'bg-cyan-500',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-700',
      isActive: activeScene === '回家模式',
      description: '自動調整燈光和溫度',
      deviceCount: 8,
      lastActive: '剛才'
    },
    {
      name: '娛樂模式',
      icon: FiActivity,
      color: 'bg-cyan-500',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-700',
      isActive: activeScene === '娛樂模式',
      description: '調暗燈光，啟動音響',
      deviceCount: 5,
      lastActive: '昨天 20:30'
    },
    {
      name: '工作模式',
      icon: FiSettings,
      color: 'bg-cyan-500',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-700',
      isActive: activeScene === '工作模式',
      description: '明亮燈光，專注環境',
      deviceCount: 6,
      lastActive: '今天 09:15'
    },
    {
      name: '節能模式',
      icon: FiShield,
      color: 'bg-cyan-500',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-700',
      isActive: activeScene === '節能模式',
      description: '降低耗電，優化效率',
      deviceCount: 12,
      lastActive: '今天 14:20'
    },
  ];

  const handleSceneActivation = (sceneName: string) => {
    setActiveScene(activeScene === sceneName ? null : sceneName);
    console.log(`執行場景: ${sceneName}`);
  };

  // 找到當前啟動的場景
  const currentActiveScene = scenes.find(scene => scene.isActive);
  const ActiveIcon = currentActiveScene?.icon;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-[420px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="font-bold text-lg text-gray-800">智能場景控制</h3>
          {currentActiveScene && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-cyan-100 text-cyan-700 text-xs font-medium rounded-full">
              {ActiveIcon && <ActiveIcon className="h-3 w-3" />}
              <span>{currentActiveScene.name}</span>
            </div>
          )}
        </div>
        <a href="#" className="text-sm text-primary font-medium">查看全部</a>
      </div>
      
      {/* 統計數據 */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors cursor-pointer">
          <p className="text-lg font-bold text-cyan-600">{availableScenes}</p>
          <p className="text-xs text-cyan-600">可用場景</p>
        </div>
        <div className="text-center p-2 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors cursor-pointer">
          <p className="text-lg font-bold text-cyan-600">{activeSceneCount}</p>
          <p className="text-xs text-cyan-600">啟動中</p>
        </div>
        <div className="text-center p-2 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors cursor-pointer">
          <p className="text-lg font-bold text-cyan-600">{controlDevices}</p>
          <p className="text-xs text-cyan-600">控制設備</p>
        </div>
      </div>

      {/* 場景按鈕 */}
      <div className="grid grid-cols-2 gap-3">
        {scenes.map(scene => {
          const Icon = scene.icon;
          const isActive = scene.isActive;
          
          return (
            <button
              key={scene.name}
              onClick={() => handleSceneActivation(scene.name)}
              className={`p-4 rounded-xl text-left transition-all duration-200 ${
                isActive 
                  ? `${scene.color} text-white shadow-lg` 
                  : `${scene.bgColor} ${scene.textColor} hover:shadow-md border border-gray-100`
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="h-5 w-5" />
                {isActive && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </div>
              <div>
                <p className="font-medium text-sm mb-1">{scene.name}</p>
                <p className={`text-xs opacity-75 mb-2`}>
                  {scene.description}
                </p>
                <div className="flex justify-between items-center text-xs opacity-60">
                  <span>{scene.deviceCount} 個設備</span>
                  <span>{scene.lastActive}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>


    </div>
  );
};

// Auto Schedules Component
const AutoSchedules = () => {
  const schedules = [
    {
      id: 1,
      name: '早晨喚醒',
      time: '07:00',
      days: ['一', '二', '三', '四', '五'],
      actions: ['開啟臥室燈光', '調整溫度至24°C'],
      status: 'active',
      nextRun: '明天 07:00'
    },
    {
      id: 2,
      name: '離家模式',
      time: '08:30',
      days: ['一', '二', '三', '四', '五'],
      actions: ['關閉所有燈光', '啟動安全模式'],
      status: 'active',
      nextRun: '明天 08:30'
    },
    {
      id: 3,
      name: '回家準備',
      time: '18:00',
      days: ['一', '二', '三', '四', '五', '六', '日'],
      actions: ['開啟客廳燈光', '預熱空調'],
      status: 'active',
      nextRun: '今天 18:00'
    },
    {
      id: 4,
      name: '睡前關燈',
      time: '23:00',
      days: ['一', '二', '三', '四', '五', '六', '日'],
      actions: ['關閉所有燈光', '鎖定門鎖'],
      status: 'paused',
      nextRun: '已暫停'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-[530px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="font-bold text-lg text-gray-800">自動排程</h3>
          <span className="bg-cyan-100 text-cyan-700 text-xs px-2 py-1 rounded-full font-medium">
            {schedules.filter(s => s.status === 'active').length} 個啟用
          </span>
        </div>
        <a href="#" className="text-sm text-primary font-medium">管理排程</a>
      </div>
      <div className="space-y-3 flex-1 overflow-y-auto">
        {schedules.slice(0, 4).map((schedule) => (
          <div key={schedule.id} className="p-3 bg-cyan-50 rounded-xl hover:bg-cyan-100 transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <FiClock className="h-4 w-4 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium text-gray-800">{schedule.name}</span>
                <span className={`w-2 h-2 rounded-full ${
                  schedule.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                }`}></span>
              </div>
              <span className="text-sm font-mono text-gray-600">{schedule.time}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {schedule.days.map((day, index) => (
                    <span key={index} className="text-cyan-700 px-1.5 py-0.5 text-xs">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <span className={`${
                schedule.status === 'active' ? 'text-green-600' : 'text-gray-500'
              }`}>
                {schedule.nextRun}
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-600">
              {schedule.actions.join(' • ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Recent Activities Component
const RecentActivities = () => {
  const activities = [
    { 
      type: 'alert', 
      message: '偵測到動態', 
      detail: '客廳動作感測器觸發', 
      time: '剛剛', 
      location: '客廳',
      icon: FiAlertCircle, 
      color: 'text-red-500' 
    },
    { 
      type: 'success', 
      message: '自動化執行完成', 
      detail: '睡眠模式已啟動，溫度調整至22°C', 
      time: '5分鐘前', 
      location: '臥室',
      icon: FiCheckCircle, 
      color: 'text-green-500' 
    },
    { 
      type: 'info', 
      message: '新用戶邀請', 
      detail: 'wendy@example.com 已加入家庭群組', 
      time: '10分鐘前', 
      location: '系統',
      icon: FiUsers, 
      color: 'text-blue-500' 
    },
    { 
      type: 'warning', 
      message: '設備離線', 
      detail: '溫濕度感測器連線中斷', 
      time: '15分鐘前', 
      location: '客廳',
      icon: FiWifi, 
      color: 'text-orange-500' 
    },
    { 
      type: 'success', 
      message: '場景切換', 
      detail: '已切換至回家模式，開啟6個設備', 
      time: '30分鐘前', 
      location: '全屋',
      icon: FiHome, 
      color: 'text-green-500' 
    },

  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-[460px] flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg text-gray-800">近期活動</h3>
        <a href="#" className="text-sm text-primary font-medium">查看全部</a>
      </div>
      <div className="space-y-2 flex-1 overflow-y-auto">
        {activities.slice(0, 5).map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={index} className="flex items-start space-x-3 p-3 bg-cyan-50 hover:bg-cyan-100 rounded-xl transition-colors cursor-pointer group">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${
                activity.type === 'alert' ? 'bg-red-100' : 
                activity.type === 'success' ? 'bg-green-100' : 
                activity.type === 'warning' ? 'bg-orange-100' : 'bg-blue-100'
              }`}>
                <Icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-800 text-sm">{activity.message}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">{activity.location}</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{activity.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* 8 Block Layout - 重新排列讓高度更平衡 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - 4 blocks */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. Weather */}
          <WeatherCard />
          
          {/* 2. Overall Stats */}
          <OverallStats />
          
          {/* 3. Rooms */}
          <Rooms />
          
          {/* 4. Auto Schedules */}
          <AutoSchedules />
        </div>

        {/* Middle and Right Columns */}
        <div className="lg:col-span-8 space-y-6">
          {/* Top Row - Quick Controls and Automation Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Middle Column Top */}
            <div className="space-y-6">
              {/* 4. Connected Standalone Devices */}
              <ConnectedStandalone />
              
              {/* 5. Quick Controls */}
              <QuickControls />
            </div>

            {/* Right Column Top */}
            <div className="space-y-6">
              {/* 6. Connected Hubs */}
              <ConnectedHubs />
              
              {/* 7. Automation Stats */}
              <AutomationStats />
            </div>
          </div>

          {/* 8. Recent Activities - 橫跨整個寬度 */}
          <RecentActivities />
        </div>
      </div>
    </div>
  );
};

export default Home;