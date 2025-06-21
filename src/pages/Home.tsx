import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { 
  FiCloud, FiWind, FiCpu, FiUsers, FiHardDrive, FiSun, FiThermometer, FiZap, FiPlus, 
  FiSearch, FiWifi, FiBattery, FiMoreVertical, FiChevronRight, FiChevronLeft, FiMapPin
} from 'react-icons/fi';
import { BsDropletFill, BsSnow, BsCloudSun } from 'react-icons/bs';
import { FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';
import { RiInputMethodLine, RiFlowChart, RiDeviceLine } from 'react-icons/ri';

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

type DeviceName = 'Lights' | 'Temperature' | 'Refrigerator' | 'Fan' | 'Air Conditioner';

const Home = () => {
  const rooms = ['Living Room', 'Conference Room', 'Dinning Room', 'Board Room', 'Meeting Room', 'Bed Room', 'Backyard'];
  const [activeRoom, setActiveRoom] = useState('Living Room');
  
  const [deviceStates, setDeviceStates] = useState<Record<DeviceName, boolean>>({
    Lights: false,
    Temperature: true,
    Refrigerator: false,
    Fan: false,
    'Air Conditioner': false,
  });

  const deviceControls: { name: DeviceName; icon: IconType }[] = [
    { name: 'Lights', icon: FiSun },
    { name: 'Temperature', icon: FiThermometer },
    { name: 'Refrigerator', icon: FiHardDrive },
    { name: 'Fan', icon: FiWind },
    { name: 'Air Conditioner', icon: FiZap },
  ];

  const handleToggle = (deviceName: DeviceName) => {
    setDeviceStates(prev => ({ ...prev, [deviceName]: !prev[deviceName] }));
  };

  return (
    <div className="space-y-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-8">
            {/* Weather Card */}
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="font-bold text-lg">Monday</p>
                        <p className="text-sm opacity-80">22 July, 2024</p>
                    </div>
                </div>
                <div className="text-center my-8">
                    <BsCloudSun className="h-24 w-24 text-white/80 mx-auto" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <p className="text-4xl font-bold">32°C</p>
                        <div className="border-l border-white/50 h-8"></div>
                        <div className="flex items-center space-x-1">
                            <FiMapPin className="h-4 w-4" />
                            <p className="font-medium text-sm">Rawalpindi</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between text-sm mt-4">
                    <div className="flex items-center space-x-2">
                        <BsDropletFill /> <span>48% Humidity</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FiWind /> <span>11.02 Wind Speed</span>
                    </div>
                </div>
            </div>
            {/* Device Controls */}
            <div className="grid grid-cols-2 gap-4">
                {deviceControls.map(device => {
                const isOn = deviceStates[device.name];
                return (
                    <div 
                    key={device.name} 
                    onClick={() => handleToggle(device.name)}
                    className={`p-4 rounded-2xl shadow-sm cursor-pointer transition-colors flex flex-col justify-between h-32 ${isOn ? 'bg-primary text-white' : 'bg-white'}`}
                    >
                        {/* Top Row: Status and Toggle */}
                        <div className="flex justify-between items-center">
                            <p className={`text-sm font-semibold ${isOn ? 'text-white/90' : 'text-gray-600'}`}>{isOn ? 'ON' : 'OFF'}</p>
                            <div className={`relative w-10 h-6 rounded-full p-1 flex items-center flex-shrink-0 transition-colors ${isOn ? 'bg-white/30 justify-end' : 'bg-gray-200 justify-start'}`}>
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
                )
                })}
                <div className="p-4 rounded-2xl shadow-sm bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 h-32">
                    <FiPlus className="h-6 w-6 text-primary mb-2" />
                    <p className="font-bold text-primary">Add new</p>
                </div>
            </div>
        </div>

        {/* Middle Column */}
        <div className="lg:col-span-5 space-y-8">
            {/* Overall Stats */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-6">Overall stats</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard icon={RiInputMethodLine} title="Automation Control" value="180" change="+10% from yesterday" color="text-blue-600" bgColor="bg-blue-100"/>
                <StatCard icon={RiFlowChart} title="Recent Connected" value="180" change="+10% from yesterday" color="text-green-600" bgColor="bg-green-100"/>
                <StatCard icon={RiDeviceLine} title="No of Devices" value="180" change="+10% from yesterday" color="text-orange-600" bgColor="bg-orange-100"/>
                </div>
            </div>

            {/* Connected Gateway */}
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-gray-800">Connected Gateway</h3>
                    <a href="#" className="text-sm text-primary font-medium">See All</a>
                </div>
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 focus:outline-none"/>
                </div>
                {/* Smart Hub Device */}
                <div className="bg-slate-50 p-4 rounded-xl flex flex-col space-y-4">
                    <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                                <p className="font-bold text-primary text-sm">100%</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-700">Smart Hub</p>
                                <p className="text-xs text-gray-400">Battery Health</p>
                            </div>
                        </div>
                        <div className="w-20 h-20 bg-slate-200 rounded-lg flex items-center justify-center shrink-0">
                            {/* Image Placeholder */}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                        <DataChip icon={FaTemperatureHigh} value="76.1" unit="°F" />
                        <DataChip icon={FaTemperatureLow} value="4" unit="°C" />
                        <DataChip icon={BsSnow} value="4" unit="A" />
                        <DataChip icon={BsSnow} value="51.1" unit="B" />
                        <DataChip value="51.1" unit="ppm" />
                        <DataChip value="51.1" unit="g/m" />
                    </div>
                     <div className="flex justify-center items-center mt-3 space-x-1">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Right Column */}
        <div className="lg:col-span-4 space-y-8">
            {/* Connected Stand Alone */}
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-gray-800">Connected Stand Alone</h3>
                    <a href="#" className="text-sm text-primary font-medium">See All</a>
                </div>
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 focus:outline-none"/>
                </div>
                <TemperatureTrackerCard name="Temperature Tracker" id="1" />
                <TemperatureTrackerCard name="Temperature Tracker" id="2" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;