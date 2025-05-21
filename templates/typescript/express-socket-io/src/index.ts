import express, { Express, Request, Response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path, { dirname } from 'path'; // Ensure dirname is imported
import { fileURLToPath } from 'url';

// Replicate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins for simplicity in a template
  }
});

const PORT = process.env.PORT || 3002; // Different from other templates

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req: Request, res: Response) => {
  // This will serve public/index.html due to the static middleware
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

io.on('connection', (socket: Socket) => {
  console.log('A user connected:', socket.id);

  // Handle a custom event from the client
  socket.on('chat message', (msg: string) => {
    console.log('message from', socket.id, ':', msg);
    // Broadcast the message to all other clients
    socket.broadcast.emit('chat message', { id: socket.id, message: msg });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
