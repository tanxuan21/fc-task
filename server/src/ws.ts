import { WebSocketServer, WebSocket } from 'ws';

// 定义客户端接口
interface Client extends WebSocket {
  id?: string;
  username?: string;
}

// 创建 WebSocket 服务器
const wss = new WebSocketServer({ port: 8080 });

// 客户端连接集合
const clients = new Set<Client>();

// 生成唯一ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// 连接建立时
wss.on('connection', (ws: Client) => {
  // 设置客户端ID
  ws.id = generateId();
  clients.add(ws);
  
  console.log(`New client connected: ${ws.id}`);
  
  // 发送欢迎消息
  ws.send(JSON.stringify({
    type: 'welcome',
    message: 'Welcome to the WebSocket server!',
    id: ws.id
  }));
  
  // 广播新用户加入
  broadcast({
    type: 'notification',
    message: `User ${ws.id} has joined the chat`,
    from: 'server'
  }, ws);
  
  // 接收消息
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      
      console.log(`Received from ${ws.id}:`, message);
      ws.send(JSON.stringify({
        type:"remind",
        message:`收到客户端${ws.id}发来的消息${data}`,
        id:ws.id,
      }))
      // 处理设置用户名
      if (message.type === 'setUsername') {
        ws.username = message.username;
        ws.send(JSON.stringify({
          type: 'usernameSet',
          username: message.username
        }));
        return;
      }
      
      // 广播消息
      broadcast({
        type: 'message',
        content: message.content,
        from: ws.username || ws.id,
        timestamp: new Date().toISOString()
      }, ws);
      
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });
  
  // 连接关闭时
  ws.on('close', () => {
    clients.delete(ws);
    console.log(`Client disconnected: ${ws.id}`);
    
    // 广播用户离开
    broadcast({
      type: 'notification',
      message: `User ${ws.username || ws.id} has left the chat`,
      from: 'server'
    });
  });
  
  // 错误处理
  ws.on('error', (error) => {
    console.error(`Error with client ${ws.id}:`, error);
  });
});

// 广播消息给所有客户端（除了发送者）
function broadcast(message: any, sender?: Client): void {
  const data = JSON.stringify(message);
  
  clients.forEach((client) => {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

console.log('WebSocket server is running on ws://localhost:8080');

