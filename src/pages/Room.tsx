import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { 
  FiSun, FiThermometer, FiZap, FiPlus, FiWind, FiHardDrive
} from 'react-icons/fi';

type DeviceName = '燈光' | '溫控' | '冰箱' | '風扇' | '空調';

const Room = () => {
  const rooms = ['客廳', '會議室', '餐廳', '董事會議室', '會議室', '臥室', '後院'];
  const [activeRoom, setActiveRoom] = useState('客廳');
  
  const [deviceStates, setDeviceStates] = useState<Record<DeviceName, boolean>>({
    燈光: false,
    溫控: true,
    冰箱: false,
    風扇: false,
    空調: false,
  });

  const deviceControls: { name: DeviceName; icon: IconType }[] = [
    { name: '燈光', icon: FiSun },
    { name: '溫控', icon: FiThermometer },
    { name: '冰箱', icon: FiHardDrive },
    { name: '風扇', icon: FiWind },
    { name: '空調', icon: FiZap },
  ];

  const handleToggle = (deviceName: DeviceName) => {
    setDeviceStates(prev => ({ ...prev, [deviceName]: !prev[deviceName] }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Room Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {rooms.map(room => (
          <button
            key={room}
            onClick={() => setActiveRoom(room)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeRoom === room ? 'bg-primary text-white shadow' : 'bg-white text-gray-600 hover:bg-gray-200'
            }`}
          >
            {room}
          </button>
        ))}
      </div>

      {/* Device Controls */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{activeRoom} - 設備控制</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {deviceControls.map(device => {
            const isOn = deviceStates[device.name];
            return (
              <div 
                key={device.name} 
                onClick={() => handleToggle(device.name)}
                className={`p-4 rounded-2xl shadow-sm cursor-pointer transition-colors flex flex-col justify-between h-32 ${
                  isOn ? 'bg-primary text-white' : 'bg-white border border-gray-200'
                }`}
              >
                {/* Top Row: Status and Toggle */}
                <div className="flex justify-between items-center">
                  <p className={`text-sm font-semibold ${isOn ? 'text-white/90' : 'text-gray-600'}`}>
                    {isOn ? '開啟' : '關閉'}
                  </p>
                  <div className={`relative w-10 h-6 rounded-full p-1 flex items-center flex-shrink-0 transition-colors ${
                    isOn ? 'bg-white/30 justify-end' : 'bg-gray-200 justify-start'
                  }`}>
                    <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
                  </div>
                </div>
                
                {/* Middle: Icon */}
                <div className="flex-grow flex items-center justify-center">
                  <device.icon className={`h-10 w-10 ${isOn ? 'text-white' : 'text-primary'}`} />
                </div>
                
                {/* Bottom: Device Name */}
                <p className="text-center text-sm font-medium">{device.name}</p>
              </div>
            );
          })}
          
          {/* Add New Device */}
          <div className="p-4 rounded-2xl shadow-sm bg-white border border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 h-32">
            <FiPlus className="h-6 w-6 text-primary mb-2" />
            <p className="font-bold text-primary">新增設備</p>
          </div>
        </div>
      </div>

      {/* Room Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="font-bold text-lg text-gray-800 mb-4">設備統計</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">總設備數</span>
              <span className="font-bold text-gray-800">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">線上設備</span>
              <span className="font-bold text-green-600">10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">離線設備</span>
              <span className="font-bold text-red-600">2</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="font-bold text-lg text-gray-800 mb-4">能耗統計</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">今日用電</span>
              <span className="font-bold text-gray-800">24.5 kWh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">本月用電</span>
              <span className="font-bold text-gray-800">680 kWh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">較上月</span>
              <span className="font-bold text-green-600">-8%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="font-bold text-lg text-gray-800 mb-4">環境狀態</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">室內溫度</span>
              <span className="font-bold text-gray-800">24°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">濕度</span>
              <span className="font-bold text-gray-800">65%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">空氣品質</span>
              <span className="font-bold text-green-600">優良</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room; 