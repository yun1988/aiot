const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';

// 基礎 API 請求函數
async function apiRequest<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return response.json();
}

// 設備相關 API
export const deviceAPI = {
  // 獲取所有設備
  getAll: () => apiRequest<Device[]>('/devices'),
  
  // 獲取獨立設備 (hubId 為 null)
  getStandalone: async (): Promise<Device[]> => {
    const devices = await apiRequest<Device[]>('/devices');
    return devices.filter(device => device.hubId === null);
  },
  
  // 獲取網關設備 (hubId 不為 null)
  getHubDevices: async (): Promise<Device[]> => {
    const devices = await apiRequest<Device[]>('/devices');
    return devices.filter(device => device.hubId !== null);
  },
  
  // 根據房間 ID 獲取設備
  getByRoom: async (roomId: string): Promise<Device[]> => {
    const devices = await apiRequest<Device[]>('/devices');
    return devices.filter(device => device.roomId === roomId);
  }
};

// 網關相關 API
export const hubAPI = {
  // 獲取所有網關
  getAll: () => apiRequest<Hub[]>('/hubs'),
  
  // 獲取網關統計
  getStats: async (): Promise<HubStats> => {
    const hubs = await apiRequest<Hub[]>('/hubs');
    const devices = await apiRequest<Device[]>('/devices');
    
    const totalHubDevices = devices.filter(device => device.hubId !== null).length;
    
    return {
      totalHubs: hubs.length,
      totalDevices: totalHubDevices,
      onlineHubs: hubs.filter(hub => hub.status === 'online').length
    };
  }
};

// 房間相關 API  
export const roomAPI = {
  // 獲取所有房間
  getAll: () => apiRequest<Room[]>('/rooms'),
  
  // 獲取房間統計（重新計算）
  getStats: async (): Promise<RoomStats[]> => {
    const rooms = await apiRequest<Room[]>('/rooms');
    const devices = await apiRequest<Device[]>('/devices');
    
    return rooms.map(room => {
      const roomDevices = devices.filter(device => device.roomId === room.id);
      const activeDevices = roomDevices.filter(device => 
        device.status === 'on' || 
        device.status === 'active' || 
        device.status === 'recording' ||
        device.status === 'brewing' ||
        device.status === 'locked'
      );
      
      // 計算平均溫度（從有溫度數據的設備）
      const tempDevices = roomDevices.filter(device => device.temperature);
      const avgTemp = tempDevices.length > 0 
        ? Math.round(tempDevices.reduce((sum, device) => sum + (device.temperature || 0), 0) / tempDevices.length)
        : room.temperature;
      
      return {
        ...room,
        deviceCount: roomDevices.length,
        activeDevices: activeDevices.length,
        temperature: avgTemp,
        status: activeDevices.length > 0 ? `${activeDevices.length}個開啟` : '全部關閉'
      };
    });
  }
};

// 事件相關 API
export const eventAPI = {
  // 獲取所有事件
  getAll: () => apiRequest<Event[]>('/events'),
  
  // 獲取最近事件（限制數量）
  getRecent: async (limit: number = 4): Promise<Event[]> => {
    const events = await apiRequest<Event[]>('/events');
    return events
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  },
  
  // 獲取未解決的事件
  getUnresolved: async (): Promise<Event[]> => {
    const events = await apiRequest<Event[]>('/events');
    return events.filter(event => !event.resolved);
  }
};

// 系統統計 API
export const systemAPI = {
  // 獲取系統總覽統計
  getOverallStats: async (): Promise<SystemStats> => {
    const [devices, hubs, events] = await Promise.all([
      apiRequest<Device[]>('/devices'),
      apiRequest<Hub[]>('/hubs'),
      apiRequest<Event[]>('/events')
    ]);
    
    // 計算今日執行任務（今天的已完成事件）
    const today = new Date().toISOString().split('T')[0];
    const todayEvents = events.filter(event => 
      event.timestamp.startsWith(today) && 
      (event.status === 'completed' || event.resolved)
    );
    
    return {
      totalDevices: devices.length,
      totalHubs: hubs.length,
      totalSchedules: 8, // 固定值，可以後續從排程 API 獲取
      todayTasks: todayEvents.length
    };
  }
};

// TypeScript 接口定義
export interface Device {
  id: string;
  name: string;
  type: string;
  category: 'hub' | 'standalone';
  hubId: string | null;
  roomId: string;
  status: string;
  temperature?: number;
  brightness?: number;
  battery?: string;
  power?: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface Hub {
  id: string;
  name: string;
  brand: string;
  model: string;
  version: string;
  protocol: string;
  ipAddress: string;
  macAddress: string;
  status: string;
  uptime: string;
  deviceCount: number;
  roomId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  id: string;
  name: string;
  icon: string;
  deviceCount: number;
  activeDevices: number;
  temperature: number;
  humidity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  type: 'alert' | 'success' | 'info' | 'warning';
  title: string;
  description: string;
  deviceId: string | null;
  roomId: string | null;
  status: string;
  priority: 'low' | 'normal' | 'medium' | 'high' | 'critical';
  icon: string;
  color: string;
  bgColor: string;
  timestamp: string;
  resolved: boolean;
}

export interface HubStats {
  totalHubs: number;
  totalDevices: number;
  onlineHubs: number;
}

export interface RoomStats extends Room {
  status: string;
}

export interface SystemStats {
  totalDevices: number;
  totalHubs: number;
  totalSchedules: number;
  todayTasks: number;
} 