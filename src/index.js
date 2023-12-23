const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('join', (data) => {
    const { username, room } = data;
    socket.join(room);
    io.to(room).emit('message', { username: 'System', text: `${username} has joined!` });
  });

  socket.on('message', (data) => {
    const { username, room, text } = data;
    io.to(room).emit('message', { username, text });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
