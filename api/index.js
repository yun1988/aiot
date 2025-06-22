const fs = require('fs');
const path = require('path');

// 讀取 db.json 文件
const dbPath = path.join(process.cwd(), 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

module.exports = (req, res) => {
  // 設置 CORS 頭
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 處理 OPTIONS 請求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method, query } = req;
  
  // 解析路徑
  const pathMatch = url.match(/^\/api\/(.+)$/);
  if (!pathMatch) {
    return res.status(404).json({ error: 'Not found' });
  }
  
  const resource = pathMatch[1];
  
  // 檢查資源是否存在
  if (!db[resource]) {
    return res.status(404).json({ error: `Resource ${resource} not found` });
  }

  try {
    switch (method) {
      case 'GET':
        let data = db[resource];
        
        // 處理查詢參數過濾
        if (query && Object.keys(query).length > 0) {
          data = data.filter(item => {
            return Object.keys(query).every(key => {
              if (key === '_limit') return true; // 跳過分頁參數
              if (key === '_sort') return true; // 跳過排序參數
              if (key === '_order') return true; // 跳過排序參數
              return item[key] && item[key].toString() === query[key].toString();
            });
          });
        }
        
        // 處理分頁
        if (query._limit) {
          const limit = parseInt(query._limit);
          data = data.slice(0, limit);
        }
        
        // 處理排序
        if (query._sort) {
          const sortField = query._sort;
          const order = query._order === 'desc' ? -1 : 1;
          data = data.sort((a, b) => {
            if (a[sortField] < b[sortField]) return -1 * order;
            if (a[sortField] > b[sortField]) return 1 * order;
            return 0;
          });
        }
        
        res.status(200).json(data);
        break;
        
      case 'POST':
        // 創建新資源
        const newItem = {
          id: generateId(resource),
          ...req.body,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        db[resource].push(newItem);
        res.status(201).json(newItem);
        break;
        
      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 生成 ID 的輔助函數
function generateId(resource) {
  const prefix = resource.slice(0, -1); // 去掉複數 's'
  const existingIds = db[resource].map(item => item.id);
  let counter = 1;
  
  while (existingIds.includes(`${prefix}${counter.toString().padStart(3, '0')}`)) {
    counter++;
  }
  
  return `${prefix}${counter.toString().padStart(3, '0')}`;
} 