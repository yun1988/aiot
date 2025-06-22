const fs = require('fs');
const path = require('path');

// 讀取 db.json 文件
const dbPath = path.join(process.cwd(), 'db.json');
let db = {};

try {
  const dbContent = fs.readFileSync(dbPath, 'utf8');
  db = JSON.parse(dbContent);
} catch (error) {
  console.error('Error reading db.json:', error);
  db = { users: [] };
}

module.exports = (req, res) => {
  // 設置 CORS 標頭
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 處理 OPTIONS 請求（CORS 預檢）
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;
  const urlParts = url.split('/').filter(part => part);
  
  // 移除 'api' 前綴
  if (urlParts[0] === 'api') {
    urlParts.shift();
  }

  const resource = urlParts[0];
  const id = urlParts[1];

  if (!resource) {
    res.status(200).json(db);
    return;
  }

  if (!db[resource]) {
    res.status(404).json({ error: 'Resource not found' });
    return;
  }

  switch (method) {
    case 'GET':
      if (id) {
        const item = db[resource].find(item => item.id == id);
        if (item) {
          res.status(200).json(item);
        } else {
          res.status(404).json({ error: 'Item not found' });
        }
      } else {
        res.status(200).json(db[resource]);
      }
      break;

    case 'POST':
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          const newItem = JSON.parse(body);
          newItem.id = Date.now(); // 簡單的 ID 生成
          db[resource].push(newItem);
          res.status(201).json(newItem);
        } catch (error) {
          res.status(400).json({ error: 'Invalid JSON' });
        }
      });
      break;

    case 'PUT':
      if (!id) {
        res.status(400).json({ error: 'ID required for PUT' });
        return;
      }
      let putBody = '';
      req.on('data', chunk => {
        putBody += chunk.toString();
      });
      req.on('end', () => {
        try {
          const updatedItem = JSON.parse(putBody);
          const index = db[resource].findIndex(item => item.id == id);
          if (index !== -1) {
            db[resource][index] = { ...updatedItem, id: parseInt(id) };
            res.status(200).json(db[resource][index]);
          } else {
            res.status(404).json({ error: 'Item not found' });
          }
        } catch (error) {
          res.status(400).json({ error: 'Invalid JSON' });
        }
      });
      break;

    case 'DELETE':
      if (!id) {
        res.status(400).json({ error: 'ID required for DELETE' });
        return;
      }
      const index = db[resource].findIndex(item => item.id == id);
      if (index !== -1) {
        const deletedItem = db[resource].splice(index, 1)[0];
        res.status(200).json(deletedItem);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}; 