import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { 
  FiCloud, FiWind, FiCpu, FiUsers, FiHardDrive, FiSun, FiThermometer, FiZap, FiPlus, 
  FiSearch, FiWifi, FiBattery, FiMoreVertical, FiChevronRight, FiChevronLeft, FiMapPin,
  FiHome, FiActivity, FiSettings, FiAlertCircle, FiCheckCircle, FiClock, FiShield
} from 'react-icons/fi';
import { BsDropletFill, BsSnow, BsCloudSun } from 'react-icons/bs';
import { FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';
import { RiInputMethodLine, RiFlowChart, RiDeviceLine } from 'react-icons/ri';
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

// Weather Card Component
const WeatherCard = () => (
  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg min-h-[280px] flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="font-bold text-lg">週一</p>
        <p className="text-sm opacity-80">2024年7月22日</p>
      </div>
    </div>
    <div className="text-center my-6">
      <BsCloudSun className="h-16 w-16 text-white/80 mx-auto mb-2" />
      <p className="text-3xl font-bold">32°C</p>
      <div className="flex items-center justify-center space-x-1 mt-2">
        <FiMapPin className="h-4 w-4" />
        <p className="font-medium text-sm">台北市</p>
      </div>
    </div>
    <div className="flex justify-between text-sm">
      <div className="flex items-center space-x-2">
        <BsDropletFill /> <span>48% 濕度</span>
      </div>
      <div className="flex items-center space-x-2">
        <FiWind /> <span>11.02 風速</span>
      </div>
    </div>
  </div>
);

// Overall Stats Component
const OverallStats = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm min-h-[200px]">
    <h3 className="font-bold text-lg text-gray-800 mb-4">系統總覽</h3>
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <RiDeviceLine className="h-6 w-6 text-blue-600" />
        </div>
        <p className="text-2xl font-bold text-gray-800">18</p>
        <p className="text-xs text-gray-600">設備</p>
      </div>
      <div className="text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <RiFlowChart className="h-6 w-6 text-green-600" />
        </div>
        <p className="text-2xl font-bold text-gray-800">8</p>
        <p className="text-xs text-gray-600">排程</p>
      </div>
      <div className="text-center">
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <MdOutlineDeviceHub className="h-6 w-6 text-orange-600" />
        </div>
        <p className="text-2xl font-bold text-gray-800">3</p>
        <p className="text-xs text-gray-600">網關</p>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">今日執行任務</span>
        <span className="text-lg font-bold text-gray-800">6</span>
      </div>
    </div>
  </div>
);

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
    { name: '離家模式', icon: FiMapPin, status: '關閉', type: 'scene' },
    { name: '睡眠模式', icon: FiClock, status: '關閉', type: 'scene' },
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
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="font-bold text-lg text-gray-800 mb-4">快速控制場景</h3>
      <div className="space-y-3">
        {quickDevices.map(device => {
          const isOn = deviceStates[device.name];
          const Icon = device.icon;
          const isMasterControl = device.type === 'master';
          const isScene = device.type === 'scene';
          
          return (
            <div key={device.name} className={`flex items-center justify-between p-3 rounded-xl ${
              isMasterControl ? 'bg-red-50 border border-red-100' : 
              isScene ? 'bg-purple-50 border border-purple-100' : 'bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isOn ? (isMasterControl ? 'bg-red-500 text-white' : 
                         isScene ? 'bg-purple-500 text-white' : 'bg-primary text-white') : 'bg-gray-300 text-gray-600'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className={`font-medium ${
                    isMasterControl ? 'text-red-700' : 
                    isScene ? 'text-purple-700' : 'text-gray-800'
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
                  isOn ? (isMasterControl ? 'bg-red-500 justify-end' : 
                         isScene ? 'bg-purple-500 justify-end' : 'bg-primary justify-end') : 'bg-gray-200 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
        </button>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          紅色為主控開關，紫色為場景模式
        </p>
      </div>
    </div>
  );
};

// Connected Standalone Devices Component
const ConnectedStandalone = () => {
  const standaloneDevices = [
    { name: '智慧門鎖', status: '已鎖定', battery: '85%', icon: FiSettings, color: 'green' },
    { name: '煙霧偵測器', status: '正常', battery: '92%', icon: FiAlertCircle, color: 'green' },
    { name: '智慧攝影機', status: '錄影中', battery: '78%', icon: FiActivity, color: 'blue' },
    { name: '溫濕度感測器', status: '24°C 65%', battery: '88%', icon: FiThermometer, color: 'orange' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
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
          const colorClass = device.color === 'green' ? 'bg-green-100 text-green-600' :
                           device.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                           'bg-orange-100 text-orange-600';
          return (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">{device.name}</p>
                  <p className="text-sm text-gray-500">{device.status}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">{device.battery}</p>
                <div className="flex items-center space-x-1">
                  <FiBattery className="h-3 w-3 text-gray-400" />
                  <FiWifi className="h-3 w-3 text-gray-400" />
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
      icon: MdOutlineDeviceHub,
      protocol: 'HTTP/MQTT',
      uptime: '7天 14小時'
    },
    { 
      name: 'Tuya Gateway', 
      brand: 'Smart Life', 
      status: '4個設備', 
      version: 'v3.2.1', 
      icon: MdOutlineDeviceHub,
      protocol: 'Zigbee 3.0',
      uptime: '3天 8小時'
    },
    { 
      name: 'Philips Hue Bridge', 
      brand: 'Philips', 
      status: '4個燈具', 
      version: 'v1.56.0', 
      icon: MdOutlineDeviceHub,
      protocol: 'Zigbee Light',
      uptime: '15天 2小時'
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-[450px] flex flex-col">
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
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">{hub.name}</p>
                  <p className="text-xs text-gray-500">{hub.brand}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
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
    { name: '臥室', devices: 4, icon: FiBattery, status: '2個開啟', temperature: '22°C' },
    { name: '廚房', devices: 3, icon: FiUsers, status: '1個開啟', temperature: '26°C' },
    { name: '書房', devices: 2, icon: FiCpu, status: '全部關閉', temperature: '23°C' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800">房間</h3>
        <a href="#" className="text-sm text-primary font-medium">查看全部</a>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {rooms.map((room, index) => {
          const Icon = room.icon;
          const isSelected = selectedRoom === index;
          return (
            <div 
              key={room.name} 
              onClick={() => setSelectedRoom(index)}
              className={`p-4 rounded-xl cursor-pointer transition-all ${
                isSelected ? 'bg-primary/10 border-2 border-primary' : 'bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                  isSelected ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <p className={`font-semibold text-sm mb-1 ${
                  isSelected ? 'text-primary' : 'text-gray-800'
                }`}>
                  {room.name}
                </p>
                <p className="text-xs text-gray-500 mb-2">{room.devices} 個設備</p>
                <div className="w-full space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">狀態</span>
                    <span className={`font-medium ${
                      room.status.includes('關閉') ? 'text-gray-600' : 'text-green-600'
                    }`}>
                      {room.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">溫度</span>
                    <span className="font-medium text-gray-700">{room.temperature}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">總房間數</span>
          <span className="font-semibold text-gray-800">{rooms.length} 間</span>
        </div>
      </div>
    </div>
  );
};

// Automation Stats Component
const AutomationStats = () => {
  const [activeScene, setActiveScene] = useState<string | null>('回家模式');

  const scenes = [
    {
      name: '回家模式',
      icon: FiHome,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      isActive: activeScene === '回家模式',
      description: '自動調整燈光和溫度',
      deviceCount: 8,
      lastActive: '剛才'
    },
    {
      name: '娛樂模式',
      icon: FiActivity,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      isActive: activeScene === '娛樂模式',
      description: '調暗燈光，啟動音響',
      deviceCount: 5,
      lastActive: '昨天 20:30'
    },
    {
      name: '工作模式',
      icon: FiSettings,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      isActive: activeScene === '工作模式',
      description: '明亮燈光，專注環境',
      deviceCount: 6,
      lastActive: '今天 09:15'
    },
    {
      name: '節能模式',
      icon: FiShield,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
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

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800">智能場景控制</h3>
        <a href="#" className="text-sm text-primary font-medium">查看全部</a>
      </div>
      
      {/* 統計數據 */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-green-50 rounded-lg">
          <p className="text-lg font-bold text-green-600">4</p>
          <p className="text-xs text-green-600">可用場景</p>
        </div>
        <div className="text-center p-2 bg-blue-50 rounded-lg">
          <p className="text-lg font-bold text-blue-600">1</p>
          <p className="text-xs text-blue-600">啟動中</p>
        </div>
        <div className="text-center p-2 bg-purple-50 rounded-lg">
          <p className="text-lg font-bold text-purple-600">18</p>
          <p className="text-xs text-purple-600">控制設備</p>
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

      {/* 底部提示 */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          {activeScene ? `${activeScene} 已啟動` : '點擊切換場景模式'}
        </p>
      </div>
    </div>
  );
};

// Recent Activities Component
const RecentActivities = () => {
  const activities = [
    { type: 'alert', message: '偵測到動態', time: '剛剛', icon: FiAlertCircle, color: 'text-red-500' },
    { type: 'success', message: '自動化執行完成', time: '溫度調整至22°C', icon: FiCheckCircle, color: 'text-green-500' },
    { type: 'info', message: '新用戶邀請', time: 'wendy@example.com', icon: FiUsers, color: 'text-blue-500' },
    { type: 'warning', message: '設備離線', time: '客廳感測器', icon: FiWifi, color: 'text-orange-500' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800">近期活動</h3>
        <a href="#" className="text-sm text-primary font-medium">查看全部</a>
      </div>
      <div className="space-y-3">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity.type === 'alert' ? 'bg-red-100' : 
                activity.type === 'success' ? 'bg-green-100' : 
                activity.type === 'warning' ? 'bg-orange-100' : 'bg-blue-100'
              }`}>
                <Icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
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
        </div>

        {/* Middle Column - 4 blocks */}
        <div className="lg:col-span-4 space-y-6">
          {/* 4. Connected Standalone Devices (上方) */}
          <ConnectedStandalone />
          
          {/* 5. Quick Controls */}
          <QuickControls />
        </div>

        {/* Right Column - 4 blocks */}
        <div className="lg:col-span-4 space-y-6">
          {/* 6. Connected Hubs */}
          <ConnectedHubs />
          
          {/* 7. Recent Activities */}
          <RecentActivities />
          
          {/* 8. Automation Stats + Scene Shortcuts */}
          <AutomationStats />
        </div>
      </div>
    </div>
  );
};

export default Home;